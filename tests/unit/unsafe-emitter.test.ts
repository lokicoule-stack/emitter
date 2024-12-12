import { describe, expect, it, vi } from 'vitest'
import { createUnsafeEmitter } from '../../src/emitters/unsafe-emitter'
import { mockPayloads } from '../../testing/fixtures/events'

describe('UnsafeEmitter', () => {
  describe('on', () => {
    it('should register and call event handler', () => {
      const emitter = createUnsafeEmitter()
      const handler = vi.fn()

      emitter.on('build', handler)
      emitter.emit('build', mockPayloads.build)

      expect(handler).toHaveBeenCalledWith(mockPayloads.build)
      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('should handle multiple handlers for same event', () => {
      const emitter = createUnsafeEmitter()
      const handler1 = vi.fn()
      const handler2 = vi.fn()

      emitter.on('build', handler1)
      emitter.on('build', handler2)
      emitter.emit('build', mockPayloads.build)

      expect(handler1).toHaveBeenCalledWith(mockPayloads.build)
      expect(handler2).toHaveBeenCalledWith(mockPayloads.build)
    })

    it('should return unsubscribe function', () => {
      const emitter = createUnsafeEmitter()
      const handler = vi.fn()

      const unsubscribe = emitter.on('build', handler)
      unsubscribe()
      emitter.emit('build', mockPayloads.build)

      expect(handler).not.toHaveBeenCalled()
    })
  })

  describe('once', () => {
    it('should call handler only once', () => {
      const emitter = createUnsafeEmitter()
      const handler = vi.fn()

      emitter.once('build', handler)
      emitter.emit('build', mockPayloads.build)
      emitter.emit('build', mockPayloads.build)

      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler).toHaveBeenCalledWith(mockPayloads.build)
    })
  })

  describe('off', () => {
    it('should remove specific handler', () => {
      const emitter = createUnsafeEmitter()
      const handler = vi.fn()

      emitter.on('build', handler)
      emitter.off('build', handler)
      emitter.emit('build', mockPayloads.build)

      expect(handler).not.toHaveBeenCalled()
    })

    it('should remove all handlers for event when no handler specified', () => {
      const emitter = createUnsafeEmitter()
      const handler1 = vi.fn()
      const handler2 = vi.fn()

      emitter.on('build', handler1)
      emitter.on('build', handler2)
      emitter.off('build')
      emitter.emit('build', mockPayloads.build)

      expect(handler1).not.toHaveBeenCalled()
      expect(handler2).not.toHaveBeenCalled()
    })
  })

  describe('wildcard listeners', () => {
    it('should receive all events', () => {
      const emitter = createUnsafeEmitter()
      const wildcardHandler = vi.fn()

      emitter.on('*', wildcardHandler)
      emitter.emit('build', mockPayloads.build)
      emitter.emit('run', mockPayloads.run)

      expect(wildcardHandler).toHaveBeenCalledTimes(2)
      expect(wildcardHandler).toHaveBeenCalledWith('build', mockPayloads.build)
      expect(wildcardHandler).toHaveBeenCalledWith('run', mockPayloads.run)
    })
  })
})
