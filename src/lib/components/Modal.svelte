<script lang="ts">
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
</script>

<svelte:body on:keydown|preventDefault={handleKey} />

<div
    id="modal"
    role="alertdialog"
    aria-modal="true"
    class="fixed w-full h-full {$modal.visible
        ? 'block overflow-y-hidden'
        : 'hidden overflow-y-auto'} z-20 inset-0 bg-gray-900 bg-opacity-75 w-full content-center place-content-center"
>
    <div
        class="relative top-1/2 -translate-y-1/2 z-50 w-4/5 mx-auto content-center place-content-center bg-white h-fit shadow-xl rounded-lg"
    >
        <div
            class="flex w-full h-full content-center place-content-center mx-auto relative p-10 border rounded-lg"
        >
            <div class="absolute -left-2 top-2 flex w-full justify-end">
                <button type="button" on:click={closeModal} class="inline-flex items-center">
                    <svg
                        class="fill-gray-400 w-6 h-6 md:w-7 md:h-7"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path
                            d="m436 192h-124c-13.3 0-24-10.7-24-24v-124c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v84h84c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-276-24v-124c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24zm0 300v-124c0-13.3-10.7-24-24-24h-124c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-84h84c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-124c-13.3 0-24 10.7-24 24v124c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z"
                        />
                    </svg>
                </button>
            </div>

            <div
                style="--src: url({src})"
                class="image {$modal.effect} rounded-lg max-w-screen-2xl"
            ></div>
        </div>
    </div>
</div>
