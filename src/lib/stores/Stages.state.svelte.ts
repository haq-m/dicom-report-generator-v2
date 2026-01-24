import Konva from 'konva';
import jsPDF from 'jspdf';
import type { RectConfig } from 'konva/lib/shapes/Rect';

const BACKGROUND_LAYER: string = 'background-layer';
const BACKGROUND_RECT: string = 'background-rect';
const SHAPES_LAYER: string = 'shapes-layer';
const TRANSFORMER: string = 'transformer';

type Shape = 'Line' | 'Rect' | 'Circle' | 'Text' | 'MultipleShapes' | 'Image';
export type SelectionType = {
    shapes: Konva.Shape[];
};
export interface StagesStateType {
    Stages: Map<string, Konva.Stage>;
    SelectedStageId: string | null;
    SelectedShapes: SelectionType | null;
    MenuList: {
        id: string;
        pos: { x: number; y: number };
    } | null;
}

export const StagesState = createStagesState();

function createStagesState() {
    const state = $state<StagesStateType>({
        Stages: new Map(),
        SelectedStageId: null,
        SelectedShapes: null,
        MenuList: null
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
        initStageEvents(stage);
        initTransformer(stage);

        // 5. Update state
        state.Stages.set(containerId, stage);
        return stage;
    }

    function initStageEvents(stage: Konva.Stage) {
        stage.on('click tap', (e) => {
            const targetId = e.target.id();
            if (targetId !== BACKGROUND_RECT) {
                return;
            }
            state.MenuList = null;
        });
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

    async function deserializeStage(json: string, containerId: string) {
        const stage = Konva.Stage.create(json, containerId) as Konva.Stage;
        for (const child of stage.children) {
            for (const childChild of child.getChildren()) {
                if (childChild instanceof Konva.Text) {
                    const fontFamily = childChild.getAttr('fontFamily');
                    initShape(childChild, 'Text');
                    initTextEdit(childChild, stage);
                    if (fontFamily) {
                        await loadAndApplyFontAsync(fontFamily, childChild);
                    }
                }

                if (childChild instanceof Konva.Rect) {
                    initShape(childChild, 'Rect');
                }

                if (childChild instanceof Konva.Line) {
                    initShape(childChild, 'Line');
                }

                if (childChild instanceof Konva.Circle) {
                    initShape(childChild, 'Circle');
                }
            }
        }

        initStageEvents(stage);
        initTransformer(stage);
        state.Stages.set(containerId, stage);
    }

    function setBgFillColorToSelectedStage(fillColor: string, opacity: number = 1): 'Ok' | 'Error' {
        if (opacity < 0 || opacity > 1) {
            return 'Error';
        }

        const selectedId = state.SelectedStageId;
        if (selectedId === null) {
            return 'Error';
        }

        const stage = state.Stages.get(selectedId);
        if (stage === undefined) {
            return 'Error';
        }

        const backgroundRect = stage.findOne(`#${BACKGROUND_RECT}`);
        if (backgroundRect instanceof Konva.Rect) {
            backgroundRect.fill(fillColor);
            backgroundRect.opacity(opacity);
            stage.batchDraw();
            return 'Ok';
        }

        return 'Error';
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
        initShape(shape, 'Rect');
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
        initShape(shape, 'Circle');
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
        initShape(shape, 'Line');
        return 'Ok';
    }

    async function addTextToSelectedStage(fillColor: string, fontName: string) {
        const stage = getSelectedStage();
        if (stage === 'Error') {
            return 'Error';
        }

        const layer = getShapesLayer(stage);
        if (layer === 'Error') {
            return 'Error';
        }

        const shape = new Konva.Text({
            x: stage.width() / 2,
            y: 15,
            text: 'Simple Text',
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: fillColor,
            align: 'center',
            draggable: true
        });

        await loadAndApplyFontAsync(fontName, shape);
        layer.add(shape);
        initShape(shape, 'Text');
        const transformer = stage.find(`#${TRANSFORMER}`)[0];
        if (transformer !== undefined) {
            transformer.moveToTop();
        }
        initTextEdit(shape, stage);

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

    function isMultipleShapesSelected(): boolean {
        // eslint-disable-next-line svelte/prefer-svelte-reactivity
        const uniqueShapes: Set<string> = new Set();
        state.SelectedShapes?.shapes.forEach((o) => {
            uniqueShapes.add(o.className);
        });
        return uniqueShapes.size > 1;
    }

    function selectedShapesType(): Shape | undefined {
        // eslint-disable-next-line svelte/prefer-svelte-reactivity
        const uniqueShapes: Set<string> = new Set();
        state.SelectedShapes?.shapes.forEach((o) => {
            uniqueShapes.add(o.className);
        });

        if (uniqueShapes.size > 1) {
            return 'MultipleShapes';
        }
        const shape = state.SelectedShapes?.shapes;
        if (shape instanceof Konva.Rect) {
            return 'Rect';
        }
        if (shape instanceof Konva.Circle) {
            return 'Circle';
        }
        if (shape instanceof Konva.Line) {
            return 'Line';
        }
        if (shape instanceof Konva.Text) {
            return 'Text';
        }
        if (shape instanceof Konva.Image) {
            return 'Image';
        }
        return undefined;
    }

    function deleteSelectedShapes(): 'Ok' | 'Error' {
        const selection = state.SelectedShapes;
        if (selection === null || !selection.shapes || selection.shapes.length === 0) {
            return 'Error';
        }

        const stage = getSelectedStage();
        if (stage === 'Error') {
            return 'Error';
        }

        // Destroy each selected shape
        selection.shapes.forEach((shape) => {
            try {
                shape.destroy();
            } catch (e) {
                // eslint-disable-next-line no-console
                console.error(`Failed to destroy shape. [shape=${shape.id()}]`, e);
            }
        });

        // Clear selection state
        state.SelectedShapes = null;

        // Clear transformer nodes and hide it
        const transformer = stage.findOne(`#${TRANSFORMER}`);
        if (transformer && transformer instanceof Konva.Transformer) {
            transformer.nodes([]);
            transformer.hide();
        }

        // Redraw shapes layer if available
        const layer = getShapesLayer(stage);
        if (layer !== 'Error') {
            layer.batchDraw();
        }

        return 'Ok';
    }

    function initShape(shape: Konva.Shape, shapeType: Shape) {
        shape.on('click tap', () => {
            if (state.SelectedShapes === null || state.SelectedShapes.shapes.length === 0) {
                state.SelectedShapes = {
                    shapes: [shape]
                };
                return;
            }

            state.SelectedShapes = {
                shapes: [shape]
            };
            state.MenuList = null;
        });

        if (shapeType === 'Image') {
            shape.on('contextmenu', (e) => {
                e.evt.preventDefault();
                state.MenuList = {
                    id: shape.id(),
                    pos: { x: e.evt.clientX, y: e.evt.clientY }
                };
            });
        }

        if (shapeType === 'Text') {
            shape.on('transform', function () {
                shape.setAttrs({
                    width: shape.width() * shape.scaleX(),
                    height: shape.height() * shape.scaleY(),
                    scaleY: 1,
                    scaleX: 1
                });
            });
        }

        return 'Ok';
    }

    function initTextEdit(shape: Konva.Text, stage: Konva.Stage) {
        shape.on('dblclick dbltap', () => {
            shape.hide();

            const textPosition = shape.absolutePosition();
            const stageBox = stage.container().getBoundingClientRect();

            const areaPosition = {
                x: stageBox.left + textPosition.x,
                y: stageBox.top + textPosition.y
            };

            // https://konvajs.org/docs/sandbox/Editable_Text.html
            const textarea = document.createElement('textarea');
            document.body.appendChild(textarea);

            textarea.value = shape.text();
            textarea.style.position = 'absolute';
            textarea.style.top = areaPosition.y + 'px';
            textarea.style.left = areaPosition.x + 'px';
            textarea.style.width = shape.width() - shape.padding() * 2 + 'px';
            textarea.style.height = shape.height() - shape.padding() * 2 + 5 + 'px';
            textarea.style.fontSize = shape.fontSize() + 'px';
            textarea.style.border = 'none';
            textarea.style.padding = '0px';
            textarea.style.margin = '0px';
            textarea.style.overflow = 'hidden';
            textarea.style.background = 'none';
            textarea.style.outline = 'none';
            textarea.style.resize = 'none';
            textarea.style.lineHeight = shape.lineHeight().toString();
            textarea.style.fontFamily = shape.fontFamily();
            textarea.style.transformOrigin = 'left top';
            textarea.style.textAlign = shape.align();
            textarea.style.color = shape.fill() as string;

            const rotation = shape.rotation();
            let transform = '';
            if (rotation) {
                transform += 'rotateZ(' + rotation + 'deg)';
            }
            transform += 'translateY(-' + 2 + 'px)';
            textarea.style.transform = transform;

            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 3 + 'px';

            textarea.focus();

            function removeTextarea() {
                textarea.parentNode?.removeChild(textarea);
                window.removeEventListener('click', handleOutsideClick);
                shape.show();
            }

            function setTextareaWidth(newWidth: number) {
                if (!newWidth) {
                    newWidth = shape.text.length * shape.fontSize();
                }
                textarea.style.width = newWidth + 'px';
            }

            textarea.addEventListener('keydown', function (e) {
                if (e.code === 'Enter' && !e.shiftKey) {
                    shape.text(textarea.value);
                    removeTextarea();
                }
                if (e.code === 'Escape') {
                    removeTextarea();
                }
            });

            textarea.addEventListener('keydown', function () {
                const scale = shape.getAbsoluteScale().x;
                setTextareaWidth(shape.width() * scale);
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + shape.fontSize() + 'px';
            });

            function handleOutsideClick(e: Event) {
                if (e.target !== textarea) {
                    shape.text(textarea.value);
                    removeTextarea();
                }
            }
            setTimeout(() => {
                window.addEventListener('click', handleOutsideClick);
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

    async function loadAndApplyFontAsync(fontName: string, textNode: Konva.Text) {
        const url = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}:wght@400;700&display=swap`;
        const linkId = `google-font-${fontName.replace(/\s+/g, '-')}`;

        if (!document.getElementById(linkId)) {
            const link = document.createElement('link');
            link.id = linkId;
            link.rel = 'stylesheet';
            link.href = url;
            document.head.appendChild(link);
        }

        try {
            await document.fonts.load(`400 normal 1em "${fontName}"`);
            textNode.fontFamily(fontName);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(`Font failed to load: ${fontName}`, error);
            textNode.fontFamily('Arial, sans-serif');
        }
    }

    function setFillColorOfSelectedShapes(fillColor: string, opacity: number = 1): 'Ok' | 'Error' {
        if (opacity < 0 || opacity > 1) {
            return 'Error';
        }

        const shapes = state.SelectedShapes;
        if (shapes === null) {
            return 'Error';
        }

        shapes.shapes.forEach((x) => {
            x.fill(fillColor);
            x.opacity(opacity);
        });
        return 'Ok';
    }

    async function addImageToSelectedStageAsync(
        src: string,
        dicomDataId: string
    ): Promise<'Ok' | 'Error'> {
        const stage = getSelectedStage();
        if (stage === 'Error') {
            return 'Error';
        }

        const layer = getShapesLayer(stage);
        if (layer === 'Error') {
            return 'Error';
        }

        const img = await loadImage(src);
        const originalWidth = img.width;
        const originalHeight = img.height;
        const targetWidth = 100;
        const aspectRatio = originalWidth / originalHeight;
        const calculatedHeight = targetWidth / aspectRatio;
        const shape = new Konva.Image({
            id: dicomDataId,
            image: img,
            x: stage.width() / 2,
            y: stage.height() / 2,
            width: targetWidth,
            height: calculatedHeight,
            draggable: true,
            originalSrc: src
        });

        layer.add(shape);
        initShape(shape, 'Image');
        const transformer = stage.find(`#${TRANSFORMER}`)[0];
        if (transformer) {
            transformer.moveToTop();
        }
        return 'Ok';
    }

    function loadImage(src: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image.`));
            img.src = src;
            return img;
        });
    }

    function exportToPdf(fileName: string, pixelRatio: number): 'Ok' | 'Error' {
        // Ref: https://konvajs.org/docs/sandbox/Canvas_to_PDF.html
        const stage = getSelectedStage();
        if (stage === 'Error') {
            return 'Error';
        }

        const width = stage.width();
        const height = stage.height();

        const pdf = new jsPDF({
            orientation: width > height ? 'l' : 'p',
            unit: 'px',
            format: [width, height]
        });

        const textNodes = stage.find('Text');
        textNodes.forEach((node) => {
            if (!node.isVisible()) {
                return;
            }

            const textNode = node as Konva.Text;
            const size = textNode.fontSize() / 0.75;
            pdf.setFontSize(size);
            pdf.text(textNode.text(), textNode.x(), textNode.y(), {
                baseline: 'top',
                angle: -textNode.getAbsoluteRotation()
            });
        });

        const dataUrl = stage.toDataURL({
            pixelRatio: pixelRatio,
            mimeType: 'image/jpeg'
        });

        pdf.addImage(dataUrl, 'JPEG', 0, 0, width, height);

        pdf.save(fileName);
        return 'Ok';
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
        deserializeStage,
        setBgFillColorToSelectedStage,
        isMultipleShapesSelected,
        selectedShapesType,
        deleteSelectedShapes,

        // Shapes
        addSquareToSelectedStage,
        addCircleToSelectedStage,
        addLineToSelectedStage,
        addTextToSelectedStage,
        setFillColorOfSelectedShapes,
        addImageToSelectedStageAsync,

        // Others
        exportToPdf
    };
}
