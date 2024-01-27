import { writable } from 'svelte/store'

type View =  'gallery' | 'side-by-side' | 'preview'
export const view = writable<View>('gallery')
