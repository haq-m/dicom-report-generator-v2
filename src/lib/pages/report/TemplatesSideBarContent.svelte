<script lang="ts">
    import type { TemplateItem } from '$lib/stores/Templates';
    import { Templates } from '$lib/stores/Templates.state.svelte';
    import { Workspace } from '$lib/stores/Workspace.state.svelte';
    import CrossSvg from '$lib/svgs/CrossSvg.svelte';
    import Masonry from 'svelte-bricks';
    import TemplateThumbnailComponent from './TemplateThumbnailComponent.svelte';

    // Functions
    function onXButtonClicked() {
        Workspace.clearSideBarSelection();
    }

    function onTemplateItemClicked(template: TemplateItem) {
        Templates.setSelectedItem(template);
    }
</script>

<div class="flex h-full w-full flex-col p-2">
    <div class="flex border-b border-b-gray-300 pt-2 pb-2">
        <div class="font-mono">Templates</div>
        <div class="grow"></div>
        <button on:click={onXButtonClicked}>
            <CrossSvg></CrossSvg>
        </button>
    </div>

    <Masonry
        items={Templates.state.Items}
        getId={(item) => item.Name}
        animate={false}
        minColWidth={80}
        maxColWidth={200}
        gap={5}
        class="p-1"
    >
        {#snippet children({ item })}
            <button class="border border-gray-200 p-1" on:click={() => onTemplateItemClicked(item)}>
                <TemplateThumbnailComponent stageData={item.Stage} alt={item.Name} />
            </button>
        {/snippet}
    </Masonry>
</div>
