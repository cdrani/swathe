<script lang="ts">
    import { effectsList } from '../effects'
    import { getImage } from '$lib/stores/image'
    import { getEffect } from '$lib/stores/effect'

    import ImagePreview from '$lib/components/ImagePreview.svelte'
    import ViewActionButtons from '$lib/components/ViewActionButtons.svelte'

    const image = getImage()
    const selection = getEffect()
</script>

<div
    class="bg-white w-full p-4 md:p-6 md:ml-6 lg:p-8 xl:p-12 grid place-content-start grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6"
>
    {#each effectsList as effect (`grid-${effect}`)}
        <div id="gallery-{effect}" class="flex-col justify-between content-center">
            <h6
                class="absolute font-semibold mt-2 lowercase text-xl {$selection == effect
                    ? 'border-gray-900 rounded-md border-2 px-2 mt-1'
                    : ''}"
            >
                {effect}
            </h6>
            <ViewActionButtons small {effect} />
            <div class="aspect-[{$image.aspect}]">
                <ImagePreview {effect} />
            </div>
        </div>
    {/each}
</div>
