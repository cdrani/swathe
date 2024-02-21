import { writable } from 'svelte/store'
import type { Effect } from './effect'
import type { Writable } from 'svelte/store'
import { getContext, setContext } from 'svelte'

const STORE = 'modal'

type Modal = { effect: Effect; visible: boolean; full: boolean }
type Context = Writable<Modal>

export const INIT_MODAL: Modal = { effect: 'none', visible: false, full: false }

export function initModal() {
    const modal = writable(INIT_MODAL)
    setContext(STORE, modal)
}

export function getModal() {
    return getContext<Context>(STORE)
}
