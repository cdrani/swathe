<script lang="ts">
    import ViewActionButtons from './ViewActionButtons.svelte'
    import { modal } from '../../stores/modal'

    export let src: string = ''

    function closeModal() {
        modal.update(() => ({ effect: 'none', visible: false }))
    }

    function handleKey(evt: KeyboardEvent) {
        if (!$modal.visible) return
        if (!['Esc', 'Escape'].includes(evt.key)) return
        closeModal()
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
        : 'hidden overflow-y-auto'} z-20 inset-0 bg-gray-900 bg-opacity-80 flex w-full content-center place-content-center"
>
    <div
        class="absolute top-1/2 -translate-y-1/2 z-50 w-11/12 xl:w-full max-w-screen-xl px-10 xl:max-w-screen-2xl bg-transparent h-full"
    >
        <div class="relative top-1/2 -translate-y-1/2 flex w-full">
            <div class="absolute -top-14 -right-0 flex z-20">
                <ViewActionButtons {effect} />
            </div>

            <div id="modal-{effect}" style="--src: url({src})" class="image {effect}"></div>
        </div>
    </div>
</div>
