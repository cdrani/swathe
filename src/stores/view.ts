import { writable } from 'svelte/store'

type View = 'gallery' | 'comparison' | 'preview'
export const view = writable<View>('comparison')
