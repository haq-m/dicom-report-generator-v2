<script lang="ts">
    import { StagesState } from '$lib/stores/Stages.state.svelte';
    
    // Props
    export let stageData: string;
    export let alt: string;

    // Reactivity
    $: thumbnailPromise = generateKonvaThumbnail(stageData, {
        mimeType: 'image/jpeg',
        quality: 0.8
    });

    // Functions
    async function generateKonvaThumbnail(
        serializedStage: string,
        options: {
            quality?: number;
            mimeType?: string;
        } = {}
    ): Promise<string> {
        const { quality = 0.8, mimeType = 'image/jpeg' } = options;

        const container = document.createElement('div');
        const stage = await StagesState.deserializeStageForThumbnail(serializedStage, container);

        const dataURL = stage.toDataURL({
            mimeType: mimeType,
            quality: quality
        });

        stage.destroy();
        container.remove();
        return dataURL;
    }
</script>

<div>
    {#await thumbnailPromise}
        <div>
            <span>Loading...</span>
        </div>
    {:then dataUrl}
        <img src={dataUrl} {alt} />
    {:catch error}
        <div>
            <span>Error generating preview</span>
            <small>{error.message}</small>
        </div>
    {/await}
</div>
