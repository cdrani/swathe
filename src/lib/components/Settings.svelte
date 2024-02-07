<script lang="ts">
    import { view } from '../../stores/view'
    import { imageURL } from '../../stores/image'
    import { selection } from '../../stores/effect'

    export let vertical: boolean = false

    function clearFile() {
        imageURL.set('')
        selection.set('none')
    }

    function setView(newView: 'preview' | 'gallery') {
        view.set(newView)
    }

    $: dir = vertical ? 'col' : 'row'
    $: space = vertical ? 'y' : 'x'
</script>

<div
    class="flex absolute clear-right left-2"
    class:setting-h={!vertical}
    class:setting-v={vertical}
>
    <div
        class="fixed top-6 flex flex-{dir} content-center justify-between space-{space}-2 items-center h-fit"
    >
        <button
            on:click|preventDefault={clearFile}
            class="inline-flex rounded-full place-content-center justify-end"
        >
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

        <button
            on:click={() => setView('gallery')}
            class="inline-flex rounded-full place-content-center justify-end"
        >
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

        <button
            on:click={() => setView('preview')}
            class="inline-flex rounded-full place-content-center justify-end"
        >
            <svg
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                class="fill-white w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-gray-800 p-1 rounded-md"
            >
                <path
                    fill="white"
                    d="M36,416H476a20.023,20.023,0,0,0,20-20V116a20.023,20.023,0,0,0-20-20H36a20.023,20.023,0,0,0-20,20V396A20.023,20.023,0,0,0,36,416ZM48,128H464V384H48Z"
                    class="ci-primary"
                />
            </svg>
        </button>
    </div>
</div>
