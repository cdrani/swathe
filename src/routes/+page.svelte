<script lang="ts">
    import '../app.css'

    import { selection } from '../stores/effect'
    import Sidebar from '$lib/components/Sidebar.svelte'
    import FileUpload from '$lib/components/FileUpload.svelte'
</script>

<div class="absolute flex w-full h-full !overscroll-none">
    <Sidebar />

    <div class="relative flex-row md:flex-col w-full h-full justify-center items-center">
        <div class="flex-row lg:flex-col place-content-center items-center w-full lg:columns-2">
            <div class="flex-col columns-1 h-full place-content-center m-4 md:m-8 lg:m-12">
                <h1
                    class="text-3xl p-6 text-center lowercase underline underline-offset-4 decoration-2 decoration-solid"
                >
                    Original
                </h1>

                <FileUpload />
            </div>
            <div class="flex-col columns-1 h-full place-content-center">
                <h1
                    class="text-3xl p-6 text-center lowercase underline underline-offset-4 decoration-2 decoration-solid"
                >
                    {$selection}
                </h1>
            </div>
        </div>
    </div>
</div>
