<script lang="ts">
    import type { TemplateItem } from '$lib/stores/Templates';
    import { Templates } from '$lib/stores/Templates.state.svelte';
    import { Workspace } from '$lib/stores/Workspace.state.svelte';
    import CrossSvg from '$lib/svgs/CrossSvg.svelte';
    import Masonry from 'svelte-bricks';

    // Functions
    function onXButtonClicked() {
        Workspace.clearLeftBarSelection();
    }

    function onTemplateItemClicked(template: TemplateItem) {
        Templates.setSelectedItem(template);
    }
</script>

<div class="flex h-full flex-col">
    <div class="flex border-b border-b-gray-300 pt-2 pb-2">
        <div class="font-mono">Templates</div>
        <div class="grow"></div>
        <button on:click={onXButtonClicked}>
            <CrossSvg></CrossSvg>
        </button>
    </div>

    <Masonry
        items={Templates.state.Items}
        getId={(item) => item.Stage}
        animate={false}
        minColWidth={80}
        maxColWidth={200}
        gap={5}
    >
        {#snippet children({ item })}
            <button on:click={() => onTemplateItemClicked(item)}>{item.Thumbnail}</button>
        {/snippet}
    </Masonry>
</div>
