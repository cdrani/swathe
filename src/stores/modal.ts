import { writable } from 'svelte/store'

const INIT_STATE = { effect: 'none', visible: false }
export const modal = writable(INIT_STATE)
