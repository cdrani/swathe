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

    function openModal(full: boolean) {
        modal.set({ effect, visible: true, full })
    }

    function closeModal() {
        modal.update((prevState) => ({ ...prevState, effect: 'none', visible: false }))
    }

    $: visible = $modal.visible
    $: full = $modal.full
</script>

<div class="relative inline-flex items-center content-end justify-end w-full h-10 mb-1">
    <div class="flex justify-end w-fit h-{wh} content-evenly">
        <button
            aria-label="download"
            on:click={downloadImageEffect}
            class="inline-flex bg-gray-900 h-fit w-fit border-solid border-2 border-white p-1 rounded items-center justify-center"
        >
            <svg
                class:small
                viewBox="0 0 16 16"
                class="fill-white"
                class:big={!small}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="m0 0h16v16h-16z" fill="none" />
                <path
                    d="m12.706 8.294-1.416-1.416-2.29 2.294v-9.172h-2v9.172l-2.294-2.294-1.415 1.416 4.709 4.706zm3.294 5.706h-16v2h16z"
                />
            </svg>
        </button>

        <button
            aria-label="medium screen"
            on:click|stopPropagation={() => openModal(false)}
            class="inline-flex bg-gray-900 h-fit w-fit border-solid border-2 border-white p-1 rounded justify-center items-center ml-2"
            class:hidden={!small && visible}
        >
            <svg
                class:small
                class:big={!small && !visible}
                viewBox="-30 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="m0 180v-124c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-84v84c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm288-136v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-124c0-13.3-10.7-24-24-24h-124c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24v-124c0-6.6-5.4-12-12-12zm-276 148v-40c0-6.6-5.4-12-12-12h-84v-84c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z"
                />
            </svg>
        </button>

        <!-- open full-screen -->
        <button
            aria-label="open fullscreen"
            on:click|stopPropagation={() => openModal(true)}
            class="inline-flex bg-gray-900 h-fit w-fit border-solid border-2 border-white rounded p-1 justify-center items-center ml-2"
            class:hidden={visible && full}
        >
            <svg
                class:small
                class:big={!small}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                class="fill-white"
            >
                <path
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m9 15-6 6m0 0v-5m0 5h5m7-12 6-6m0 0v5m0-5h-5"
                />
            </svg>
        </button>

        <!-- exit full-screen -->
        <button
            aria-label="exit fullscreen"
            on:click|stopPropagation={() => openModal(false)}
            class="inline-flex bg-gray-900 h-fit w-fit border-solid border-2 border-white rounded p-1 justify-center items-center ml-2"
            class:hidden={!visible || !full}
        >
            <svg
                class:small
                class:big={!small}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                class="fill-white"
            >
                <path
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 3l-6 6m0 0V4m0 5h5M3 21l6-6m0 0v5m0-5H4"
                />
            </svg>
        </button>

        <button
            on:click={closeModal}
            aria-label="close modal"
            class="flex bg-gray-900 border-solid h-fit w-fit border-2 border-white rounded p-1 justify-center items-center ml-2"
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
