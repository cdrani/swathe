<script lang="ts">
    import ImagePreview from '$lib/components/ImagePreview.svelte'
    import ViewActionButtons from '$lib/components/ViewActionButtons.svelte'

    export let src = ''
    export let effect = 'none'
</script>

<div class="relative flex-col bg-white w-full h-screen place-content-center overflow-auto p-4 lg:p-6 xl:p-8">
    <div class="relative flex w-full justify-end m2-4">
        <ViewActionButtons {effect} />
    </div>

    <div class="grid grid-cols-8 place-content-center gap-4 lg:gap-6 xl:gap-8 w-full">
        <div class="w-full row-span-2 col-span-2">
            <ImagePreview id="preview" effect="none" {src} />
        </div>
        <div class="w-full col-start-3 col-end-12">
            <ImagePreview {src} {effect} />
        </div>
    </div>
</div>
