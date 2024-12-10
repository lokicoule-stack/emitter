import type { EventMap } from '../types/main'
import type { EmitterStore } from '../types/store'

export function createStore<TEvents extends EventMap>(): EmitterStore<TEvents> {
  return {
    handlers: new Map(),
    wildcardHandlers: new Set(),
    onceHandlers: new WeakMap(),
  }
}
