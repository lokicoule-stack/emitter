import type {
  EventHandler,
  EventKey,
  EventMap,
  RegularHandler,
  WildcardHandler,
} from '../types/main'
import type { EmitterStore } from '../types/store'

export const addHandler = <T extends EventMap, K extends EventKey<T>>(
  store: EmitterStore<T>,
  event: K | '*',
  handler: EventHandler<T, K>,
): void => {
  if (event === '*') {
    store.wildcardHandlers.add(handler as WildcardHandler<T>)
    return
  }

  let handlers = store.handlers.get(event)
  if (!handlers) {
    handlers = new Set()
    store.handlers.set(event, handlers)
  }
  handlers.add(handler as RegularHandler<T, keyof T>)
}

export const removeHandler = <T extends EventMap, K extends EventKey<T>>(
  store: EmitterStore<T>,
  event: K | '*',
  handler: EventHandler<T, K>,
): void => {
  if (event === '*') {
    store.wildcardHandlers.delete(handler as WildcardHandler<T>)
    return
  }

  const handlers = store.handlers.get(event)
  if (handlers) {
    handlers.delete(handler as RegularHandler<T, keyof T>)
    if (handlers.size === 0) {
      store.handlers.delete(event)
    }
  }
}
