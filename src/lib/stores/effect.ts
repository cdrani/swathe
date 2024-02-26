import { effectsList } from '$lib/effects'

import { writable, type Writable } from 'svelte/store'
import { getContext, setContext } from 'svelte'

export type Effect = (typeof effectsList)[number]
type Context = Writable<Effect>

const STORE = 'effect'
const INIT_EFFECT: Effect = 'none'

const effect = writable<Effect>(INIT_EFFECT)

export function initEffect() {
    setContext(STORE, effect)
}

export function getEffect() {
    return getContext<Context>(STORE)
}

export function updateEffect(state) {
    effect.set(state)
}
