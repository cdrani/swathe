<script lang="ts">
    import '../app.css'
    import Sidebar from '$lib/components/Sidebar.svelte'

    let selectedEffect = 'none'
    function handleEffectMessage(event: CustomEvent) {
        selectedEffect = event.detail.effect
    }
</script>

<div class="flex w-full h-full !overscroll-none">
    <Sidebar on:message={handleEffectMessage} />

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
                {selectedEffect}
            </h1>
        </div>
    </div>
</div>
