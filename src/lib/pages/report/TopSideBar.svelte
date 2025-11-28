<script lang="ts">
    import { Workspace } from '$lib/stores/Workspace.state.svelte';
    import SquareSvg from '$lib/svgs/SquareSvg.svelte';

    // Function
    function onColorButtonClicked() {
        if (Workspace.state.SideBarSelection?.type === 'Colors') {
            Workspace.clearSideBarSelection();
            return;
        }
        Workspace.setSideBarContentTypeSelection({ type: 'Colors', value: '' });
    }
</script>

<div class="flex h-12 w-full items-center justify-start border-b border-slate-300">
    <button
        class="h-full rounded-md px-2 text-slate-500 hover:bg-slate-200"
        on:click={onColorButtonClicked}
    >
        <div class="w-7 rounded-md"><SquareSvg /></div>
    </button>
</div>
