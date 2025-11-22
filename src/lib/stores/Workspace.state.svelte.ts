export type LeftSideBarContentTypeSelection = 'Shapes' | 'Images' | 'Templates' | 'DcmFiles';
export type TopBarContentTypeSelection = 'Colors' | 'LineStrokes';

type SideBarContentSelection = {
    leftBarSelection: LeftSideBarContentTypeSelection | null;
    topBarSelection: TopBarContentTypeSelection | null;
};

export interface WorkspaceStateType {
    SideBarSelection: SideBarContentSelection;
    CanvasScale: number;
}

export const Workspace = createWorkspaceState();

export function createWorkspaceState() {
    const state = $state<WorkspaceStateType>({
        SideBarSelection: {
            leftBarSelection: null,
            topBarSelection: null
        },
        CanvasScale: 100
    });

    function setLeftSideBarContentTypeSelection(type: LeftSideBarContentTypeSelection) {
        state.SideBarSelection.leftBarSelection = type;
    }

    function setTopBarContentTypeSelection(type: TopBarContentTypeSelection) {
        state.SideBarSelection.topBarSelection = type;
    }

    function clearLeftBarSelection() {
        state.SideBarSelection.leftBarSelection = null;
    }

    function clearTopBarSelection() {
        state.SideBarSelection.topBarSelection = null;
    }

    function setCanvasScale(value: number) {
        state.CanvasScale = value;
    }

    return {
        // Getters
        get state() {
            return state;
        },
        get leftBarSelection() {
            return state.SideBarSelection.leftBarSelection;
        },
        get topBarSelection() {
            return state.SideBarSelection.topBarSelection;
        },

        // Setters
        setLeftSideBarContentTypeSelection,
        setTopBarContentTypeSelection,
        clearLeftBarSelection,
        clearTopBarSelection,
        setCanvasScale
    };
}
