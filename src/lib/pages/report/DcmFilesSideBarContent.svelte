<script lang="ts">
    import Masonry from 'svelte-bricks';
    import { WorkspaceStore } from '$lib/stores/WorkspaceStore.svelte';
    import CrossSvg from '$lib/svgs/CrossSvg.svelte';

    // Locals
    let dicomImages: string[] = [];
    let fileInput: HTMLInputElement;
    

    // Handler for the file input change event
    async function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        const files = input.files;

        dicomImages = [];

        const dicomTs = await import("dicom.ts");
        
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file && file.type && file.type.startsWith('application/dicom')) {
                    const byteArray = await file.arrayBuffer();
                    const image = dicomTs.default.parseImage(byteArray);
                    if (image === null)
                    {
                        continue;
                    }
                    const canvas: HTMLCanvasElement = document.createElement('canvas');
                    const renderer = new dicomTs.default.Renderer(canvas);
                    await renderer.render(image, 0);
                    const imageUrl = canvas.toDataURL();
                    dicomImages.push(imageUrl)
                    dicomImages = dicomImages
                } else if (file) {
                    console.log(`File ${file.name} is not a DICOM file and will be skipped.`);
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
        WorkspaceStore.clearLeftBarSelection();
    }
</script>

<div class="flex flex-col h-full w-full p-2">
    <div class="flex justify-center items-center font-medium h-10">
        <div class="text-lg">DICOM Files</div>
        <div class="grow"></div>
        <button onclick={onXButtonClicked}>
            <CrossSvg />
        </button>
    </div>
    <hr class="border-slate-300 mx-1 my-2" />
    <div class="flex flex-col overflow-y-scroll h-full">
        <button
            class="mt-2 mb-2 h-10 w-full items-center justify-center rounded-md bg-[#3A3A4C] text-center text-sm text-white"
            onclick={triggerFileInput}
        >
            Upload
        </button>
        <input
            type="file"
            accept="application/dicom"
            multiple
            onchange={handleFileChange}
            bind:this={fileInput}
            class="hidden"
        />
        <section class="mt-2 mb-2 text-gray-600 h-full">
            <Masonry
                items={dicomImages}
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
