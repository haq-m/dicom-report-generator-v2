import type { DicomData } from './DcmImages.state.svelte';

type Make<TypeLiteral extends string, Extras extends Record<string, unknown>> = {
    type: TypeLiteral;
} & Extras;

type Shapes = Make<'Shapes', { selection: 'Line' | 'Square' | 'Circle' | null }>;
type Images = Make<'Images', { src: string | null }>;
type Templates = Make<'Templates', { selection: { id: string; stage: string } | null }>;
type DcmFiles = Make<'DcmFiles', { selection: string | null }>;
type Texts = Make<'Texts', { selection: string | null }>;
type Colors = Make<'Colors', { selectedColor: string }>;

export type LeftSideBarContentTypeSelection = Shapes | Images | Templates | DcmFiles | Texts;
export type TopBarContentTypeSelection = Colors;

export type SideBarSelectionType =
    | LeftSideBarContentTypeSelection
    | TopBarContentTypeSelection
    | null;

export interface WorkspaceStateType {
    SideBarSelection: SideBarSelectionType;
    CanvasScale: number;
    DicomTagsModalData: DicomData | null;
}

export const Workspace = createWorkspaceState();

export function createWorkspaceState() {
    const state = $state<WorkspaceStateType>({
        SideBarSelection: null,
        CanvasScale: 100,
        DicomTagsModalData: null
    });

    function setSideBarContentTypeSelection(type: SideBarSelectionType) {
        state.SideBarSelection = type;
    }

    function clearSideBarSelection() {
        state.SideBarSelection = null;
    }

    function setCanvasScale(value: number) {
        state.CanvasScale = value;
    }

    function setAddDicomTagsModalData(data: DicomData | null) {
        state.DicomTagsModalData = data;
    }

    return {
        // Getters
        get state() {
            return state;
        },
        get sideBarSelection() {
            return state.SideBarSelection;
        },
        get tryGetSelectedColor(): string | null {
            if (state.SideBarSelection?.type === 'Colors') {
                return state.SideBarSelection?.selectedColor ?? null;
            }
            return null;
        },

        // Setters
        setSideBarContentTypeSelection,
        clearSideBarSelection,
        setCanvasScale,
        setAddDicomTagsModalData
    };
}
