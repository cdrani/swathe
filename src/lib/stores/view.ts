import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import { getContext, setContext } from 'svelte'

const STORE = 'view'
export type View = 'gallery' | 'comparison' | 'preview'

const INIT_STATE: View = 'preview'

type Context = Writable<View>

const view = writable<View>(INIT_STATE)

export function initView() {
    setContext(STORE, view)
}

export function getView() {
    return getContext<Context>(STORE)
}

export function updateView(state: View) {
    view.set(state)
}
