<script lang="ts">
    import {onMount} from 'svelte'

    import ImagePreview from '$lib/components/ImagePreview.svelte'
    import ViewActionButtons from '$lib/components/ViewActionButtons.svelte'

    export let src: string
    export let effect: string

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

    onMount(() => {
        handleFocusIn()
    })

</script>

<div class="flex flex-col bg-white h-screen w-full place-content-start md:mt-20 md:place-content-start p-4 md:p-6 lg:p-8 xl:p-12">
    <ViewActionButtons {effect} />

    <div class="lg:pt-4 grid grid-cols-8 place-content-start w-full gap-4 lg:gap-6 xl:gap-8">
        <div class="w-full col-span-2">
            <ImagePreview id="preview" effect="none" {src} />
        </div>

        <button
            bind:this={container}
            style="--position: 50%"
            on:focus={handleFocusIn}
            on:click={handleFocusIn}
            on:focusin={handleFocusIn}
            on:focusout={handleFocusOut}
            on:mouseover={handleFocusIn}
            on:mouseleave={handleFocusOut}
            class="col-start-3 col-end-12 grid mx-auto place-items-center relative w-full h-full overflow-hidden"
        >
            <div
                class="relative w-full h-full aspect-[1.6] overflow-hidden"
            >
                <div
                    style="--src: url({src});"
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
                    class="absolute inset-0 bg-cover object-cover overflow-hidden"
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
                style="left: {position}%"
                class="hidden absolute inset-0 w-0.5 lg:w-1 h-full text-white bg-white translate-x-[-50%] pointer-events-none"
            />

            <div
                aria-hidden="true"
                bind:this={slideBtn}
                style="left: {position}%"
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
</div>
