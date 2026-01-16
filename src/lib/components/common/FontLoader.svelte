<script lang="ts">
    import { loadGoogleFont } from '$lib/services/utils/fontloader-service';

    // Props
    let { font }: { font: string } = $props();

    // Reactivity
    let fontFamily = $derived(`'${font}', sans-serif`);
    $effect(() => {
        loadGoogleFont(font);
    });
</script>

<div class="h-full rounded-sm hover:bg-blue-100" style={`font-family: ${fontFamily}`}>
    <div>{font}</div>
</div>
