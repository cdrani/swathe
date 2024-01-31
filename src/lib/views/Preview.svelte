<script lang="ts">
    import ImagePreview from '$lib/components/ImagePreview.svelte'

    export let src = ''
    export let effect = 'none'
</script>

<div
    class="grid grid-cols-8 place-content-center gap-8 w-full md:p-4 lg:p-6 xl:p-10 overflow-auto m-4 lg:m-6"
>
    <div class="w-full row-span-2 col-span-2">
        <div style="--src: url({src})" class="image"></div>
    </div>
    <div class="w-full col-start-3 col-end-12">
        <ImagePreview {src} {effect} />
    </div>
</div>
