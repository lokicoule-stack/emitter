import { describe, expect, it, vi } from 'vitest'
import { createNSEmitter } from '../../src/emitters/ns-emitter'
import { createUnsafeEmitter } from '../../src/emitters/unsafe-emitter'
import type { TestEvents } from '../../testing/fixtures/events'
import { mockPayloads } from '../../testing/fixtures/events'

describe('NSEmitter Integration Tests', () => {
  it('should handle multiple namespaces independently', () => {
    const baseEmitter = createUnsafeEmitter()
    const buildEmitter = createNSEmitter<TestEvents, 'build'>(baseEmitter, 'build')
    const cacheEmitter = createNSEmitter<TestEvents, 'cache'>(baseEmitter, 'cache')

    const buildHandler = vi.fn()
    const cacheHandler = vi.fn()

    buildEmitter.on('success', buildHandler)
    cacheEmitter.on('hit', cacheHandler)

    buildEmitter.emit('success', mockPayloads.buildSuccess)
    cacheEmitter.emit('hit', mockPayloads.cacheHit)

    expect(buildHandler).toHaveBeenCalledWith(mockPayloads.buildSuccess)
    expect(cacheHandler).toHaveBeenCalledWith(mockPayloads.cacheHit)
  })

  it('should handle complex event flow with wildcards', () => {
    const baseEmitter = createUnsafeEmitter()
    const cacheEmitter = createNSEmitter<TestEvents, 'cache'>(baseEmitter, 'cache')

    const handlers = {
      hit: vi.fn(),
      miss: vi.fn(),
      all: vi.fn(),
    }

    cacheEmitter.on('hit', handlers.hit)
    cacheEmitter.on('miss', handlers.miss)
    cacheEmitter.on('*', handlers.all)

    cacheEmitter.emit('hit', mockPayloads.cacheHit)
    cacheEmitter.emit('miss', mockPayloads.cacheMiss)
    cacheEmitter.emit('clear', {})

    expect(handlers.hit).toHaveBeenCalledWith(mockPayloads.cacheHit)
    expect(handlers.miss).toHaveBeenCalledWith(mockPayloads.cacheMiss)
    expect(handlers.all).toHaveBeenCalledTimes(3)
  })

  it('should handle namespace collisions with flat events', () => {
    const baseEmitter = createUnsafeEmitter()
    const buildEmitter = createNSEmitter<TestEvents, 'build'>(baseEmitter, 'build')

    const handlers = {
      flat: vi.fn(),
      success: vi.fn(),
      fail: vi.fn(),
    }

    buildEmitter.on('success', handlers.success)
    buildEmitter.on('fail', handlers.fail)
    baseEmitter.on('build', handlers.flat)

    buildEmitter.emit('success', mockPayloads.buildSuccess)
    baseEmitter.emit('build', mockPayloads.build)

    expect(handlers.success).toHaveBeenCalledWith(mockPayloads.buildSuccess)
    expect(handlers.flat).toHaveBeenCalledWith(mockPayloads.build)
    expect(handlers.fail).not.toHaveBeenCalled()
  })

  it('should handle lifecycle of multiple event types', () => {
    const baseEmitter = createUnsafeEmitter()
    const runEmitter = createNSEmitter<TestEvents, 'run'>(baseEmitter, 'run')

    const handlers = {
      success: vi.fn(),
      fail: vi.fn(),
      all: vi.fn(),
    }

    const unsubSuccess = runEmitter.on('success', handlers.success)
    runEmitter.on('fail', handlers.fail)
    runEmitter.on('*', handlers.all)

    runEmitter.emit('success', mockPayloads.runSuccess)
    unsubSuccess()
    runEmitter.emit('success', mockPayloads.runSuccess)
    runEmitter.emit('fail', mockPayloads.runFail)

    expect(handlers.success).toHaveBeenCalledTimes(1)
    expect(handlers.fail).toHaveBeenCalledWith(mockPayloads.runFail)
    expect(handlers.all).toHaveBeenCalledTimes(3)
  })

  it('should handle nested namespaces with wildcard listeners', () => {
    const baseEmitter = createUnsafeEmitter()
    const buildEmitter = createNSEmitter<TestEvents, 'build'>(baseEmitter, 'build')

    const handlers = {
      hit: vi.fn(),
      miss: vi.fn(),
      all: vi.fn(),
    }

    buildEmitter.on('cache:hit', handlers.hit)
    buildEmitter.on('cache:miss', handlers.miss)
    buildEmitter.on('*', handlers.all)

    buildEmitter.emit('cache:hit', mockPayloads.buildCacheHit)
    buildEmitter.emit('cache:miss', mockPayloads.buildCacheMiss)

    expect(handlers.hit).toHaveBeenCalledWith(mockPayloads.buildCacheHit)
    expect(handlers.miss).toHaveBeenCalledWith(mockPayloads.buildCacheMiss)
    expect(handlers.all).toHaveBeenCalledTimes(2)

    handlers.hit.mockClear()
    handlers.miss.mockClear()
    handlers.all.mockClear()

    const buildCache = buildEmitter.namespace('cache')

    buildCache.emit('hit', mockPayloads.buildCacheHit)
    buildCache.emit('miss', mockPayloads.buildCacheMiss)

    expect(handlers.hit).toHaveBeenCalledWith(mockPayloads.buildCacheHit)
    expect(handlers.miss).toHaveBeenCalledWith(mockPayloads.buildCacheMiss)
    expect(handlers.all).toHaveBeenCalledTimes(2)
  })

  it('should handle empty payload events', () => {
    const baseEmitter = createUnsafeEmitter()
    const cacheEmitter = createNSEmitter<TestEvents, 'cache'>(baseEmitter, 'cache')

    const handlers = {
      clear: vi.fn(),
      reset: vi.fn(),
      all: vi.fn(),
    }

    cacheEmitter.on('clear', handlers.clear)
    cacheEmitter.on('reset', handlers.reset)
    cacheEmitter.on('*', handlers.all)

    cacheEmitter.emit('clear', {})
    cacheEmitter.emit('reset', {})

    expect(handlers.clear).toHaveBeenCalledWith({})
    expect(handlers.reset).toHaveBeenCalledWith({})
    expect(handlers.all).toHaveBeenCalledTimes(2)
  })
})
