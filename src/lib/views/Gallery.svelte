<script lang="ts">
    import { effectsList } from '../effects'
    import ImagePreview from '$lib/components/ImagePreview.svelte'

    export let src: string
</script>

<div class="overflow-auto relative w-full h-full p-4 md:p-7 lg:p-10 xl:p-16 grid place-content-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
    {#each effectsList as effect (effect)}
        <ImagePreview dynamic effect={effect} src={src} view="grid" />
    {/each}
</div>
