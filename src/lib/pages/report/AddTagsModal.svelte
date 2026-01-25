<script lang="ts">
    import type { DicomData, DicomTag } from '$lib/stores/DcmImages.state.svelte';
    import { StagesState } from '$lib/stores/Stages.state.svelte';
    import { Workspace } from '$lib/stores/Workspace.state.svelte';
    import DicomTagTable from './DicomTagTable.svelte';

    // Props
    interface Props {
        dicomImageData: DicomData;
    }
    const { dicomImageData }: Props = $props();

    // Locals
    let searchInput: string = $state('');

    // Functions
    function closeAddTagsModal() {
        Workspace.setAddDicomTagsModalData(null);
    }

    function addTagsButtonClicked() {
        const selectedItems = dicomImageData.dicomTag.filter((x) => x.Selected);
        StagesState.addDicomTagsTableToSelectedStage(selectedItems);
        closeAddTagsModal();
    }
</script>

<div class="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
    <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-2xl">
        <h2 class="mb-2 text-xl font-bold text-slate-800">DICOM Tags</h2>
        <h3 class="text-md text-slate-800">
            Add DICOM tags you wish to show in the report. Click save when you are done.
        </h3>

        <div class="grid gap-4 py-4">
            <input
                class="input rounded-sm border bg-transparent p-1"
                type="text"
                placeholder="Search..."
                bind:value={searchInput}
            />
        </div>

        <div class="relative overflow-x-auto shadow-md">
            <DicomTagTable bind:dicomTags={dicomImageData.dicomTag} bind:searchInput />
        </div>

        <div class="mt-6 flex justify-end gap-3">
            <button
                class="rounded-md px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
                onclick={closeAddTagsModal}
            >
                Cancel
            </button>
            <button
                class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
                onclick={addTagsButtonClicked}
            >
                Save
            </button>
        </div>
    </div>
</div>
