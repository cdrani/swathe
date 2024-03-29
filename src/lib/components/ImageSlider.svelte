<script lang="ts">
    import { onMount } from 'svelte'
    import { getImage } from '$lib/stores/image'
    import type { Effect } from '$lib/stores/effect'

    const image = getImage()

    export let effect: Effect
    export let inModal: boolean = false

    let position = 50
    let slideBtn: HTMLDivElement
    let slideLine: HTMLHRElement
    let container: HTMLButtonElement

    function handleChange(e: Event) {
        const target = e.target as HTMLInputElement
        const value = parseInt(target.value, 10)
        container.style.setProperty('--position', `${value}%`)
    }

    function handleFocusIn() {
        slideLine.classList.replace('hidden', 'block')
        slideBtn.classList.replace('hidden', 'grid')
    }

    function handleFocusOut() {
        slideLine.classList.replace('block', 'hidden')
        slideBtn.classList.replace('grid', 'hidden')
    }

    let timeoutId: number

    function updatePosition(isLeftArrow: boolean) {
        let newPosition

        if (isLeftArrow) {
            newPosition = position == 0 ? 0 : --position
        } else {
            newPosition = position == 100 ? 100 : ++position
        }

        container.style.setProperty('--position', `${newPosition}%`)
    }

    function handleSlider(event: KeyboardEvent) {
        const isShiftKey = event.shiftKey
        const isLeftArrow: boolean = event.key == 'ArrowLeft'
        const isRightArrow: boolean = event.key == 'ArrowRight'

        if (!isShiftKey || !(isLeftArrow || isRightArrow)) return

        handleFocusIn()
        timeoutId && clearTimeout(timeoutId)

        updatePosition(isLeftArrow)
        timeoutId = setTimeout(handleFocusOut, 2000)
    }

    const { src, aspect } = $image

    onMount(() => {
        handleFocusIn()
        window.addEventListener('keydown', handleSlider)

        return () => {
            window.removeEventListener('keydown', handleSlider)
        }
    })
</script>

<div class="flex w-full gap-4 lg:gap-6 xl:gap-8">
    <button
        bind:this={container}
        on:focus={handleFocusIn}
        on:click={handleFocusIn}
        on:focusin={handleFocusIn}
        on:focusout={handleFocusOut}
        on:mouseover={handleFocusIn}
        on:mouseleave={handleFocusOut}
        id="effect-{inModal ? 'modal-' : ''}{effect}"
        style="--position: 50%; aspect-ratio: {aspect}"
        class="grid mx-auto place-items-center relative w-full h-full overflow-hidden"
    >
        <div class="relative w-full h-full overflow-hidden">
            <div
                style="--src: url({src})"
                class="absolute image w-full max-w-full h-full left-0 {effect}"
            >
                <img
                    {src}
                    alt="post effect"
                    class="hidden max-w-full object-cover object-left w-full h-full"
                />
            </div>

            <div
                style="width: var(--position)"
                class="absolute inset-0 w-full bg-cover object-cover overflow-hidden"
            >
                <img
                    {src}
                    alt="post effect"
                    class="block object-cover image max-w-full h-full object-left"
                />
            </div>
        </div>

        <input
            min="0"
            max="100"
            type="range"
            bind:value={position}
            on:input={handleChange}
            aria-label="% of original image shown"
            class="absolute inset-0 z-20 cursor-pointer opacity-0"
        />

        <hr
            aria-hidden="true"
            bind:this={slideLine}
            style="left: var(--position)"
            class="hidden absolute inset-0 w-0.5 lg:w-1 h-full text-white bg-white translate-x-[-50%] pointer-events-none"
        />

        <div
            aria-hidden="true"
            bind:this={slideBtn}
            style="left: var(--position)"
            class="hidden absolute z-10 bg-white text-black p-2 place-items-center top-1/2 translate-x-[-50%] translate-y-[-50%] pointer-events-none shadow-gray-50 shadow-sm lg:shadow-md rounded-full"
        >
            <svg
                fill="currentColor"
                viewBox="0 0 256 256"
                class="w-4 h-4 lg:w-7 lg:h-7"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect width="256" height="256" fill="none"></rect>
                <line
                    x1="128"
                    y1="40"
                    x2="128"
                    y2="216"
                    fill="none"
                    stroke-width="16"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></line>
                <line
                    x1="96"
                    y1="128"
                    x2="16"
                    y2="128"
                    fill="none"
                    stroke-width="16"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></line>
                <polyline
                    fill="none"
                    stroke-width="16"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    points="48 160 16 128 48 96"
                ></polyline>
                <line
                    x1="160"
                    y1="128"
                    x2="240"
                    y2="128"
                    fill="none"
                    stroke-width="16"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></line>
                <polyline
                    fill="none"
                    stroke-width="16"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    points="208 96 240 128 208 160"
                ></polyline>
            </svg>
        </div>
    </button>
</div>
