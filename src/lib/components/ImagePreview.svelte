<script lang="ts">
    import { getImage } from '$lib/stores/image'

    export let id: string = ''
    export let effect: string = ''

    const image = getImage()
    const { src, aspect } = $image
</script>

<div id={`effect-${id || effect}`} style="--src: url({src})" class="image {effect} {aspect}"></div>
