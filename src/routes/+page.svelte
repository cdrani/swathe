<script lang="ts">
    import '../app.css'

    import { onMount } from 'svelte'
    import { downloadImage } from '$lib/utils/download'
    import { initView, getView } from '$lib/stores/view'
    import { initModal, getModal } from '$lib/stores/modal'
    import { initImage, getImage } from '$lib/stores/image'
    import { initEffect, getEffect } from '$lib/stores/effect'

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
        const mKey = event.key == 'M'

        if (!shiftKey || !(dKey || mKey)) return

        if (mKey) return modal.set({ effect: $effect, visible: !$modal.visible })
        if (dKey) downloadImage({ visible: $modal.visible, effect: $effect })
    }

    onMount(() => {
        window.addEventListener('keydown', handleKeys)

        return () => {
            window.removeEventListener('keydown', handleKeys)
        }
    })
</script>

<div class="mx-auto max-w-[90rem] h-screen">
    <div class="relative flex flex-1 w-full overflow-hidden">
        <div class="absolute inset-0 right-auto left-0 bg-gray-800 w-40 md:w-56">
            <Sidebar />
        </div>

        <div class="bg-white relative flex flex-1 ml-[14rem] w-full overflow-y-auto">
            <Settings vertical={$view == 'gallery'} />
            <main class="flex flex-1 bg-white">
                {#if !$image?.src && !$image?.aspect}
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
