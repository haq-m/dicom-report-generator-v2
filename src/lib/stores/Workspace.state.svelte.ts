type Make<TypeLiteral extends string, Extras extends Record<string, unknown>> = {
    type: TypeLiteral;
} & Extras;

type Shapes = Make<'Shapes', { value: string }>;
type Images = Make<'Images', { value: string }>;
type Templates = Make<'Templates', { value: string; Stage?: unknown }>;
type DcmFiles = Make<'DcmFiles', { value: string }>;
type Texts = Make<'Texts', { value: string }>;
type Colors = Make<'Colors', { value: string }>;

export type LeftSideBarContentTypeSelection = Shapes | Images | Templates | DcmFiles | Texts;
export type TopBarContentTypeSelection = Colors;

export type SideBarSelectionType =
    | LeftSideBarContentTypeSelection
    | TopBarContentTypeSelection
    | null;

export interface WorkspaceStateType {
    SideBarSelection: SideBarSelectionType;
    CanvasScale: number;
}

export const Workspace = createWorkspaceState();

export function createWorkspaceState() {
    const state = $state<WorkspaceStateType>({
        SideBarSelection: null,
        CanvasScale: 100
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

    return {
        // Getters
        get state() {
            return state;
        },
        get sideBarSelection() {
            return state.SideBarSelection;
        },

        // Setters
        setSideBarContentTypeSelection,
        clearSideBarSelection,
        setCanvasScale
    };
}
