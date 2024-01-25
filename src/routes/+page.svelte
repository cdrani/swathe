<script lang="ts">
    import '../app.css'

    import { imageURL } from '../stores/image'
    import { selection } from '../stores/effect'
    import Sidebar from '$lib/components/Sidebar.svelte'
    import FileUpload from '$lib/components/FileUpload.svelte'
    import ImagePreview from '$lib/components/ImagePreview.svelte'
</script>

<div class="absolute flex w-full h-full !overscroll-none">
    <Sidebar />

    <div class="relative flex-row md:flex-col w-full h-full justify-center items-center">
        <div class="flex-row lg:flex-col place-content-center items-center w-full xl:columns-2">
            <div class="flex-col w-full justify-between columns-1 h-full">
                <h1
                    class="text-3xl m-6 text-center lowercase underline underline-offset-4 decoration-2 decoration-solid"
                >
                    Original
                </h1>

                {#if $imageURL}
                    <ImagePreview src={$imageURL} />
                {:else}
                    <FileUpload />
                {/if}
            </div>

            <div class="flex-col m-6 columns-1 w-full h-full place-content-center">
                <h1
                    class="text-3xl text-center lowercase underline underline-offset-4 decoration-2 decoration-solid"
                >
                    {$selection}
                </h1>
            </div>
        </div>
    </div>
</div>
