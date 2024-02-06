<script lang="ts">
    import { invoke } from '@tauri-apps/api/tauri'
    import { join, downloadDir } from '@tauri-apps/api/path'
    import { modal } from '../../stores/modal'

    export let effect: string = ''
    export let small: boolean = false

    const wh = small ? 5 : 5 

    function parseNum(num: number) {
        return parseInt(`${num}`, 10)
    }

    function getBGImage() {
        const idPrefix = $modal.visible ? 'modal' : 'effect'
        return document.getElementById(`${idPrefix}-${effect}`)
    }

    function getCoords() {
        const bgImage = getBGImage()
        if (!bgImage) return

        const offsets = bgImage?.getBoundingClientRect()
        if (!offsets) return

        const { left, top, width, height } = offsets

        return {
            top: parseNum(top),
            left: parseNum(left),
            width: parseNum(width),
            height: parseNum(height)
        }
    }

    async function downloadImage() {
        const dimensions = getCoords()
        if (!dimensions) return

        const folder = await downloadDir()
        const file_path = await join(folder, 'screenshot.png')

        setTimeout(async () => {
            await invoke('flickr', { file_path, dims: dimensions })
        }, 500)
    }

    function openModal() {
        modal.set({ effect, visible: true })
    }

    function closeModal() {
        modal.update(() => ({ effect: 'none', visible: false }))
    }

    $: visible = $modal.visible
</script>

<div class="relative flex items-center justify-end w-full h-{wh + 1} mb-1.5">
    <button
        type="button"
        on:click={downloadImage}
        class="inline-flex items-center p-{small ? 1 : 2} bg-gray-800 w-{wh * 2} mr-2"
    >
        <svg
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            class="fill-white w-{wh} h-{wh}"
        >
            <path d="m0 0h16v16h-16z" fill="none" />
            <path
                d="m12.706 8.294-1.416-1.416-2.29 2.294v-9.172h-2v9.172l-2.294-2.294-1.415 1.416 4.709 4.706zm3.294 5.706h-16v2h16z"
            />
        </svg>
    </button>

    <button
        aria-label={effect}
        on:click|stopPropagation={openModal}
        class="inline-flex items-center p-{small ? 1 : 2} bg-gray-800 w-{wh * 2}"
        class:hidden={visible}
    >
        <svg
            viewBox="0 0 448 512"
            xmlns="http://www.w3.org/2000/svg"
            class="fill-white w-{wh} h-{wh}"

        >
            <path
                d="m0 180v-124c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-84v84c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm288-136v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-124c0-13.3-10.7-24-24-24h-124c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24v-124c0-6.6-5.4-12-12-12zm-276 148v-40c0-6.6-5.4-12-12-12h-84v-84c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z"
            />
        </svg>
    </button>

    <button
        type="button"
        on:click={closeModal}
        class="inline-flex items-center p-{small ? 1 : 2} bg-gray-800 w-{wh * 2}"
        class:hidden={!visible}
    >
        <svg
            viewBox="0 0 448 512"
            xmlns="http://www.w3.org/2000/svg"
            class="fill-white w-{wh} h-{wh}"
        >
            <path
                d="m436 192h-124c-13.3 0-24-10.7-24-24v-124c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v84h84c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-276-24v-124c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24zm0 300v-124c0-13.3-10.7-24-24-24h-124c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-84h84c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-124c-13.3 0-24 10.7-24 24v124c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z"
            />
        </svg>
    </button>
</div>
