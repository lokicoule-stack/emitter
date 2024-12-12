import { createStore } from '../store'
import type { UnsafeEventEmitter } from '../types/emitters'
import type { EventType, WildcardPattern } from '../types/events'
import type { Store } from '../types/store'

const isWildcardPattern = (event: EventType): event is WildcardPattern =>
  typeof event === 'string' && (event === '*' || event.endsWith(':*'))

const matchesWildcard = (pattern: WildcardPattern, event: EventType): boolean => {
  if (pattern === '*') return true
  if (typeof event !== 'string') return false

  const namespace = pattern.slice(0, -1)
  return event.startsWith(namespace)
}

export const createUnsafeEmitter = (store: Store = createStore()): UnsafeEventEmitter => {
  const on = (event: EventType, handler: Function): (() => void) => {
    if (isWildcardPattern(event)) {
      const wildcardEntry = { pattern: event, handler }
      store.wildcardListeners.add(wildcardEntry)
    } else {
      const listeners = store.listeners.get(event) || new Set()
      listeners.add(handler)
      store.listeners.set(event, listeners)
    }
    return () => off(event, handler)
  }

  const once = (event: EventType, handler: Function): void => {
    const wrappedHandler = (payload: unknown) => {
      handler(payload)
      off(event, wrappedHandler)
    }
    on(event, wrappedHandler)
  }

  const off = (event: EventType, handler?: Function): void => {
    if (isWildcardPattern(event)) {
      if (handler) {
        store.wildcardListeners.forEach((entry) => {
          if (entry.pattern === event && entry.handler === handler) {
            store.wildcardListeners.delete(entry)
          }
        })
      } else {
        store.wildcardListeners.forEach((entry) => {
          if (entry.pattern === event) {
            store.wildcardListeners.delete(entry)
          }
        })
      }
      return
    }

    if (!handler) {
      store.listeners.delete(event)
      return
    }

    const listeners = store.listeners.get(event)
    if (!listeners) return

    listeners.delete(handler)

    if (listeners.size === 0) {
      store.listeners.delete(event)
    }
  }

  const emit = (event: EventType, payload?: unknown): void => {
    const listeners = store.listeners.get(event)
    listeners?.forEach((handler) => {
      handler(payload)
    })

    store.wildcardListeners.forEach((entry) => {
      if (matchesWildcard(entry.pattern, event)) {
        entry.handler(payload)
      }
    })
  }

  return { on, once, off, emit }
}
