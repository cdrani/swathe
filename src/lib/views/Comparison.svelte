<script lang="ts">
    import { getEffect } from '$lib/stores/effect'

    import ImageSlider from '$lib/components/ImageSlider.svelte'
    import ViewActionButtons from '$lib/components/ViewActionButtons.svelte'

    const effect = getEffect()
</script>

<div
    class="flex flex-col bg-white h-screen w-full place-content-start md:mt-20 md:place-content-start p-4 md:p-6 lg:p-8 xl:p-12"
>
    <ViewActionButtons effect={$effect} />
    <ImageSlider effect={$effect} />
</div>
