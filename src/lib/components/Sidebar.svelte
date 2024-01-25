<script lang="ts">
    import { onMount } from 'svelte'
    import { effectsList } from '$lib/effects'
    import { selection } from '../../stores/effect'

    function handleEffect(e: MouseEvent) {
        const button = e.target as HTMLButtonElement
        const effect = button.getAttribute('aria-label') ?? 'none'
        selection.set(effect)
    }

    onMount(() => {
        const currentEffect = $selection

        const selectedElement = document.getElementById(currentEffect)
        selectedElement?.scrollIntoView()
    })
</script>

<aside
    class="relative flex-col h-screen space-between place-content-center items-center min-w-56 w-1/5 xl:w-4 bg-gray-800 text-gray-400 overflow-hidden overscroll-contain"
>
    <div
        class="absolute top-0 flex-col w-full place-content-center items-center pt-3 mb-2 bottom-2"
    >
        <h2 class="text-2xl text-center lowercase tracking-[16px]">Swathe</h2>
        <hr class="w-full" />
    </div>

    <section class="absolute left-0 top-12 bottom-0 bg-gray-800 w-full py-5">
        <ul
            class="flex flex-col items-center w-full h-full scroll-smooth overflow-auto overscroll-contain"
        >
            {#each effectsList as effect (effect)}
                <li
                    id={effect}
                    class="mb-2 py-1 w-[85%] text-lg hover:rounded-md hover:font-bold hover:text-black hover:bg-white"
                    class:selection={$selection == effect}
                >
                    <button class="w-full h-full" aria-label={effect} on:click={handleEffect}>
                        {effect}
                    </button>
                </li>
            {/each}
        </ul>
    </section>
</aside>
