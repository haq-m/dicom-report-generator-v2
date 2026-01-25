<script lang="ts">
    import DownloadArrowSvg from '$lib/svgs/DownloadArrowSvg.svelte';
    import type { DesignBoard } from './DesignBoardType';
    import { StagesState } from '$lib/stores/Stages.state.svelte';
    import { Workspace } from '$lib/stores/Workspace.state.svelte';
    import { untrack } from 'svelte';
    import FloppyDiskSvg from '$lib/svgs/FloppyDiskSvg.svelte';
    import { Templates } from '$lib/stores/Templates.state.svelte';
    import { DcmImages } from '$lib/stores/DcmImages.state.svelte';
    import AddTagsModal from './AddTagsModal.svelte';

    // Props
    interface Props {
        containers: Array<DesignBoard>;
        canvasScale: number;
    }
    const { containers, canvasScale }: Props = $props();

    // Reactivity
    $effect(() => {
        // Queue the creation of KonvaJS stage. This ensures the stage is created after
        // the div is created
        containers.forEach((container, index) => {
            setTimeout(() => {
                const stageDiv = document.getElementById(container.id);
                if (stageDiv === null) {
                    return;
                }
                if (container.stageData !== null) {
                    StagesState.deserializeStage(container.stageData, container.id);
                } else {
                    StagesState.addNewStageToContainer(
                        container.id,
                        container.width,
                        container.height
                    );
                }
                if (index === 0 && StagesState.state.SelectedStageId === null) {
                    StagesState.setSelectedStage(container.id);
                }
            }, 0);
        });
    });

    const selectedColor = $derived.by(() => {
        if (Workspace.state.SideBarSelection?.type !== 'Colors') {
            return null;
        }
        return Workspace.state.SideBarSelection.selectedColor;
    });

    let prevSelectedColor: string | null = null;
    $effect(() => {
        if (selectedColor === prevSelectedColor) {
            return;
        }
        prevSelectedColor = selectedColor;

        if (selectedColor === null) {
            return;
        }

        if (untrack(() => StagesState.state.SelectedShapes) !== null) {
            StagesState.setFillColorOfSelectedShapes(selectedColor);
            return;
        }

        if (untrack(() => StagesState.state.SelectedStageId) !== null) {
            StagesState.setBgFillColorToSelectedStage(selectedColor);
        }
    });

    // Functions
    function scaledValue(scale: number, value: number): number {
        return value * (scale / 100);
    }

    function onDownloadButtonClicked() {
        const serialized = StagesState.serializeSelectedStage();
        console.log(serialized);
    }

    function onFloppyDiskButtonClicked() {
        const randomUid = crypto.randomUUID();
        const serialized = StagesState.serializeSelectedStage();
        Templates.saveStageToStorage(randomUid, serialized);
    }

    function onAddTagsMenuItemClicked(dcmImageUid: string) {
        StagesState.resetMenuList();
        const dcmImage = DcmImages.state.Images.find((x) => x.uid === dcmImageUid);
        if (dcmImage === undefined) {
            console.warn('Dcm Image with UID not found.');
            return;
        }
        Workspace.setAddDicomTagsModalData(dcmImage);
    }
</script>

<div
    class="flex h-full w-full flex-col gap-y-6 overflow-x-scroll overflow-y-scroll bg-gray-200 p-5"
>
    <div class="item-center justify-center self-center py-10">
        {#each containers as cont, i (cont.id)}
            <div class="item-center flex flex-col self-center py-2">
                <div
                    class="flex h-9 w-full self-center py-1.5"
                    style="width:{scaledValue(canvasScale, cont.width)}px;"
                >
                    <div class="h-full justify-center self-center text-center font-mono text-sm">
                        Page {i + 1}
                    </div>
                    <div class="grow"></div>
                    <div class="flex h-full w-16 flex-row text-slate-700">
                        <button class="flex h-full" onclick={onDownloadButtonClicked}>
                            <DownloadArrowSvg />
                        </button>
                        <div class="grow"></div>
                        <button class="flex h-full" onclick={onFloppyDiskButtonClicked}>
                            <FloppyDiskSvg />
                        </button>
                    </div>
                </div>
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div
                    class="flex self-center bg-white drop-shadow-md {StagesState.state
                        .SelectedStageId === cont.id
                        ? 'border border-blue-500'
                        : ''} "
                    onclick={() => StagesState.setSelectedStage(cont.id)}
                >
                    <div
                        id={cont.id}
                        class="bg-rose-50"
                        style="width:{scaledValue(canvasScale, cont.width)}px; height:{scaledValue(
                            canvasScale,
                            cont.height
                        )}px"
                    ></div>
                </div>
                {#if containers.length === i + 1}
                    <div class="flex w-full items-center justify-center self-center pt-10">
                        <button class="h-8 w-full rounded-md bg-gray-300"> Add Page </button>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
    {#if StagesState.state.MenuList !== null}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div
            class="absolute w-40 rounded-sm bg-gray-200 p-1"
            style="top: {StagesState.state.MenuList.pos.y}px; left: {StagesState.state.MenuList.pos
                .x}px;"
            onclick={(e) => e.stopPropagation()}
            role="menu"
            tabindex="0"
        >
            <button
                class="w-full cursor-default rounded-sm p-1 hover:bg-slate-300"
                onclick={() => onAddTagsMenuItemClicked(StagesState.state.MenuList!.id)}
                role="menuitem"
                type="button"
            >
                Add DICOM Tags
            </button>
        </div>
    {/if}
    {#if Workspace.state.DicomTagsModalData}
        <AddTagsModal dicomImageData={Workspace.state.DicomTagsModalData} />
    {/if}
</div>
