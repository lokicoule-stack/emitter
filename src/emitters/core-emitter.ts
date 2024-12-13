import { createStore } from '../store'
import type { CoreEmitter } from '../types/emitters'
import type { EventType } from '../types/events'
import type { Store } from '../types/store'
import type { WildcardPattern } from '../types/wildcard'

const isWildcardPattern = (event: EventType): event is WildcardPattern =>
  event === '*' || (event.endsWith(':*') && !event.slice(0, -2).includes(':'))

const matchesWildcard = (pattern: WildcardPattern, event: EventType): boolean =>
  pattern === '*' || (typeof event === 'string' && event.startsWith(pattern.slice(0, -2) + ':'))

export const createCoreEmitter = (store: Store = createStore()): CoreEmitter => {
  const on = (event: EventType, handler: Function): (() => void) => {
    if (!event.includes('*')) {
      const listeners = store.listeners.get(event) || new Set()
      listeners.add(handler)
      store.listeners.set(event, listeners)
    } else if (isWildcardPattern(event)) {
      store.wildcardListeners.add({ pattern: event, handler })
    }

    return () => off(event, handler)
  }

  const once = (event: EventType, handler: Function): void => {
    const wrappedHandler = (payload: unknown) => {
      store.listeners.delete(event)
      handler(payload)
    }

    on(event, wrappedHandler)
  }

  const off = (event: EventType, handler?: Function): void => {
    if (!event.includes('*')) {
      if (!handler) {
        store.listeners.delete(event)
        return
      }

      const listeners = store.listeners.get(event)
      if (listeners?.delete(handler) && listeners.size === 0) {
        store.listeners.delete(event)
      }
      return
    }

    if (isWildcardPattern(event)) {
      for (const entry of store.wildcardListeners) {
        if (entry.pattern === event && (!handler || entry.handler === handler)) {
          store.wildcardListeners.delete(entry)
          if (handler) break
        }
      }
    }
  }

  const emit = (event: EventType, payload?: unknown): void => {
    store.listeners.get(event)?.forEach((handler) => handler(payload))

    if (store.wildcardListeners.size > 0) {
      for (const entry of store.wildcardListeners) {
        if (matchesWildcard(entry.pattern, event)) {
          entry.handler(event, payload)
        }
      }
    }
  }

  return { on, once, off, emit }
}
