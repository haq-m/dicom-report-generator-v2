<script lang="ts">
    import Masonry from 'svelte-bricks';
    import { Workspace } from '$lib/stores/Workspace.state.svelte';
    import CrossSvg from '$lib/svgs/CrossSvg.svelte';
    import { StagesState } from '$lib/stores/Stages.state.svelte';
    import { DcmImages, type DicomTag } from '$lib/stores/DcmImages.state.svelte';

    // Locals
    let fileInput: HTMLInputElement;

    // Functions
    async function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        const files = input.files;
        if (!files) {
            return;
        }

        const dicomTs = await import('dicom.ts');

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (!file) {
                continue;
            }

            try {
                const byteArray = await file.arrayBuffer();
                const image = dicomTs.default.parseImage(byteArray);
                if (image === null) {
                    console.warn(`Could not parse ${file.name}`);
                    continue;
                }

                const canvas = document.createElement('canvas');
                const renderer = new dicomTs.default.Renderer(canvas);

                await renderer.render(image, 0);
                const imageUrl = canvas.toDataURL();
                const dicomTagList = getDicomTag(image);
                console.log('TAGS: ', dicomTagList);
                DcmImages.addDcmImage({
                    fileName: file.name,
                    imageUrl: imageUrl,
                    dicomTag: dicomTagList
                });
            } catch (err) {
                console.error(`Error processing file ${file.name}:`, err);
            }
        }
    }

    function getDicomTag(image: any): DicomTag[] {
        let tags = [];
        for (const [key, value] of Object.entries(image.tags)) {
            const tag = getDescriptionName(key, `${value}`, image.tags[key].getConvertedValue());
            if (tag) {
                tags.push(tag);
            }
        }
        return tags;
    }

    function escapeRegex(regex: string) {
        return regex.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    function getDescriptionName(
        dicomId: string,
        displayName: string,
        value: string
    ): DicomTag | null {
        const group: string = dicomId.substring(0, 4);
        const element: string = dicomId.substring(4, 8);
        const regexStr: string = `(?<=${escapeRegex(`(${group},${element})`)})(.*)(?=${escapeRegex(`[${value}]`)})`;
        let regex: RegExp = new RegExp(regexStr);
        let match = displayName.match(regex);
        let des = match?.at(1)?.trim();

        if (des) {
            let sanitizedValue = '';
            const objectType = Object.prototype.toString.call(value);
            if (objectType === '[object Array]') {
                sanitizedValue = value.toString();
            } else {
                sanitizedValue = JSON.stringify(value);
            }
            return {
                Group: group,
                Element: element,
                Description: des,
                Value: sanitizedValue
            };
        }
        return null;
    }

    function triggerFileInput() {
        fileInput.click();
    }

    function onImageClicked(src: string) {
        StagesState.addImageToSelectedStageAsync(src);
    }

    function onXButtonClicked() {
        Workspace.clearSideBarSelection();
    }
</script>

<div class="flex h-full w-full flex-col p-2">
    <div class="flex h-10 items-center justify-center font-medium">
        <div class="text-lg">DICOM Files</div>
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
            accept="application/dicom"
            multiple
            onchange={handleFileChange}
            bind:this={fileInput}
            class="hidden"
        />
        <section class="mt-2 mb-2 h-full text-gray-600">
            <Masonry
                items={DcmImages.state.Images}
                getId={(item) => item.fileName}
                animate={false}
                minColWidth={80}
                maxColWidth={200}
                gap={5}
            >
                {#snippet children({ item })}
                    <img
                        src={item.imageUrl}
                        alt={item.fileName}
                        onclick={() => onImageClicked(item.imageUrl)}
                    />
                {/snippet}
            </Masonry>
        </section>
    </div>
</div>
