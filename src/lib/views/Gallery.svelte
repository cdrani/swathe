<script lang="ts">
    import { effectsList } from '../effects'
    import ImagePreview from '$lib/components/ImagePreview.svelte'
    import ViewActionButtons from '$lib/components/ViewActionButtons.svelte'

    export let src: string
</script>

<div
    class="overflow-auto bg-white relative w-full h-screen p-4 md:p-6 lg:p-8 xl:p-12 grid place-content-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
>
    {#each effectsList as effect (`grid-${effect}`)}
        <div class="container">
            <div class="flex justify-end">
                <ViewActionButtons small {effect} />
            </div>
            <ImagePreview {effect} {src} />
        </div>
    {/each}
</div>
