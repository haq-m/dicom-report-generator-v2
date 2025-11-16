<script lang="ts">
    import CircleSvg from '$lib/svgs/CircleSvg.svelte';
    import CrossSvg from '$lib/svgs/CrossSvg.svelte';
    import LineSvg from '$lib/svgs/LineSvg.svelte';
    import SquareSvg from '$lib/svgs/SquareSvg.svelte';
    import { WorkspaceStore } from '$lib/stores/WorkspaceStore.svelte';
    import { StagesState } from '$lib/stores/Stages.state.svelte';

    // Functions
    function onXButtonClicked() {
        WorkspaceStore.clearLeftBarSelection();
    }

    function onSquareButtonClicked() {
        StagesState.addSquareToSelectedStage('red');
    }

    function onCircleButtonClicked() {
        StagesState.addCircleToSelectedStage('blue');
    }

    function onLineButtonClicked() {
        StagesState.addLineToSelectedStage('yellow');
    }
</script>

<div class="flex h-full flex-col">
    <div class="flex border-b border-b-gray-300 pt-2 pb-2">
        <div class="font-mono">Shapes</div>
        <div class="grow"></div>
        <button on:click={onXButtonClicked}>
            <CrossSvg></CrossSvg>
        </button>
    </div>
    <div class="mt-4 text-xs">Shapes</div>
    <div class="h-full overflow-y-auto">
        <section class="mt-2 mb-2 grid gap-1 text-gray-600 sm:grid-cols-2 lg:grid-cols-3">
            <button on:click={onLineButtonClicked}><LineSvg /></button>
            <button on:click={onSquareButtonClicked}><SquareSvg /></button>
            <button on:click={onCircleButtonClicked}><CircleSvg /></button>
        </section>
    </div>
</div>
