<script lang="ts">
    import LeftSideBar from './LeftSideBar.svelte';
    import TopSideBar from './TopSideBar.svelte';
</script>

<div class="flex h-screen w-screen flex-col overflow-hidden bg-gray-100">
    <nav class="shadow- flex h-10 w-full items-center justify-between bg-slate-200 px-4">
        <div class="flex items-center">
            <span class="text-2xl font-bold">Product</span>
        </div>
        <div></div>
    </nav>

    <div class="flex flex-1">
        <LeftSideBar />

        <div class="flex flex-1 flex-col">
            <TopSideBar />
        </div>
    </div>
</div>
