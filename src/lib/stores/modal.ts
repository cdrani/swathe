import { writable } from 'svelte/store'
import type { Effect } from './effect'
import type { Writable } from 'svelte/store'
import { getContext, setContext } from 'svelte'

const STORE = 'modal'

type Modal = { effect: Effect; visible: boolean; full: boolean }
type Context = Writable<Modal>

export const INIT_MODAL: Modal = { effect: 'none', visible: false, full: false }

const modal = writable(INIT_MODAL)

export function initModal() {
    setContext(STORE, modal)
}

export function getModal() {
    return getContext<Context>(STORE)
}

export function openModal(full: boolean) {
    modal.update((prevState: Modal) => ({ ...prevState, visible: true, full }))
}

export function closeModal() {
    modal.update((prevState: Modal) => ({ ...prevState, effect: 'none', visible: false }))
}

export function updateModal(state: Modal) {
    modal.update((prevState: Modal) => ({ ...prevState, ...state }))
}
