<script lang="ts">
    import { StagesState } from '$lib/stores/Stages.state.svelte';
    import { Workspace } from '$lib/stores/Workspace.state.svelte';
    import ExportSvg from '$lib/svgs/ExportSvg.svelte';

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

    function onExportButtonClicked() {
        StagesState.exportToPdf('hello.pdf', 2);
    }
</script>

<div
    class="flex h-14 w-full flex-row items-center justify-start border-b border-slate-300 p-2 text-slate-600"
>
    <!-- svelte-ignore event_directive_deprecated -->
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button
        class="h-full rounded-md p-1 hover:bg-slate-200"
        style="color: {lastSelectedColor};"
        on:click={onColorButtonClicked}
    >
        <div class="h-full w-8 rounded-sm" style="background-color: {lastSelectedColor};"></div>
    </button>
    <div class="grow"></div>
    <!-- svelte-ignore event_directive_deprecated -->
    <button
        class="flex h-full flex-row rounded-md px-2 hover:bg-slate-200"
        on:click={onExportButtonClicked}
    >
        <div class="flex h-full items-center justify-start gap-x-2 rounded-md p-2">
            <ExportSvg />
            <span class="font-semibold">Export</span>
        </div>
    </button>
</div>
