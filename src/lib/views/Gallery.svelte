<script lang="ts">
    import { effectsList } from '../effects'
    import { getImage } from '$lib/stores/image'

    import ImagePreview from '$lib/components/ImagePreview.svelte'
    import ViewActionButtons from '$lib/components/ViewActionButtons.svelte'

    const image = getImage()
    const { aspect } = $image
</script>

<div
    class="bg-white w-full p-4 md:p-6 md:ml-6 lg:p-8 xl:p-12 grid place-content-start grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6"
>
    {#each effectsList as effect (`grid-${effect}`)}
        <div class="flex-col justify-between content-center">
            <ViewActionButtons small {effect} />
            <div class="aspect-[{aspect}]">
                <ImagePreview {effect} />
            </div>
        </div>
    {/each}
</div>
