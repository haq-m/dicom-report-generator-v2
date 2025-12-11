<script lang="ts">
    import {
        Workspace,
        type LeftSideBarContentTypeSelection
    } from '$lib/stores/Workspace.state.svelte';
    import DcmSvg from '$lib/svgs/DcmSvg.svelte';
    import ImageSvg from '$lib/svgs/ImageSvg.svelte';
    import ShapeSvg from '$lib/svgs/ShapeSvg.svelte';
    import TemplateSvg from '$lib/svgs/TemplateSvg.svelte';
    import TextSvg from '$lib/svgs/TextSvg.svelte';
    import ColorPickerSideBarContent from './ColorPickerSideBarContent.svelte';
    import DcmFilesSideBarContent from './DcmFilesSideBarContent.svelte';
    import ImagesSideBarContent from './ImagesSideBarContent.svelte';
    import ShapesSideBarContent from './ShapesSideBarContent.svelte';
    import TemplatesSideBarContent from './TemplatesSideBarContent.svelte';
    import TextsSideBarContent from './TextsSideBarContent.svelte';

    // Locals
    const expandDrawer = $derived(Workspace.state.SideBarSelection !== null);

    // Functions
    function onClick(type: LeftSideBarContentTypeSelection) {
        if (Workspace.state.SideBarSelection === type) {
            Workspace.clearSideBarSelection();
            return;
        }
        Workspace.setSideBarContentTypeSelection(type);
    }
</script>

<aside
    class="flex flex-row overflow-hidden border-r border-slate-300 bg-white text-gray-800 ease-in-out"
    class:w-80={expandDrawer}
    class:w-14={!expandDrawer}
>
    <div class="flex w-14 flex-col">
        <button
            class="flex h-14 w-14 p-2 text-slate-500"
            onclick={() => onClick({ type: 'Templates', value: '' })}
        >
            <TemplateSvg />
        </button>
        <button
            class="flex h-14 w-14 p-2 text-slate-500"
            onclick={() => onClick({ type: 'Texts', value: '' })}
        >
            <TextSvg />
        </button>
        <button
            class="flex h-14 w-14 p-2 text-slate-500"
            onclick={() => onClick({ type: 'Shapes', value: '' })}
        >
            <ShapeSvg />
        </button>

        <button
            class="flex h-14 w-14 p-2 text-slate-500"
            onclick={() => onClick({ type: 'DcmFiles', value: '' })}
        >
            <DcmSvg />
        </button>
        <button
            class="flex h-14 w-14 p-2 text-slate-500"
            onclick={() => onClick({ type: 'Images', value: '' })}
        >
            <ImageSvg />
        </button>
    </div>
    {#if expandDrawer}
        {#if Workspace.state.SideBarSelection?.type === 'Shapes'}
            <ShapesSideBarContent />
        {:else if Workspace.state.SideBarSelection?.type === 'Colors'}
            <ColorPickerSideBarContent />
        {:else if Workspace.state.SideBarSelection?.type === 'Texts'}
            <TextsSideBarContent />
        {:else if Workspace.state.SideBarSelection?.type === 'Images'}
            <ImagesSideBarContent />
        {:else if Workspace.state.SideBarSelection?.type === 'DcmFiles'}
            <DcmFilesSideBarContent />
        {:else}
            <TemplatesSideBarContent />
        {/if}
    {/if}
</aside>
