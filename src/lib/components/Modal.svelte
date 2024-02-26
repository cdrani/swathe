<script lang="ts">
    import { onMount } from 'svelte'
    import { getView } from '$lib/stores/view'
    import { getModal, updateModal } from '$lib/stores/modal'
    import { getImage } from '$lib/stores/image'
    import { updateAspectRatio } from '$lib/utils/aspect'

    import ImageSlider from './ImageSlider.svelte'
    import ImagePreview from './ImagePreview.svelte'
    import ViewActionButtons from './ViewActionButtons.svelte'

    const view = getView()
    const modal = getModal()
    const image = getImage()

    function handleKey(evt: KeyboardEvent) {
        if (!$modal.visible) return
        if (!['Esc', 'Escape'].includes(evt.key)) return

        updateModal({ effect: 'none', visible: false })
    }

    $: effect = $modal.effect
    $: visible = $modal.visible

    function shouldUpdateModalSize() {
        updateAspectRatio($image.aspect)
    }

    onMount(() => {
        $modal.full && updateAspectRatio($image.aspect)

        window.addEventListener('resize', shouldUpdateModalSize)

        return () => {
            window.removeEventListener('resize', shouldUpdateModalSize)
        }
    })
    $: full = $modal.full
</script>

<svelte:body on:keydown|preventDefault={handleKey} />

<div
    id="modal"
    role="alertdialog"
    aria-modal="true"
    class="fixed w-full h-full {visible
        ? 'block overflow-y-hidden'
        : 'hidden overflow-y-hidden'} top-1/2 -translate-y-1/2 z-[100] inset-0 flex w-full h-full mx-auto items-center content-center place-content-center"
>
    <div
        id="modal-content"
        class="absolute z-50 w-full mx-auto bg-transparent"
        class:modal-fit={!full}
    >
        {#if full}
            <div id="actions" class="absolute top-4 right-4 flex z-[101]">
                <ViewActionButtons {effect} />
            </div>
        {/if}

        <div class="relative flex w-full h-full">
            {#if !full}
                <div id="actions" class="absolute top-4 right-4 flex z-[101]">
                    <ViewActionButtons {effect} />
                </div>
            {/if}

            {#if $view == 'comparison'}
                <ImageSlider {effect} inModal />
            {:else}
                <ImagePreview id="modal-{effect}" {effect} />
            {/if}
        </div>
    </div>
</div>
