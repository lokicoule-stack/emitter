import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter, mockPayloads } from './__fixtures__/setup'

describe('TypedEmitter Unit Tests', () => {
  describe('on', () => {
    it('should register and call flat event handler', () => {
      const emitter = createTestEmitter()
      const handler = vi.fn()

      emitter.$on('build', handler)
      emitter.$emit('build', mockPayloads.build)

      expect(handler).toHaveBeenCalledWith(mockPayloads.build)
      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('should register and call namespaced event handler', () => {
      const emitter = createTestEmitter()
      const handler = vi.fn()

      emitter.$on('cache:hit', handler)
      emitter.$emit('cache:hit', mockPayloads.cacheHit)

      expect(handler).toHaveBeenCalledWith(mockPayloads.cacheHit)
      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('should handle wildcard listeners', () => {
      const emitter = createTestEmitter()
      const handler = vi.fn()

      emitter.$on('*', handler)
      emitter.$emit('build', mockPayloads.build)
      emitter.$emit('cache:hit', mockPayloads.cacheHit)

      expect(handler).toHaveBeenCalledTimes(2)
      expect(handler).toHaveBeenNthCalledWith(1, 'build', mockPayloads.build)
      expect(handler).toHaveBeenNthCalledWith(2, 'cache:hit', mockPayloads.cacheHit)
    })

    it('should return unsubscribe function', () => {
      const emitter = createTestEmitter()
      const handler = vi.fn()

      const unsubscribe = emitter.$on('build', handler)
      unsubscribe()
      emitter.$emit('build', mockPayloads.build)

      expect(handler).not.toHaveBeenCalled()
    })
  })

  describe('once', () => {
    it('should call handler only once for flat event', () => {
      const emitter = createTestEmitter()
      const handler = vi.fn()

      emitter.$once('build', handler)
      emitter.$emit('build', mockPayloads.build)
      emitter.$emit('build', mockPayloads.build)

      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler).toHaveBeenCalledWith(mockPayloads.build)
    })

    it('should call handler only once for namespaced event', () => {
      const emitter = createTestEmitter()
      const handler = vi.fn()

      emitter.$once('cache:hit', handler)
      emitter.$emit('cache:hit', mockPayloads.cacheHit)
      emitter.$emit('cache:hit', mockPayloads.cacheHit)

      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler).toHaveBeenCalledWith(mockPayloads.cacheHit)
    })
  })

  describe('off', () => {
    it('should remove specific handler', () => {
      const emitter = createTestEmitter()
      const handler = vi.fn()

      emitter.$on('build', handler)
      emitter.$off('build', handler)
      emitter.$emit('build', mockPayloads.build)

      expect(handler).not.toHaveBeenCalled()
    })

    it('should remove all handlers when no handler specified', () => {
      const emitter = createTestEmitter()
      const handler1 = vi.fn()
      const handler2 = vi.fn()

      emitter.$on('build', handler1)
      emitter.$on('build', handler2)
      emitter.$off('build')
      emitter.$emit('build', mockPayloads.build)

      expect(handler1).not.toHaveBeenCalled()
      expect(handler2).not.toHaveBeenCalled()
    })
  })

  describe('namespace', () => {
    it('should create namespaced emitter', () => {
      const emitter = createTestEmitter()
      const cacheEmitter = emitter.$ns('cache')
      const handler = vi.fn()

      cacheEmitter.$on('hit', handler)
      cacheEmitter.$emit('hit', mockPayloads.cacheHit)

      expect(handler).toHaveBeenCalledWith(mockPayloads.cacheHit)
    })
  })
})
