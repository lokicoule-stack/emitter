import { describe, expect, it, vi } from 'vitest'
import { createStore } from '../../../src/store/createStore'
import { addHandler, removeHandler } from '../../../src/store/operations'
import type { EventMap } from '../../../src/types/main'

describe('Handlers', () => {
  interface TestEvents extends EventMap {
    'user:login': { userId: string }
    'user:logout': void
    'user:update': { userId: string; data: object }
  }

  describe('addHandler', () => {
    it('should add a regular handler for a specific event', () => {
      const store = createStore<TestEvents>()
      const handler = vi.fn(() => {})

      addHandler(store, 'user:login', handler)

      const handlers = store.handlers.get('user:login')
      expect(handlers).toBeDefined()
      expect(handlers?.has(handler)).toBe(true)
      expect(store.wildcardHandlers.size).toBe(0)
    })

    it('should add a wildcard handler', () => {
      const store = createStore<TestEvents>()
      const handler = vi.fn(() => {})

      addHandler(store, '*', handler)

      expect(store.wildcardHandlers.has(handler)).toBe(true)
      expect(store.handlers.size).toBe(0)
    })

    it('should create a new Set for first handler of an event', () => {
      const store = createStore<TestEvents>()
      const handler = vi.fn(() => {})

      addHandler(store, 'user:login', handler)

      expect(store.handlers.has('user:login')).toBe(true)
      expect(store.handlers.get('user:login')?.size).toBe(1)
    })

    it('should add multiple handlers for the same event', () => {
      const store = createStore<TestEvents>()
      const handler1 = vi.fn(() => {})
      const handler2 = vi.fn(() => {})

      addHandler(store, 'user:login', handler1)
      addHandler(store, 'user:login', handler2)

      const handlers = store.handlers.get('user:login')
      expect(handlers?.size).toBe(2)
      expect(handlers?.has(handler1)).toBe(true)
      expect(handlers?.has(handler2)).toBe(true)
    })
  })

  describe('removeHandler', () => {
    it('should remove a regular handler', () => {
      const store = createStore<TestEvents>()
      const handler = vi.fn(() => {})

      addHandler(store, 'user:login', handler)
      removeHandler(store, 'user:login', handler)

      expect(store.handlers.get('user:login')).toBeUndefined()
    })

    it('should remove a wildcard handler', () => {
      const store = createStore<TestEvents>()
      const handler = vi.fn(() => {})

      addHandler(store, '*', handler)
      removeHandler(store, '*', handler)

      expect(store.wildcardHandlers.has(handler)).toBe(false)
    })

    it('should delete event key when removing last handler', () => {
      const store = createStore<TestEvents>()
      const handler = vi.fn(() => {})

      addHandler(store, 'user:login', handler)
      removeHandler(store, 'user:login', handler)

      expect(store.handlers.has('user:login')).toBe(false)
    })

    it('should keep other handlers when removing one handler', () => {
      const store = createStore<TestEvents>()
      const handler1 = vi.fn(() => {})
      const handler2 = vi.fn(() => {})

      addHandler(store, 'user:login', handler1)
      addHandler(store, 'user:login', handler2)
      removeHandler(store, 'user:login', handler1)

      const handlers = store.handlers.get('user:login')
      expect(handlers?.size).toBe(1)
      expect(handlers?.has(handler2)).toBe(true)
    })

    it('should do nothing when removing non-existent handler', () => {
      const store = createStore<TestEvents>()
      const handler = vi.fn(() => {})

      removeHandler(store, 'user:login', handler)

      expect(store.handlers.size).toBe(0)
      expect(store.wildcardHandlers.size).toBe(0)
    })
  })
})
