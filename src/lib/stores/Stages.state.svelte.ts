import Konva from 'konva';
import type { RectConfig } from 'konva/lib/shapes/Rect';

const BACKGROUND_LAYER: string = 'background-layer';
const BACKGROUND_RECT: string = 'background-rect';
const SHAPES_LAYER: string = 'shapes-layer';
const TRANSFORMER: string = 'transformer';

export interface StagesStateType {
    Stages: Map<string, Konva.Stage>;
    SelectedStageId: string | null;
}

export const StagesState = createStagesState();

function createStagesState() {
    const state = $state<StagesStateType>({
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

        // 4. Init events
        initTransformer(stage);

        // 5. Update state
        state.Stages.set(containerId, stage);
        return stage;
    }

    function setSelectedStage(stageId: string) {
        state.SelectedStageId = stageId;
    }

    function clearSelectedStage() {
        state.SelectedStageId = null;
    }

    function serializeSelectedStage(): string | 'Error' {
        const selectedId = state.SelectedStageId;
        if (selectedId === null) {
            return 'Error';
        }

        const stages = state.Stages;
        const stage = stages.get(selectedId);
        if (stage === undefined) {
            return 'Error';
        }
        return serializeStage(stage);
    }

    function serializeStage(stage: Konva.Stage): string | 'Error' {
        return stage.toJSON();
    }

    // Shapes
    function addSquareToSelectedStage(fillColor: string): 'Ok' | 'Error' {
        const stage = getSelectedStage();
        if (stage === 'Error') {
            return 'Error';
        }

        const layer = getShapesLayer(stage);
        if (layer === 'Error') {
            return 'Error';
        }

        const shape = new Konva.Rect({
            x: stage.width() / 2 - 60,
            y: stage.height() / 2 - 60,
            width: 50,
            height: 50,
            fill: fillColor,
            draggable: true
        });

        layer.add(shape);
        const transformer = stage.find(`#${TRANSFORMER}`)[0];
        if (transformer) {
            transformer.moveToTop();
        }

        return 'Ok';
    }

    function addCircleToSelectedStage(fillColor: string): 'Ok' | 'Error' {
        const stage = getSelectedStage();
        if (stage === 'Error') {
            return 'Error';
        }

        const layer = getShapesLayer(stage);
        if (layer === 'Error') {
            return 'Error';
        }

        const shape = new Konva.Circle({
            x: stage.width() / 2,
            y: stage.height() / 2,
            radius: 70,
            fill: fillColor,
            draggable: true
        });

        layer.add(shape);
        const transformer = stage.find(`#${TRANSFORMER}`)[0];
        if (transformer) {
            transformer.moveToTop();
        }
        return 'Ok';
    }

    function addLineToSelectedStage(fillColor: string): 'Ok' | 'Error' {
        const stage = getSelectedStage();
        if (stage === 'Error') {
            return 'Error';
        }

        const layer = getShapesLayer(stage);
        if (layer === 'Error') {
            return 'Error';
        }

        const shape = new Konva.Line({
            points: [50, 50, 200, 50], // [x1, y1, x2, y2]
            stroke: fillColor,
            strokeWidth: 2,
            hitStrokeWidth: 20,
            draggable: true
        });

        layer.add(shape);
        const transformer = stage.find(`#${TRANSFORMER}`)[0];
        if (transformer) {
            transformer.moveToTop();
        }
        return 'Ok';
    }

    // Locals
    function getSelectedStage(): Konva.Stage | 'Error' {
        const selectedId = state.SelectedStageId;
        if (selectedId === null) {
            return 'Error';
        }

        const stages = state.Stages;
        const stage = stages.get(selectedId);
        if (stage === undefined) {
            return 'Error';
        }

        return stage;
    }

    function getShapesLayer(stage: Konva.Stage): Konva.Layer | 'Error' {
        // TODO: Pass in the layer/layer id once
        // layer feature is implemented
        const layer = stage.findOne(`#${SHAPES_LAYER}`);
        if (!(layer instanceof Konva.Layer)) {
            return 'Error';
        }
        return layer;
    }

    function initTransformer(stage: Konva.Stage) {
        const tr = new Konva.Transformer({
            id: TRANSFORMER,
            boundBoxFunc: (oldBox, newBox) => {
                const box = getClientRect(newBox);
                const isOut =
                    box.x < 0 ||
                    box.y < 0 ||
                    box.x + box.width > stage.width() ||
                    box.y + box.height > stage.height();

                // If new bounding box is out of visible viewport, let's just skip transforming
                // this logic can be improved by still allow some transforming if we have small available space
                if (isOut) {
                    return oldBox;
                }
                return newBox;
            }
        });

        for (const child of stage.children) {
            for (const childChild of child.getChildren()) {
                if (childChild.getClassName() === 'Transformer') {
                    childChild.destroy();
                    continue;
                }
            }
        }

        for (const child of stage.children) {
            // TODO: Better way than to just use magic string
            if (child.getClassName() === 'Layer') {
                if (child.id() === BACKGROUND_LAYER) {
                    continue;
                }
                child.add(tr);

                stage.on('click tap', (e) => {
                    const target = e.target;
                    // If we click on nothing clear the transformer and update the layer
                    if (target === stage || target.id() === BACKGROUND_RECT) {
                        tr.nodes([]);
                        child.batchDraw();
                        return;
                    }

                    // TODO: Better way than to just use magic string
                    if (target.className === 'Line') {
                        tr.enabledAnchors(['middle-left', 'middle-right']);
                    } else if (target.className === 'Text') {
                        tr.enabledAnchors([
                            'top-left',
                            'top-right',
                            'middle-right',
                            'middle-left',
                            'bottom-left',
                            'bottom-right'
                        ]);
                    } else {
                        tr.enabledAnchors([
                            'top-left',
                            'top-center',
                            'top-right',
                            'middle-right',
                            'middle-left',
                            'bottom-left',
                            'bottom-center',
                            'bottom-right'
                        ]);
                    }

                    tr.show();
                    tr.nodes([e.target]);
                    child.batchDraw();
                });

                stage.on('dblclick dbltap', (e) => {
                    const target = e.target;
                    // TODO: Better way than to just use magic string
                    if (target.className === 'Text') {
                        tr.hide();
                    }

                    // Add the selected element to the transformer and update the layer
                    tr.nodes([e.target]);
                    child.batchDraw();
                });
            }
        }

        tr.on('dragmove', () => {
            const boxes = tr.nodes().map((node) => node.getClientRect());
            const box = getTotalBox(boxes);
            tr.nodes().forEach((shape) => {
                const absPos = shape.getAbsolutePosition();
                // Where are shapes inside bounding box of all shapes?
                const offsetX = box.x - absPos.x;
                const offsetY = box.y - absPos.y;

                // We total box goes outside of viewport, we need to move absolute position of shape
                const newAbsPos = { ...absPos };
                if (box.x < 0) {
                    newAbsPos.x = -offsetX;
                }
                if (box.y < 0) {
                    newAbsPos.y = -offsetY;
                }
                if (box.x + box.width > stage.width()) {
                    newAbsPos.x = stage.width() - box.width - offsetX;
                }
                if (box.y + box.height > stage.height()) {
                    newAbsPos.y = stage.height() - box.height - offsetY;
                }
                shape.setAbsolutePosition(newAbsPos);
            });
        });
    }

    function getClientRect(rotatedBox: RectConfig) {
        const { x, y, width, height } = rotatedBox;
        const rad = rotatedBox.rotation;

        const p1 = getCorner(x!, y!, 0, 0, rad!);
        const p2 = getCorner(x!, y!, width!, 0, rad!);
        const p3 = getCorner(x!, y!, width!, height!, rad!);
        const p4 = getCorner(x!, y!, 0, height!, rad!);

        const minX = Math.min(p1.x, p2.x, p3.x, p4.x);
        const minY = Math.min(p1.y, p2.y, p3.y, p4.y);
        const maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
        const maxY = Math.max(p1.y, p2.y, p3.y, p4.y);

        return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY
        };
    }

    function getCorner(
        pivotX: number,
        pivotY: number,
        diffX: number,
        diffY: number,
        angle: number
    ) {
        const distance = Math.sqrt(diffX * diffX + diffY * diffY);

        // Find angle from pivot to corner
        angle += Math.atan2(diffY, diffX);

        // Get new x and y and round it off to integer
        const x = pivotX + distance * Math.cos(angle);
        const y = pivotY + distance * Math.sin(angle);

        return { x: x, y: y };
    }

    function getTotalBox(boxes: RectConfig[]) {
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        boxes.forEach((box) => {
            minX = Math.min(minX, box.x!);
            minY = Math.min(minY, box.y!);
            maxX = Math.max(maxX, box.x! + box.width!);
            maxY = Math.max(maxY, box.y! + box.height!);
        });
        return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY
        };
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
        clearSelectedStage,
        serializeSelectedStage,
        serializeStage,

        // Shapes
        addSquareToSelectedStage,
        addCircleToSelectedStage,
        addLineToSelectedStage
    };
}
