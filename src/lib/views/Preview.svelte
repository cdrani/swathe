<script lang="ts">
    import { getEffect } from '$lib/stores/effect'
    import ImagePreview from '$lib/components/ImagePreview.svelte'
    import ViewActionButtons from '$lib/components/ViewActionButtons.svelte'

    const effect = getEffect()
</script>

<div
    class="flex flex-col bg-white h-screen w-full place-content-center md:mt-20 md:place-content-start p-4 md:p-6 lg:p-8 xl:p-12"
>
    <ViewActionButtons effect={$effect} />

    <div class="lg:pt-4 grid grid-cols-8 place-content-center gap-4 lg:gap-6 xl:gap-8 w-full">
        <div class="w-full row-span-2 col-span-2">
            <ImagePreview id="preview" effect="none" />
        </div>
        <div class="w-full col-start-3 col-end-12">
            <ImagePreview id="preview-effect" effect={$effect} />
        </div>
    </div>
</div>
