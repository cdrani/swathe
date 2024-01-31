<script lang="ts">
    import { effectsList } from '../effects'
    import ImagePreview from '$lib/components/ImagePreview.svelte'

    export let src: string
</script>

<div
    class="overflow-auto relative w-full h-full p-4 md:p-7 lg:p-10 xl:p-16 grid place-content-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
>
    {#each effectsList as effect (`grid-${effect}`)}
        <ImagePreview {effect} {src} />
    {/each}
</div>
