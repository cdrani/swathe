import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import { getContext, setContext } from 'svelte'

const STORE = 'image'

type Image = { src: string; name: string; aspect: string }

export const INIT_IMAGE: Image = { src: '', name: 'screenshot', aspect: '1' }

type Context = Writable<Image>

export function initImage() {
    const image = writable<Image>(INIT_IMAGE)
    setContext(STORE, image)
}

export function getImage() {
    return getContext<Context>(STORE)
}
