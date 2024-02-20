<script lang="ts">
    import { getModal } from '$lib/stores/modal'
    import { downloadImage } from '$lib/utils/download'
    import type { Effect } from '$lib/stores/effect'

    const modal = getModal()

    export let effect: Effect
    export let small: boolean = false

    const wh = small ? 6 : 9

    async function downloadImageEffect() {
        await downloadImage({ visible: $modal.visible, effect })
    }

    function openModal() {
        modal.set({ effect, visible: true })
    }

    function closeModal() {
        modal.set({ effect: 'none', visible: false })
    }

    $: visible = $modal.visible
</script>

<div class="relative inline-flex items-center content-end justify-end w-full h-10 mb-1">
    <div class="flex justify-end w-24 h-{wh} content-evenly">
        <button
            type="button"
            on:click={downloadImageEffect}
            class="inline-flex bg-gray-900 p-1 rounded items-center justify-center mr-2"
        >
            <svg
                viewBox="0 0 16 16"
                class="fill-white"
                class:big={!small}
                class:small
                xmlns="http://www.w3.org/2000/svg"
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
            class="inline-flex bg-gray-900 p-1 rounded justify-center items-center"
            class:hidden={!small && visible}
        >
            <svg
                viewBox="-30 0 512 512"
                class:big={!small && !visible}
                class:small
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="m0 180v-124c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-84v84c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm288-136v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-124c0-13.3-10.7-24-24-24h-124c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24v-124c0-6.6-5.4-12-12-12zm-276 148v-40c0-6.6-5.4-12-12-12h-84v-84c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z"
                />
            </svg>
        </button>

        <button
            type="button"
            on:click={closeModal}
            class="flex bg-gray-900 rounded p-1 justify-center items-center"
            class:hidden={small || !visible}
        >
            <svg
                viewBox="-30 0 512 512"
                class="fill-white min-w-6 lg:min-w-8 aspect-square scale-75"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="m436 192h-124c-13.3 0-24-10.7-24-24v-124c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v84h84c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-276-24v-124c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24zm0 300v-124c0-13.3-10.7-24-24-24h-124c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-84h84c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-124c-13.3 0-24 10.7-24 24v124c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z"
                />
            </svg>
        </button>
    </div>
</div>
