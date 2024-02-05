<script lang="ts">
    export let id: string = ''
    export let src: string = ''
    export let effect: string = ''
</script>

<div id={`effect-${id || effect}`} style="--src: url({src})" class="image {effect}"></div>
