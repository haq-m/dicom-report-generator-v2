<script lang="ts">
    import Masonry from 'svelte-bricks';
    import { Workspace } from '$lib/stores/Workspace.state.svelte';
    import CrossSvg from '$lib/svgs/CrossSvg.svelte';

    // Locals
    let selectedImages: string[] = [];
    let fileInput: HTMLInputElement;
    const imageList: string[] = [
        'https://images.unsplash.com/photo-1516534083989-bd7c5a48cada?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1515923019249-6b544314450f?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1501349800519-48093d60bde0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1495195129352-aeb325a55b65?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8ODY1NDMxfHxlbnwwfHx8fHw%3D'
    ];

    // Functions
    function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        const files = input.files;

        selectedImages = [];

        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file && file.type && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        if (e.target && typeof e.target.result === 'string') {
                            selectedImages = [...selectedImages, e.target.result];
                        }
                    };
                    reader.readAsDataURL(file);
                } else if (file) {
                    console.log(`File ${file.name} is not an image and will be skipped.`);
                }
            }
        }
    }

    function triggerFileInput() {
        fileInput.click();
    }

    function onImageClicked(src: string) {
        console.log('Image clicked: ', src);
    }

    function onXButtonClicked() {
        Workspace.clearLeftBarSelection();
    }

    function masonryItems(uploadedItems: string[], imageListItems: string[]): string[] {
        return [...uploadedItems, ...imageListItems];
    }
</script>

<div class="flex h-full flex-col p-2">
    <div class="flex h-10 items-center justify-center font-medium">
        <div class="text-lg">Images</div>
        <div class="grow"></div>
        <button onclick={onXButtonClicked}>
            <CrossSvg />
        </button>
    </div>
    <hr class="mx-1 my-2 border-slate-300" />
    <div class="flex h-full flex-col overflow-y-scroll">
        <button
            class="mt-2 mb-2 h-10 w-full items-center justify-center rounded-md bg-[#3A3A4C] text-center text-sm text-white"
            onclick={triggerFileInput}
        >
            Upload
        </button>
        <input
            type="file"
            accept="image/*"
            multiple
            onchange={handleFileChange}
            bind:this={fileInput}
            class="hidden"
        />
        <section class="mt-2 mb-2 h-full text-gray-600">
            <Masonry
                items={masonryItems(selectedImages, imageList)}
                animate={false}
                minColWidth={80}
                maxColWidth={200}
                gap={5}
            >
                {#snippet children({ item })}
                    <img src={item} alt={item} onclick={() => onImageClicked(item)} />
                {/snippet}
            </Masonry>
        </section>
    </div>
</div>
