import { writable } from 'svelte/store'

export type View = 'gallery' | 'comparison' | 'preview'
export const view = writable<View>('comparison')
