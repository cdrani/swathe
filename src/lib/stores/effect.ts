import { effectsList } from '$lib/effects'

import { writable, type Writable } from 'svelte/store'
import { getContext, setContext } from 'svelte'

export type Effect = (typeof effectsList)[number]
type Context = Writable<Effect>

const STORE = 'effect'
const INIT_EFFECT: Effect = 'none'

export function initEffect() {
    const effect = writable<Effect>(INIT_EFFECT)
    setContext(STORE, effect)
}

export function getEffect() {
    return getContext<Context>(STORE)
}
