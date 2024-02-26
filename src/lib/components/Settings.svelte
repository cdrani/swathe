<script lang="ts">
    import { onMount } from 'svelte'

    import { resetImage } from '$lib/stores/image'
    import { updateEffect } from '$lib/stores/effect'
    import { updateView, type View } from '$lib/stores/view'

    export let vertical: boolean = false

    function clearFile() {
        resetImage()
        updateEffect('none')
    }

    function handleKeys(event: KeyboardEvent) {
        const isShift = event.shiftKey
        const isXKey = event.key == 'X'
        const isCKey = event.key == 'C'
        const isPKey = event.key == 'P'
        const isGKey = event.key == 'G'

        if (!isShift || !(isCKey || isPKey || isGKey || isXKey)) return

        if (isXKey) return clearFile()

        const views = { G: 'gallery', C: 'comparison', P: 'preview' }
        updateView(views[event.key] as View)
    }

    $: dir = vertical ? 'col' : 'row'

    onMount(() => {
        window.addEventListener('keydown', handleKeys)

        return () => {
            window.removeEventListener('keydown', handleKeys)
        }
    })
</script>

<div class="absolute left-1 lg:left-3 xl:left-4">
    <div class="fixed top-6 flex flex-{dir}" class:setting-h={!vertical} class:setting-v={vertical}>
        <button on:click|preventDefault={clearFile} class="inline-flex place-content-center">
            <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                class="fill-white w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-gray-800 p-1 rounded-md"
            >
                <path d="m0 0h24v24h-24z" fill="none" />
                <path
                    d="m18.3 5.71c-.39-.39-1.02-.39-1.41 0l-4.89 4.88-4.89-4.89c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l4.89 4.89-4.89 4.89c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0l4.89-4.89 4.89 4.89c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41l-4.89-4.89 4.89-4.89c.38-.38.38-1.02 0-1.4z"
                />
            </svg>
        </button>

        <button on:click={() => updateView('gallery')} class="inline-flex place-content-center">
            <svg
                viewBox="-50 -50 500 500"
                xmlns="http://www.w3.org/2000/svg"
                class="fill-white w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-gray-800 p-1 rounded-md"
            >
                <path
                    d="m0 0v188.57227h188.57227v-188.57227zm211.42773 0v188.57227h188.57227v-188.57227zm-186.42773 25h138.57227v138.57227h-138.57227zm211.42773 0h138.57227v138.57227h-138.57227zm-236.42773 186.42969v188.57031h188.57227v-188.57031zm211.42773 0v188.57031h188.57227v-188.57031zm-186.42773 25h138.57227v138.57031h-138.57227zm211.42773 0h138.57227v138.57031h-138.57227z"
                />
            </svg>
        </button>

        <button on:click={() => updateView('preview')} class="inline-flex place-content-center">
            <svg
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                class="fill-white w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-gray-800 p-1 rounded-md"
            >
                <path
                    fill="white"
                    d="M36,416H476a20.023,20.023,0,0,0,20-20V116a20.023,20.023,0,0,0-20-20H36a20.023,20.023,0,0,0-20,20V396A20.023,20.023,0,0,0,36,416ZM48,128H464V384H48Z"
                />
            </svg>
        </button>

        <button on:click={() => updateView('comparison')} class="inline-flex place-content-center">
            <svg
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                class="fill-white w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-gray-800 p-1 rounded-md"
            >
                <g
                    transform="translate(-2 -2)"
                    style="stroke:#fff;stroke-width:1.5;fill:none;fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round"
                >
                    <path
                        d="m7.02736429 5h-2c-1.1045695 0-2 .8954305-2 2v10c0 1.1045695.8954305 2 2 2h2"
                    />
                    <path
                        d="m17.0273643 5h2c1.1045695 0 2 .8954305 2 2v10c0 1.1045695-.8954305 2-2 2h-2"
                    />
                    <path d="m12 3v18" />
                </g>
            </svg>
        </button>
    </div>
</div>
