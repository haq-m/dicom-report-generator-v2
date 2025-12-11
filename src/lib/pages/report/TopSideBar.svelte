<script lang="ts">
    import { Workspace } from '$lib/stores/Workspace.state.svelte';
    import SquareSvg from '$lib/svgs/SquareSvg.svelte';

    // Reactivity
    let lastSelectedColor = $derived.by(() => {
        if (Workspace.state.SideBarSelection?.type === 'Colors') {
            return Workspace.state.SideBarSelection?.selectedColor ?? '#545454';
        }
        return '#545454';
    });

    // Function
    function onColorButtonClicked() {
        if (Workspace.state.SideBarSelection?.type === 'Colors') {
            Workspace.clearSideBarSelection();
            return;
        }
        Workspace.setSideBarContentTypeSelection({ type: 'Colors', selectedColor: null });
    }
</script>

<div class="flex h-12 w-full items-center justify-start border-b border-slate-300">
    <!-- svelte-ignore event_directive_deprecated -->
    <button
        class="h-full rounded-md px-2 hover:bg-slate-200"
        style="color: {lastSelectedColor};"
        on:click={onColorButtonClicked}
    >
        <div class="w-7 rounded-md"><SquareSvg /></div>
    </button>
</div>
