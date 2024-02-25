<script lang="ts">
    import { getEffect } from '$lib/stores/effect'

    import ImageSlider from '$lib/components/ImageSlider.svelte'
    import ViewActionButtons from '$lib/components/ViewActionButtons.svelte'

    const effect = getEffect()
</script>

<div class="flex flex-col bg-white h-screen w-full mt-12 p-4 md:p-6 lg:p-8 xl:p-12">
    <div class="mb-0 lg:mb-4">
        <ViewActionButtons effect={$effect} />
    </div>
    <ImageSlider effect={$effect} />
</div>
