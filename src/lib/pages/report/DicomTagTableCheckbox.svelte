<script lang="ts">
    import type { DicomTag } from '$lib/stores/DcmImages.state.svelte';

    // Props
    export let tag: DicomTag;
</script>

<input
    id="checkbox-all-search"
    type="checkbox"
    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
    bind:checked={tag.Selected}
/>
<label for="checkbox-all-search" class="sr-only">checkbox</label>
