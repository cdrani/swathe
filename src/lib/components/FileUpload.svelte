<script lang="ts">
    import { onMount } from 'svelte'
    import { getImage } from '$lib/stores/image'
    import { listen } from '@tauri-apps/api/event'
    import { invoke, convertFileSrc } from '@tauri-apps/api/tauri'

    const image = getImage()

    async function handleFile() {
        await optimizeImage()
    }

    async function optimizeImage(filePath?: string) {
        const [tempFilePath, aspect] = await invoke('process_image', { file_path: filePath })
        if (!tempFilePath) return

        setImageData({ filePath: tempFilePath, aspect })
    }

    function setImageData({ filePath, aspect }: { filePath: string; aspect: number }) {
        const src = decodeURIComponent(convertFileSrc(filePath as string))

        // TODO: use actual filename!!
        image.set({ src, name: 'screenshot', aspect: Number(aspect.toPrecision(3)) })
    }

    onMount(async () => {
        const unlisten = await listen('tauri://file-drop', async (event) => {
            const payload = event?.payload as string[]
            console.log({ payload })
            if (!payload?.length) return

            const filePath = payload.at(0)
            if (!filePath) return

            await optimizeImage(filePath)
        })

        return () => {
            unlisten()
        }
    })
</script>

<div
    class="relative bg-white overflow-auto grid grid-cols-6 grid-rows-5 mx-auto w-full h-screen place-content-center"
>
    <section
        aria-label="upload"
        class="absolute aspect-video top-1/3 -translate-y-1/3 col-start-2 col-span-4 row-start-2 row-span-3 lg:row-span-4 w-full place-content-center transition bg-white border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 focus:outline-none"
    >
        <label class="flex w-full h-full p-4 items-center place-content-center cursor-pointer">
            <span class="flex items-center space-x-2">
                <svg
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-6 h-6 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                </svg>
                <span class="text-lg md:text-xl lg:text-2xl text-center font-medium text-gray-600">
                    Drop file to Upload, or
                    <span class="text-blue-600 underline">browse files</span>
                </span>
            </span>

            <button on:click={handleFile} name="file_upload" />
        </label>
    </section>
</div>
