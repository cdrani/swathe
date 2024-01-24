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
    class="flex-col space-between w-56 p-5 h-full text-gray-400 overflow-hidden overscroll-contain"
>
    <div class="absolute top-0 left-0 px-7 pt-3 mb-2 bottom-2 bg-gray-800 w-56">
        <h2 class="text-2xl lowercase tracking-[16px]">Swathe</h2>
        <hr class="relative -left-5 w-52" />
    </div>

    <section class="absolute left-0 top-12 bottom-0 bg-gray-800 p-5 w-56 py-5">
        <ul class="flex flex-col h-full scroll-smooth overflow-auto overscroll-contain">
            {#each effectsList as effect (effect)}
                <li
                    id={effect}
                    class="mb-2 px-1 py-1 text-lg hover:rounded-md hover:font-bold hover:text-black hover:bg-white"
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
