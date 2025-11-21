<script lang="ts">
    import { onMount } from 'svelte';
    import DesignBoardComponent from './DesignBoardComponent.svelte';
    import type { DesignBoard } from './DesignBoardType';
    import LeftSideBar from './LeftSideBar.svelte';
    import TopSideBar from './TopSideBar.svelte';

    // Locals
    let containers: Array<DesignBoard> = [];
    let canvasScale: number = 100;

    onMount(() => {
        containers.push({ id: 'stage-1', width: 1080, height: 1920 });
        containers.push({ id: 'stage-2', width: 500, height: 500 });
        containers = containers;
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
