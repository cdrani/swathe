<script lang="ts">
    import { getImage } from '$lib/stores/image'
    import { getEffect } from '$lib/stores/effect'
    import ImagePreview from '$lib/components/ImagePreview.svelte'
    import ViewActionButtons from '$lib/components/ViewActionButtons.svelte'

    const image = getImage()
    const effect = getEffect()
</script>

<div
    class="flex flex-col bg-white h-screen w-full place-content-center md:place-content-start mt-12 p-4 md:p-6 lg:p-8 xl:p-12"
>
    <ViewActionButtons effect={$effect} />

    <div class="lg:pt-4 grid grid-cols-8 place-content-center gap-4 lg:gap-5 xl:gap-6 w-full">
        <div class="col-span-2 aspect-[{$image.aspect}]">
            <ImagePreview id="preview" effect="none" />
        </div>
        <div class="w-full col-start-3 col-end-12">
            <ImagePreview effect={$effect} />
        </div>
    </div>
</div>
