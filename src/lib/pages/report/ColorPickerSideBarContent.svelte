<script lang="ts">
    import { Workspace } from '$lib/stores/Workspace.state.svelte';
    import CrossSvg from '$lib/svgs/CrossSvg.svelte';

    // Locals
    let solidColors: string[] = [
        '#000000',
        '#545454',
        '#737373',
        '#A6A6A6',
        '#D9D9D9',
        '#FFFFFF',
        '#FF3131',
        '#FF5757',
        '#FF66C4',
        '#CB6CE6',
        '#8C52FF',
        '#5E17EB',
        '#0097B2',
        '#0CC0DF',
        '#5CE1E6',
        '#38B6FF',
        '#5271FF',
        '#004AAD',
        '#00BF62',
        '#7ED957',
        '#C1FF72',
        '#FFDE59',
        '#FFBD59',
        '#FF914D'
    ];

    // Functions
    function onColorClicked(color: string) {
        Workspace.setSideBarContentTypeSelection({ type: 'Colors', selectedColor: color });
    }

    function onXButtonClicked() {
        Workspace.clearSideBarSelection();
    }
</script>

<!-- TODO: Add Color picker -->
<!-- TODO: Add Opacity slider -->
<div class="flex h-full w-full flex-col p-2">
    <div class="flex border-b border-b-gray-300 pt-2 pb-2">
        <div class="font-mono">Color</div>
        <div class="grow"></div>
        <button on:click={onXButtonClicked}>
            <CrossSvg />
        </button>
    </div>
    <div class="mt-4 text-xs">Solid Colors</div>
    <div class="h-full overflow-y-auto">
        <section class="mt-2 mb-2 grid grid-cols-6 gap-1">
            {#each solidColors as color}
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <button
                    class="flex h-full items-center justify-center self-center rounded-md border border-gray-100 p-1 hover:bg-slate-100"
                    on:click={() => {
                        onColorClicked(color);
                    }}
                >
                    <div class="h-6 w-6 rounded-sm" style={`background-color: ${color};`}></div>
                </button>
            {/each}
        </section>
    </div>
</div>
