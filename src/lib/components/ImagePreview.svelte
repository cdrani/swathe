<script lang="ts">
    export let src: string = ''
    export let effect: string = ''
    export let dynamic: boolean = false
</script>

<div
    style="--src: url({src});"
    class="flex w-full aspect-square image {dynamic ? effect : ''}"
></div>
