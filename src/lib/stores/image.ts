import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import { getContext, setContext } from 'svelte'

const STORE = 'image'

type Image = { src?: string; name?: string; aspect?: number }

export const INIT_IMAGE: Image = {}

type Context = Writable<Image>

const image = writable<Image>(INIT_IMAGE)

export function initImage() {
    setContext(STORE, image)
}

export function getImage() {
    return getContext<Context>(STORE)
}

export function resetImage() {
    image.set(INIT_IMAGE)
}

export function updateImage(state: Image) {
    image.set(state)
}
