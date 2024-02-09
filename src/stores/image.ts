import { writable } from 'svelte/store'

const INIT_STATE: { name?: string; src?: string } = {}
export const imageURL = writable(INIT_STATE)
