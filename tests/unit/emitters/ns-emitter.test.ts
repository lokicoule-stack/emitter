import { describe, expect, it, vi } from 'vitest'
import { createNSEmitter } from '../../../src/emitters/ns-emitter'
import { createUnsafeEmitter } from '../../../src/emitters/unsafe-emitter'
import type { TestEvents } from '../../../testing/fixtures/events'
import { mockPayloads } from '../../../testing/fixtures/events'

describe('NSEmitter Unit Tests', () => {
  describe('on', () => {
    it('should register and call namespaced event handler', () => {
      const baseEmitter = createUnsafeEmitter()
      const cacheEmitter = createNSEmitter<TestEvents, 'cache'>(baseEmitter, 'cache')
      const handler = vi.fn()

      cacheEmitter.on('hit', handler)
      cacheEmitter.emit('hit', mockPayloads.cacheHit)

      expect(handler).toHaveBeenCalledWith(mockPayloads.cacheHit)
      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('should handle wildcard listeners within namespace', () => {
      const baseEmitter = createUnsafeEmitter()
      const cacheEmitter = createNSEmitter<TestEvents, 'cache'>(baseEmitter, 'cache')
      const handler = vi.fn()

      cacheEmitter.on('*', handler)
      cacheEmitter.emit('hit', mockPayloads.cacheHit)
      cacheEmitter.emit('miss', mockPayloads.cacheMiss)

      expect(handler).toHaveBeenCalledTimes(2)
      expect(handler).toHaveBeenCalledWith('cache:hit', mockPayloads.cacheHit)
      expect(handler).toHaveBeenCalledWith('cache:miss', mockPayloads.cacheMiss)
    })

    it('should return unsubscribe function', () => {
      const baseEmitter = createUnsafeEmitter()
      const buildEmitter = createNSEmitter<TestEvents, 'build'>(baseEmitter, 'build')
      const handler = vi.fn()

      const unsubscribe = buildEmitter.on('success', handler)
      unsubscribe()
      buildEmitter.emit('success', mockPayloads.buildSuccess)

      expect(handler).not.toHaveBeenCalled()
    })
  })

  describe('once', () => {
    it('should call handler only once', () => {
      const baseEmitter = createUnsafeEmitter()
      const buildEmitter = createNSEmitter<TestEvents, 'build'>(baseEmitter, 'build')
      const handler = vi.fn()

      buildEmitter.once('success', handler)
      buildEmitter.emit('success', mockPayloads.buildSuccess)
      buildEmitter.emit('success', mockPayloads.buildSuccess)

      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler).toHaveBeenCalledWith(mockPayloads.buildSuccess)
    })
  })

  describe('off', () => {
    it('should remove specific handler', () => {
      const baseEmitter = createUnsafeEmitter()
      const runEmitter = createNSEmitter<TestEvents, 'run'>(baseEmitter, 'run')
      const handler = vi.fn()

      runEmitter.on('success', handler)
      runEmitter.off('success', handler)
      runEmitter.emit('success', mockPayloads.runSuccess)

      expect(handler).not.toHaveBeenCalled()
    })

    it('should handle wildcard unsubscription', () => {
      const baseEmitter = createUnsafeEmitter()
      const cacheEmitter = createNSEmitter<TestEvents, 'cache'>(baseEmitter, 'cache')
      const handler = vi.fn()
      const wildcardHandler = vi.fn()

      cacheEmitter.on('hit', handler)
      cacheEmitter.on('*', wildcardHandler)
      cacheEmitter.off('*', wildcardHandler)
      cacheEmitter.emit('hit', mockPayloads.cacheHit)

      expect(handler).toHaveBeenCalledWith(mockPayloads.cacheHit)
      expect(wildcardHandler).not.toHaveBeenCalled()
    })
  })
})
