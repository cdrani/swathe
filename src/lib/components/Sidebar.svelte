<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { effectsList } from '$lib/effects'

    const dispatch = createEventDispatcher()

    function handleEffect(e: MouseEvent) {
        const button = e.target as HTMLButtonElement
        const effect = button.getAttribute('aria-label') ?? 'none'
        dispatch('message', { effect })
    }
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
                    class="px-1 py-1 text-lg hover:rounded active:rounded hover:font-bold hover:text-black active:text-black hover:bg-white active:bg-white"
                >
                    <button class="w-full h-full" aria-label={effect} on:click={handleEffect}
                        >{effect}</button
                    >
                </li>
            {/each}
        </ul>
    </section>
</aside>
