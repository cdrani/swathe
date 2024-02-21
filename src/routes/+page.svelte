<script lang="ts">
    import '../app.css'

    import { onMount } from 'svelte'
    import { initView, getView } from '$lib/stores/view'
    import { initModal, getModal } from '$lib/stores/modal'
    import { initImage, getImage } from '$lib/stores/image'
    import { initEffect, getEffect } from '$lib/stores/effect'

    import { downloadImage } from '$lib/utils/download'
    import { updateAspectRatio } from '$lib/utils/aspect'

    import Gallery from '$lib/views/Gallery.svelte'
    import Preview from '$lib/views/Preview.svelte'
    import Modal from '$lib/components/Modal.svelte'
    import Sidebar from '$lib/components/Sidebar.svelte'
    import Comparison from '$lib/views/Comparison.svelte'
    import Settings from '$lib/components/Settings.svelte'
    import FileUpload from '$lib/components/FileUpload.svelte'

    initView()
    initModal()
    initImage()
    initEffect()

    const view = getView()
    const image = getImage()
    const modal = getModal()
    const effect = getEffect()

    function handleKeys(event: KeyboardEvent) {
        if (!$image.src) return

        const shiftKey = event.shiftKey
        const dKey = event.key == 'D'
        const fKey = event.key == 'F'
        const mKey = event.key == 'M'

        if (!shiftKey || !(dKey || mKey || fKey)) return

        const { full, visible } = $modal
        if (dKey) return downloadImage({ visible: $modal.visible, effect: $effect })

        if (mKey || fKey) {
            const shouldHide = visible && ((mKey && !full) || (fKey && full))
            modal.set({ full: fKey, effect: $effect, visible: !shouldHide })
            fKey && updateAspectRatio($image.aspect)
        }
    }

    onMount(() => {
        window.addEventListener('keydown', handleKeys)

        return () => {
            window.removeEventListener('keydown', handleKeys)
        }
    })
</script>

<div class="mx-auto max-w-[90rem] h-screen">
    {#if $image.src}
        <Modal />
    {/if}

    <div
        class:blur-sm={$modal.visible}
        class:opacity-75={$modal.visible}
        class="relative flex flex-1 w-full overflow-hidden"
    >
        <div class="absolute inset-0 right-auto left-0 bg-gray-800 w-40 md:w-56">
            <Sidebar />
        </div>

        <div class="bg-white relative flex flex-1 ml-[14rem] w-full overflow-y-auto">
            <Settings vertical={$view == 'gallery'} />
            <main class="flex flex-1 bg-white">
                {#if !$image?.src}
                    <FileUpload />
                {:else if $view == 'gallery'}
                    <Gallery />
                {:else if $view == 'preview'}
                    <Preview />
                {:else}
                    <Comparison />
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
