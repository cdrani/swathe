<script lang="ts">
    import { onMount } from 'svelte'
    import { effectsList } from '$lib/effects'
    import { getEffect, type Effect } from '$lib/stores/effect'

    const effect = getEffect()

    function handleEffect(e: MouseEvent) {
        const button = e.target as HTMLButtonElement
        const chosenEffect = button.getAttribute('aria-label') ?? 'none'
        effect.set(chosenEffect as Effect)
    }

    function scrollToEffect() {
        const currentEffect = $effect
        const selectedElement = document.getElementById(currentEffect)
        selectedElement?.scrollIntoView()
    }

    onMount(scrollToEffect)

    $: selection = $effect
</script>

<aside
    class="fixed flex-col h-dvh space-between place-content-center items-center w-40 md:w-56 bg-gray-800 text-gray-400 overflow-hidden overscroll-contain"
>
    <div class="absolute top-0 flex-col w-full justify-center pt-3 mb-2 bottom-2">
        <h2 class="text-2xl text-center lowercase tracking-[16px]">Swathe</h2>
        <hr class="w-full" />
    </div>

    <section class="absolute top-12 bottom-0 bg-gray-800 w-full pt-3">
        <ul
            class="flex flex-col items-center w-full h-full py-6 scroll-smooth overflow-auto overscroll-contain"
        >
            {#each effectsList as effect (effect)}
                <li
                    id={effect}
                    class="mb-2 py-1 px-2 w-[85%] text-lg hover:rounded-md hover:font-bold hover:text-black hover:bg-white"
                    class:selection={selection == effect}
                >
                    <button class="w-full h-full" aria-label={effect} on:click={handleEffect}>
                        {effect}
                    </button>
                </li>
            {/each}
        </ul>
    </section>
</aside>
