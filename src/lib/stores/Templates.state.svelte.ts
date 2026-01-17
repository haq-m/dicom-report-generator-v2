import { browser } from '$app/environment';
import { testTemplates, type TemplateItem } from './Templates';

const STORAGE_KEY = 'templates';

export interface TemplatesStateType {
    Items: Array<TemplateItem>;
    SelectedItem: TemplateItem | null;
}

export const Templates = createTemplatesState();

function createTemplatesState() {
    const state = $state<TemplatesStateType>({
        Items: getItems(),
        SelectedItem: null
    });

    function getItems(): Array<TemplateItem> {
        if (!browser) {
            return [];
        }
        const raw = localStorage.getItem(STORAGE_KEY);
        let templates: Array<TemplateItem> = testTemplates;
        if (raw) {
            try {
                templates = JSON.parse(raw);
            } catch (e) {
                console.error('Corrupt storage', e);
            }
        }
        return templates;
    }

    function setSelectedItem(templateItem: TemplateItem) {
        state.SelectedItem = templateItem;
    }

    function saveStageToStorage(name: string, serializedStage: string): 'Ok' | 'Failed' {
        if (!browser) {
            return 'Ok';
        }
        const index = state.Items.findIndex((p) => p.Name === name);
        if (index >= 0) {
            state.Items[index] = { Name: name, Stage: serializedStage };
        } else {
            state.Items.unshift({ Name: name, Stage: serializedStage });
        }

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.Items));
            return 'Ok';
        } catch (e) {
            console.error('Error saving stage to localStorage:', e);
        }
        return 'Failed';
    }

    return {
        // Getters
        get state() {
            return state;
        },

        // Setters
        setSelectedItem,
        saveStageToStorage
    };
}
