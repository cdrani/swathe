<script lang="ts">
import ViewActionButtons from '$lib/components/ViewActionButtons.svelte'

    export let src: string
    export let effect: string

    let container: HTMLDivElement

    function handleChange(e: Event) {
        const target = e.target as HTMLInputElement
        const value = parseInt(target.value, 10)
        container.style.setProperty('--position', `${value}%`)
    }

    let position = 50

</script>

<div class="grid content-center items-center w-full h-screen md:m-6 lg:p-8 xl:p-12">
    <ViewActionButtons {effect} />

    <div
        bind:this={container}
        style="--position: 50%;"
        class="grid mx-auto place-items-center place-items-center relative w-[450] h-[280px] lg:w-[550px] lg:h-[350px] xl:w-[700px] xl:h-[450px] overflow-hidden"
    >
        <div class="relative w-[450px] h-[280px] lg:w-[550px] lg:h-[350px] xl:w-[700px] xl:h-[450px] overflow-hidden">
            <div 
                class="absolute image max-w-full h-full left-0 {effect}"
                style="--src: url({src});">
                <img 
                    {src}
                    alt="post effect"
                    class="hidden max-w-full object-cover object-left w-full h-full"
                />
            </div>

            <div 
                style="width: var(--position)"
                class="absolute inset-0 bg-contain overflow-hidden">
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
            aria-label="% of original image shown"
            class="absolute inset-0 z-20 cursor-pointer opacity-0"
            on:input={handleChange}
        />

        <hr
            aria-hidden="true"
            style="left: {position}%"
            class="absolute inset-0 w-1 h-full text-white bg-white translate-x-[-50%] pointer-events-none"
        />

        <div
            aria-hidden="true"
            style="left: {position}%"
            class="absolute z-10 bg-white text-black p-2 grid place-items-center top-1/2 translate-x-[-50%] translate-y-[-50%] pointer-events-none shadow-gray-50 shadow-md rounded-full"
        >
            <svg
                width="30"
                height="30"
                fill="currentColor"
                viewBox="0 0 256 256"
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
    </div>
</div>
