import { writable } from 'svelte/store'

type View = 'gallery' | 'preview'
export const view = writable<View>('preview')
