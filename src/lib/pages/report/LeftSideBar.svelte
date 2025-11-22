<script lang="ts">
    import {
        Workspace,
        type LeftSideBarContentTypeSelection
    } from '$lib/stores/Workspace.state.svelte';
    import DcmSvg from '$lib/svgs/DcmSvg.svelte';
    import ImageSvg from '$lib/svgs/ImageSvg.svelte';
    import ShapeSvg from '$lib/svgs/ShapeSvg.svelte';
    import TemplateSvg from '$lib/svgs/TemplateSvg.svelte';
    import DcmFilesSideBarContent from './DcmFilesSideBarContent.svelte';
    import ImagesSideBarContent from './ImagesSideBarContent.svelte';
    import ShapesSideBarContent from './ShapesSideBarContent.svelte';
    import TemplatesSideBarContent from './TemplatesSideBarContent.svelte';

    // Locals
    const expandDrawer = $derived(
        Workspace.state.SideBarSelection.leftBarSelection !== null ||
            Workspace.state.SideBarSelection.topBarSelection !== null
    );

    // Functions
    function onClick(type: LeftSideBarContentTypeSelection) {
        if (Workspace.state.SideBarSelection.leftBarSelection === type) {
            Workspace.clearLeftBarSelection();
            return;
        }
        Workspace.setLeftSideBarContentTypeSelection(type);
    }
</script>

<aside
    class="flex flex-row overflow-hidden border-r border-slate-300 bg-white text-gray-800 ease-in-out"
    class:w-80={expandDrawer}
    class:w-14={!expandDrawer}
>
    <div class="flex w-14 flex-col">
        <button class="flex h-14 w-14 p-2 text-slate-500" onclick={() => onClick('Templates')}>
            <TemplateSvg />
        </button>
        <button class="flex h-14 w-14 p-2 text-slate-500" onclick={() => onClick('Shapes')}>
            <ShapeSvg />
        </button>
        <button class="flex h-14 w-14 p-2 text-slate-500" onclick={() => onClick('DcmFiles')}>
            <DcmSvg />
        </button>
        <button class="flex h-14 w-14 p-2 text-slate-500" onclick={() => onClick('Images')}>
            <ImageSvg />
        </button>
    </div>
    {#if expandDrawer}
        {#if Workspace.state.SideBarSelection.leftBarSelection === 'Shapes'}
            <ShapesSideBarContent />
        {:else if Workspace.state.SideBarSelection.leftBarSelection === 'Images'}
            <ImagesSideBarContent />
        {:else if Workspace.state.SideBarSelection.leftBarSelection === 'DcmFiles'}
            <DcmFilesSideBarContent />
        {:else}
            <TemplatesSideBarContent />
        {/if}
    {/if}
</aside>
