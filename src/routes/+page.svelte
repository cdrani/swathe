<script lang="ts">
    import '../app.css'

    import { view } from '../stores/view'
    import { imageURL } from '../stores/image'
    import { selection } from '../stores/effect'

    import Gallery from '$lib/views/Gallery.svelte'
    import Preview from '$lib/views/Preview.svelte'
    import Sidebar from '$lib/components/Sidebar.svelte'
    import FileUpload from '$lib/components/FileUpload.svelte'
</script>

<div class="flex w-full h-dvh">
    <Sidebar />

    {#if !$imageURL}
        <FileUpload />
    {:else}
        <div class="flex w-11/12 h-full overflow-y-auto lg:place-content-center">
            {#if $view == 'gallery'}
                <Gallery src={$imageURL} />
            {:else}
                <Preview src={$imageURL} effect={$selection} />
            {/if}
        </div>
    {/if}
</div>
