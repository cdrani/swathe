<script lang="ts">
    import '../app.css'

    import { selection } from '../stores/effect'
    import Sidebar from '$lib/components/Sidebar.svelte'
</script>

<div class="flex w-full h-full !overscroll-none">
    <Sidebar />

    <div class="flex-col place-content-center w-full h-full columns-2">
        <div class="flex columns-1 place-content-center">
            <h1
                class="text-3xl p-6 lowercase underline underline-offset-4 decoration-2 decoration-solid"
            >
                Original
            </h1>
        </div>
        <div class="flex columns-1 place-content-center">
            <h1
                class="text-3xl p-6 lowercase underline underline-offset-4 decoration-2 decoration-solid"
            >
                {$selection}
            </h1>
        </div>
    </div>
</div>
