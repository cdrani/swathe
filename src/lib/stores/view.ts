import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import { getContext, setContext } from 'svelte'

const STORE = 'view'
export type View = 'gallery' | 'comparison' | 'preview'

const INIT_STATE: View = 'gallery'

type Context = Writable<View>

export function initView() {
    const view = writable<View>(INIT_STATE)
    setContext(STORE, view)
}

export function getView() {
    return getContext<Context>(STORE)
}
