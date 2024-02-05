<script lang="ts">
    import { invoke } from '@tauri-apps/api/tauri'
    import { join, downloadDir } from '@tauri-apps/api/path'

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

    function parseNum(num: number) {
        return parseInt(`${num}`, 10)
    }

    function getCoords() {
        const bgImage = document.getElementById('effect')
        if (!bgImage) return

        const offsets = bgImage?.getBoundingClientRect()
        if (!offsets) return

        const { left, top, width, height } = offsets
        return {
            width: parseNum(width),
            height: parseNum(height),
            left: parseNum(left),
            top: parseNum(top)
        }
    }

    function toggleButtonsView() {
        const buttons = document.getElementById('buttons')
        buttons?.classList?.toggle('hidden')
    }

    async function downloadImage() {
        toggleButtonsView()
        const dimensions = getCoords()
        if (!dimensions) return

        const folder = await downloadDir()
        const file_path = await join(folder, 'screenshot.png')

        setTimeout(async () => {
            await invoke('flickr', { file_path, dims: dimensions })
            toggleButtonsView()
        }, 500)
    }
</script>

<svelte:body on:keydown|preventDefault={handleKey} />

<div
    id="modal"
    role="alertdialog"
    aria-modal="true"
    class="fixed w-full h-full {$modal.visible
        ? 'block overflow-y-hidden'
        : 'hidden overflow-y-auto'} z-20 inset-0 bg-gray-900 bg-opacity-80 flex w-full content-center place-content-center"
>
    <div
        class="absolute top-1/2 -translate-y-1/2 z-50 w-11/12 max-w-screen-xl bg-transparent h-full shadow-xl"
    >
        <div class="relative top-1/2 -translate-y-1/2 flex w-full">
            <div id="buttons" class="absolute -right-0 flex z-20 m-2">
                <button
                    type="button"
                    on:click={downloadImage}
                    class="inline-flex items-center mr-4"
                >
                    <svg
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        class="fill-gray-400 w-5 h-5 md:w-6 md:h-6"
                    >
                        <path d="m0 0h16v16h-16z" fill="none" />
                        <path
                            d="m12.706 8.294-1.416-1.416-2.29 2.294v-9.172h-2v9.172l-2.294-2.294-1.415 1.416 4.709 4.706zm3.294 5.706h-16v2h16z"
                        />
                    </svg>
                </button>

                <button type="button" on:click={closeModal} class="inline-flex items-center">
                    <svg
                        viewBox="0 0 448 512"
                        xmlns="http://www.w3.org/2000/svg"
                        class="fill-gray-400 w-6 h-6 md:w-7 md:h-7"
                    >
                        <path
                            d="m436 192h-124c-13.3 0-24-10.7-24-24v-124c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v84h84c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-276-24v-124c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24zm0 300v-124c0-13.3-10.7-24-24-24h-124c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-84h84c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-124c-13.3 0-24 10.7-24 24v124c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z"
                        />
                    </svg>
                </button>
            </div>

            <div id="effect" style="--src: url({src})" class="image {$modal.effect}"></div>
        </div>
    </div>
</div>
