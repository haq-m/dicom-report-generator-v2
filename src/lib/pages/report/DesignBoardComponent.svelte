<script lang="ts">
    import AddFileSvg from '$lib/svgs/AddFileSvg.svelte';
    import TrashSvg from '$lib/svgs/TrashSvg.svelte';
    import DownloadArrowSvg from '$lib/svgs/DownloadArrowSvg.svelte';
    import type { DesignBoard } from './DesignBoardType';
    import { onMount } from 'svelte';
    import { StagesStore } from '$lib/stores/StagesStore.svelte';

    // Props
    export let containers: Array<DesignBoard>;
    export let canvasScale: number;

    // Locals
    let mounted: boolean = false;

    // Reactivity
    $: onContainersChanged(containers);

    // Functions
    function onContainersChanged(list: Array<DesignBoard>) {
        if (!mounted) {
            return;
        }

        // Queue the creation of KonvaJS stage. This ensures the stage is created after
        // the div is created
        list.forEach((container, index) => {
            setTimeout(() => {
                const stageDiv = document.getElementById(container.id);
                if (stageDiv === null) {
                    return;
                }
                StagesStore.addNewStageToContainer(container.id, container.width, container.height);
                if (index === 0 && StagesStore.state.SelectedStageId === null) {
                    StagesStore.setSelectedStage(container.id);
                }
            }, 0);
        });
    }

    function scaledValue(scale: number, value: number): number {
        return value * (scale / 100);
    }

    // Lifecycles
    onMount(async () => {
        mounted = true;
    });
</script>

<div
    class="flex h-full w-full flex-col gap-y-6 overflow-x-scroll overflow-y-scroll bg-gray-200 p-5"
>
    <div class="item-center justify-center self-center py-10">
        {#each containers as cont, i (cont.id)}
            <div class="item-center flex flex-col self-center py-2">
                <div
                    class="flex h-8 w-full self-center py-1.5"
                    style="width:{scaledValue(canvasScale, cont.width)}px;"
                >
                    <div class="h-full justify-center self-center text-center font-mono text-sm">
                        Page {i + 1}
                    </div>
                    <div class="grow"></div>
                    <div class="grow"></div>
                    <div class="flex h-full gap-x-3 text-slate-700">
                        <DownloadArrowSvg />
                        <TrashSvg />
                        <AddFileSvg />
                    </div>
                </div>
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div
                    class="flex self-center bg-white drop-shadow-md {StagesStore.state
                        .SelectedStageId === cont.id
                        ? 'border border-blue-500'
                        : ''} "
                    on:click={() => StagesStore.setSelectedStage(cont.id)}
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
</div>
