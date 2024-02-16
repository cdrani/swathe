<script lang="ts">
    import { getImage } from '$lib/stores/image'

    export let id: string = ''
    export let effect: string = ''

    const image = getImage()
    const { src, aspect } = $image
</script>

<div
    class="image {effect}"
    id={`effect-${id || effect}`}
    style="--src: url({src}); --aspect: {aspect}"
></div>
