<script lang="ts">
    import { getModal } from '$lib/stores/modal'

    import ImagePreview from './ImagePreview.svelte'
    import ViewActionButtons from './ViewActionButtons.svelte'

    const modal = getModal()

    function handleKey(evt: KeyboardEvent) {
        if (!$modal.visible) return
        if (!['Esc', 'Escape'].includes(evt.key)) return

        modal.set({ effect: 'none', visible: false })
    }

    $: effect = $modal.effect
    $: visible = $modal.visible
</script>

<svelte:body on:keydown|preventDefault={handleKey} />

<div
    id="modal"
    role="alertdialog"
    aria-modal="true"
    class="fixed w-full h-full {visible
        ? 'block overflow-y-hidden'
        : 'hidden overflow-y-hidden'} z-20 inset-0 bg-gray-900 bg-opacity-80 flex w-full content-center place-content-center"
>
    <div
        class="absolute top-1/2 -translate-y-1/2 z-50 w-11/12 max-w-screen-xl xl:max-w-screen-2xl bg-transparent h-full"
    >
        <div class="relative top-1/2 -translate-y-1/2 flex w-full xl:w-full">
            <div class="absolute -top-12 -right-0 flex z-20">
                <ViewActionButtons {effect} />
            </div>

            <ImagePreview id="modal-{effect}" {effect} />
        </div>
    </div>
</div>
