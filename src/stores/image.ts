import { writable } from 'svelte/store'

const INIT_STATE: { name?: string; src?: string } = {}
export const imageData = writable(INIT_STATE)
