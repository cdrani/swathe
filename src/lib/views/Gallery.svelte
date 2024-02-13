<script lang="ts">
    import { effectsList } from '../effects'

    import ImagePreview from '$lib/components/ImagePreview.svelte'
    import ViewActionButtons from '$lib/components/ViewActionButtons.svelte'
</script>

<div
    class="bg-white w-full p-4 md:p-6 md:ml-6 lg:p-8 xl:p-12 grid place-content-start grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6"
>
    {#each effectsList as effect (`grid-${effect}`)}
        <div class="flex-col justify-between content-center">
            <ViewActionButtons small {effect} />
            <ImagePreview {effect} />
        </div>
    {/each}
</div>
