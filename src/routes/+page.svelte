<script lang="ts">
    import '../app.css'

    import { view } from '../stores/view'
    import { imageURL } from '../stores/image'
    import { selection } from '../stores/effect'

    import Gallery from '$lib/views/Gallery.svelte'
    import Preview from '$lib/views/Preview.svelte'
    import Modal from '$lib/components/Modal.svelte'
    import Sidebar from '$lib/components/Sidebar.svelte'
    import FileUpload from '$lib/components/FileUpload.svelte'
    import Settings from '$lib/components/Settings.svelte'

    $: src = $imageURL?.src
</script>

<div class="mx-auto max-w-[90rem] h-screen">
    <div class="relative flex flex-1 w-full overflow-hidden">
        <div class="absolute inset-0 right-auto left-0 bg-gray-800 w-44 md:w-48 p-4">
            <Sidebar />
        </div>

        <div class="min-h-screen bg-white relative flex flex-1 ml-[16rem] w-full overflow-y-auto">
            <Settings vertical={$view == 'gallery'} />
            <main class="flex flex-1 bg-white">
                {#if !src}
                    <FileUpload />
                {:else}
                    <Modal {src} />
                    {#if $view == 'gallery'}
                        <Gallery {src} />
                    {:else}
                        <Preview {src} effect={$selection} />
                    {/if}
                {/if}
            </main>
        </div>
    </div>
</div>

<style lang="postcss">
    :global(body) {
        @apply bg-gray-800;
    }
</style>
