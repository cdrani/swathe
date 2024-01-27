<script lang="ts">
    import '../app.css'

    import { imageURL } from '../stores/image'
    import { selection } from '../stores/effect'
    import Sidebar from '$lib/components/Sidebar.svelte'
    import FileUpload from '$lib/components/FileUpload.svelte'
    import ImagePreview from '$lib/components/ImagePreview.svelte'
</script>

<div class="absolute flex w-full h-full">
    <Sidebar />

    <div
        class="relative flex-row lg:flex-col w-full h-screen justify-center items-center overflow-auto"
    >
        <div
            class="flex-row md:flex-col place-content-center items-center w-full h-screen columns-1 {$imageURL
                ? 'xl:columns-2'
                : ''}"
        >
            <div class="flex-col w-full p-6 justify-between columns-1 xl:h-full">
                <h1
                    class="text-3xl m-6 text-center lowercase underline underline-offset-4 decoration-2 decoration-solid"
                >
                    Original
                </h1>

                {#if $imageURL}
                    <ImagePreview src={$imageURL} dynamic={false} effect={$selection} />
                {:else}
                    <FileUpload />
                {/if}
            </div>

            {#if $imageURL}
                <div class="flex-col w-full p-6 justify-between columns-1 xl:h-full">
                    <h1
                        class="text-3xl m-6 text-center lowercase underline underline-offset-4 decoration-2 decoration-solid"
                    >
                        {$selection}
                    </h1>

                    <ImagePreview src={$imageURL} dynamic={true} effect={$selection} />
                </div>
            {/if}
        </div>
    </div>
</div>
