<script lang="ts">
    import type { DicomTag } from '$lib/stores/DcmImages.state.svelte';

    // Props
    export let tag: DicomTag;
</script>

<input
    id="checkbox-all-search"
    type="checkbox"
    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
    bind:checked={tag.Selected}
/>
<label for="checkbox-all-search" class="sr-only">checkbox</label>
