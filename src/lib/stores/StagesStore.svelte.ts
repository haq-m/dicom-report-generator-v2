import Konva from 'konva';

const BACKGROUND_LAYER: string = 'background-layer';
const BACKGROUND_RECT: string = 'background-rect';
const SHAPES_LAYER: string = 'shapes-layer';

export interface StagesStoreType {
    Stages: Map<string, Konva.Stage>;
    SelectedStageId: string | null;
}

export const StagesStore = createStagesStore();

function createStagesStore() {
    const state = $state<StagesStoreType>({
        Stages: new Map(),
        SelectedStageId: null
    });

    // STAGES
    function addNewStageToContainer(
        containerId: string,
        width: number,
        height: number,
        backgroundFill: string = 'lightblue'
    ): Konva.Stage {
        // 1. Add Stage
        const stage = new Konva.Stage({
            container: containerId,
            width: width,
            height: height
        });

        // 2. Add Background
        const backgroundLayer = new Konva.Layer({
            id: BACKGROUND_LAYER
        });

        const backgroundRect = new Konva.Rect({
            id: BACKGROUND_RECT,
            x: 0,
            y: 0,
            width: stage.width(),
            height: stage.height(),
            fill: backgroundFill,
            draggable: false
        });

        backgroundLayer.add(backgroundRect);
        stage.add(backgroundLayer);

        // 3. Add layer for shapes
        const shapesLayer = new Konva.Layer({
            id: SHAPES_LAYER
        });
        stage.add(shapesLayer);

        // 4. Update store
        state.Stages.set(containerId, stage);
        return stage;
    }

    function setSelectedStage(stageId: string) {
        state.SelectedStageId = stageId;
    }

    function clearSelectedStage() {
        state.SelectedStageId = null;
    }

    return {
        // Getters
        get state() {
            return state;
        },

        // Setters
        // Stages
        addNewStageToContainer,
        setSelectedStage,
        clearSelectedStage
    };
}
