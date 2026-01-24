<script lang="ts">
    import type { DicomTag } from '$lib/stores/DcmImages.state.svelte';
    import DicomTagRow from './DicomTagRow.svelte';

    // Props
    export let dicomTags: DicomTag[];
    export let searchInput: string;
</script>

<div class="h-96 w-full">
    <table class="h-96 w-full table-auto overflow-hidden rounded-md border-none text-sm">
        <thead
            class="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400"
        >
            <tr class="h-12">
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        
                    </div>
                </th>
                <th scope="col" class="px-6 py-3"> Group </th>
                <th scope="col" class="px-6 py-3"> Element </th>
                <th scope="col" class="px-6 py-3"> Description </th>
                <th scope="col" class="px-6 py-3"> Value </th>
            </tr>
        </thead>

        <tbody class="h-min">
            {#each dicomTags as item (`${item.Group}${item.Element}${item.Value}`)}
                <DicomTagRow dicomItem={item} {searchInput}></DicomTagRow>
            {/each}
        </tbody>
    </table>
    <div class="grow"></div>
</div>
