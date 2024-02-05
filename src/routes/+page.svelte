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
</script>

<div class="absolute flex content-center w-full mx-auto max-h-screen place-content-center">
    <div class="relative flex w-full h-screen max-w-screen-2xl">
        <Sidebar />

            {#if !$imageURL}
                <FileUpload />
            {:else}
                <Modal src={$imageURL} />
                {#if $view == 'gallery'}
                    <Gallery src={$imageURL} />
                {:else}
                    <Preview src={$imageURL} effect={$selection} />
                {/if}
            {/if}
    </div>
</div>

<style lang="postcss">
    :global(body) {
        @apply overflow-hidden bg-gray-800;
    }
</style>
