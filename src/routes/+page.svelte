<script lang="ts">
    import '../app.css'

    import { initModal } from '$lib/stores/modal'
    import { initEffect } from '$lib/stores/effect'
    import { initView, getView } from '$lib/stores/view'
    import { initImage, getImage } from '$lib/stores/image'

    import Gallery from '$lib/views/Gallery.svelte'
    import Preview from '$lib/views/Preview.svelte'
    import Modal from '$lib/components/Modal.svelte'
    import Sidebar from '$lib/components/Sidebar.svelte'
    import Comparison from '$lib/views/Comparison.svelte'
    import Settings from '$lib/components/Settings.svelte'
    import FileUpload from '$lib/components/FileUpload.svelte'
    import ComparisonSlider from '$lib/views/ComparisonSlider.svelte'

    initImage()
    initView()
    initEffect()
    initModal()

    const view = getView()
    const image = getImage()
    console.log({ image: $image })
</script>

<div class="mx-auto max-w-[90rem] h-screen">
    <div class="relative flex flex-1 w-full overflow-hidden">
        <div class="absolute inset-0 right-auto left-0 bg-gray-800 w-40 md:w-56">
            <Sidebar />
        </div>

        <div class="bg-white relative flex flex-1 ml-[14rem] w-full overflow-y-auto">
            <Settings vertical={$view == 'gallery'} />
            <main class="flex flex-1 bg-white">
                {#if !$image?.src}
                    <FileUpload />
                {:else}
                    <Modal />
                    {#if $view == 'gallery'}
                        <Gallery />
                    {:else if $view == 'preview'}
                        <Preview />
                    {:else}
                        <Comparison />
                    {/if}
                {/if}
            </main>
        </div>
    </div>
</div>

<style lang="postcss">
    :global(body) {
        @apply bg-gray-800;
    }
</style>
