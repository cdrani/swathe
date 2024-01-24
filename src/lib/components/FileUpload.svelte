<script lang="ts">
    function handleDrop(event: DragEvent) {
        if (!event?.dataTransfer) return

        const image = event.dataTransfer.files[0]
        if (!image) return

        readFile(image)
    }

    function handleFile(e: Event) {
        const input = e.target as HTMLInputElement
        const image = input?.files?.[0]

        if (!image) return

        readFile(image)
    }

    function readFile(image: File) {
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = (e) => {
            const dataURL = e?.target?.result
            console.log({ dataURL })
        }
    }
</script>

<section
    aria-label="upload"
    on:dragover|preventDefault
    on:drop|preventDefault={handleDrop}
    class="relative flex items-center place-content-center justify-self-center transition bg-white border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 focus:outline-none"
>
    <label class="flex justify-center w-96 h-48 px-4 cursor-pointer">
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
            <span class="font-medium text-gray-600">
                Drop files to Attach, or
                <span class="text-blue-600 underline">browse</span>
            </span>
        </span>

        <input on:change={handleFile} type="file" name="file_upload" class="hidden" />
    </label>
</section>