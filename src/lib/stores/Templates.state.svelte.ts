import { testTemplates, type TemplateItem } from './Templates';

export interface TemplatesStateType {
    Items: Array<TemplateItem>;
    SelectedItem: TemplateItem | null;
}

export const Templates = createTemplatesState();

function createTemplatesState() {
    const state = $state<TemplatesStateType>({
        Items: testTemplates,
        SelectedItem: null
    });

    function setSelectedItem(templateItem: TemplateItem) {
        state.SelectedItem = templateItem;
    }

    return {
        // Getters
        get state() {
            return state;
        },

        // Setters
        setSelectedItem
    };
}
