<script lang="ts">
    import { StagesState } from '$lib/stores/Stages.state.svelte';
    import { Workspace } from '$lib/stores/Workspace.state.svelte';
    import ExportSvg from '$lib/svgs/ExportSvg.svelte';

    // Reactivity
    let lastSelectedColor = $derived.by(() => {
        if (Workspace.state.SideBarSelection?.type === 'Colors') {
            return Workspace.state.SideBarSelection?.selectedColor ?? '#ffffff';
        }
        return '#ffffff';
    });

    // Function
    function onColorButtonClicked() {
        if (Workspace.state.SideBarSelection?.type === 'Colors') {
            Workspace.clearSideBarSelection();
            return;
        }
        Workspace.setSideBarContentTypeSelection({ type: 'Colors', selectedColor: '#ffffff' });
    }

    function getFilenameSafeTimestamp(): string {
        const date = new Date();
        const year = date.getFullYear();
        // Month is zero-indexed, so add 1 and pad with '0'
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        // Format: YYYY-MM-DDTHHMMSS (e.g., 2026-01-26T185200)
        return `${year}-${month}-${day}T${hours}${minutes}${seconds}`;
    }

    function onExportButtonClicked() {
        StagesState.exportToPdf(`report_${getFilenameSafeTimestamp()}.pdf`, 2);
    }
</script>

<div
    class="flex h-14 w-full flex-row items-center justify-start border-b border-slate-300 p-2 text-slate-600"
>
    <!-- svelte-ignore event_directive_deprecated -->
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <span>Color: </span>
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button
        class="flex h-full items-center justify-center rounded-md p-1 hover:bg-slate-200"
        onclick={onColorButtonClicked}
    >
        <div
            class=" flex h-full w-8 rounded-sm border border-slate-200"
            style="background-color: {lastSelectedColor};"
        ></div>
    </button>
    <div class="grow"></div>
    <!-- svelte-ignore event_directive_deprecated -->
    <button
        class="flex h-full flex-row rounded-md px-2 hover:bg-slate-200"
        onclick={onExportButtonClicked}
    >
        <div class="flex h-full items-center justify-start gap-x-2 rounded-md p-2">
            <ExportSvg />
            <span class="font-semibold">Export</span>
        </div>
    </button>
</div>
