<script lang="ts">
    import CrossSvg from '$lib/svgs/CrossSvg.svelte';
    import FontsJson from '$lib/assets/webfonts.json';
    import { onMount } from 'svelte';
    import type { FontsData } from '$lib/assets/webfonts.types';
    import FontLoader from '$lib/components/common/FontLoader.svelte';
    import { StagesState } from '$lib/stores/Stages.state.svelte';
    import { Workspace } from '$lib/stores/Workspace.state.svelte';

    // Locals
    let fonts: FontsData = [];

    // Functions
    async function onTextFontClicked(fontName: string) {
        console.log('ADD TEXT', fontName);
        StagesState.addTextToSelectedStage('#0000FF', fontName);
    }

    function onXButtonClicked() {
        Workspace.clearLeftBarSelection();
    }

    // Lifecycles
    onMount(() => {
        fonts = (FontsJson.items as unknown as FontsData).splice(0, 30);
    });
</script>

<div class="h-96 grow flex-col">
    <div class="flex border-b border-b-gray-300 pt-2 pb-2">
        <div class="font-mono">Texts</div>
        <div class="grow"></div>
        <button on:click={onXButtonClicked}>
            <CrossSvg />
        </button>
    </div>
    <div class="flex h-full pt-4">
        <div class="flex h-full w-full flex-col overflow-y-scroll">
            {#each fonts as font}
                <button
                    class="text-left"
                    on:click={async () => {
                        await onTextFontClicked(font.family);
                    }}
                >
                    <FontLoader font={font.family} />
                </button>
            {/each}
        </div>
    </div>
</div>
