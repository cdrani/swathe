<script lang="ts">
    import ImagePreview from '$lib/components/ImagePreview.svelte'
    import ViewActionButtons from '$lib/components/ViewActionButtons.svelte'

    export let src = ''
    export let effect = 'none'
</script>

<div class="flex-col w-full place-content-center overflow-auto m-4 lg:m-6">
    <div class="relative flex w-full justify-end mb-4">
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
