import { writable } from 'svelte/store'

export const imageURL = writable<string | null>(null)
