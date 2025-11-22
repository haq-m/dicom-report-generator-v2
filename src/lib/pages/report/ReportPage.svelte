<script lang="ts">
    import { untrack } from 'svelte';
    import DesignBoardComponent from './DesignBoardComponent.svelte';
    import type { DesignBoard } from './DesignBoardType';
    import LeftSideBar from './LeftSideBar.svelte';
    import TopSideBar from './TopSideBar.svelte';
    import { Templates } from '$lib/stores/Templates.state.svelte';

    // Locals
    let containers: Array<DesignBoard> = $state([]);
    let canvasScale: number = 100;

    // Reactivity
    $effect(() => {
        const selectedItem = Templates.state.SelectedItem;
        untrack(() => {
            containers = [];
        });
        if (selectedItem === null) {
            untrack(() => {
                containers.push({ id: 'stage-1', width: 1080, height: 1920, stageData: null });
            });
            return;
        }

        untrack(() => {
            containers.push({
                id: 'stage-1',
                width: 1080,
                height: 1920,
                stageData: selectedItem.Stage
            });
        });
    });
</script>

<div class="flex h-screen w-screen flex-col bg-gray-100">
    <div class="flex h-full w-full">
        <LeftSideBar />

        <div class="flex h-full flex-1 flex-col">
            <TopSideBar />
            <DesignBoardComponent {containers} {canvasScale}></DesignBoardComponent>
        </div>
    </div>
</div>
