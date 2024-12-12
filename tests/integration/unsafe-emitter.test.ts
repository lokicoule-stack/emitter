import { describe, expect, it, vi } from 'vitest'
import { createUnsafeEmitter } from '../../src/emitters/unsafe-emitter'
import { mockPayloads } from '../../testing/fixtures/events'

describe('UnsafeEmitter Integration', () => {
  it('should handle complex event flow', () => {
    const emitter = createUnsafeEmitter()
    const handlers = {
      build: vi.fn(),
      cache: vi.fn(),
      wildcard: vi.fn(),
    }

    // Setup handlers
    emitter.on('build', handlers.build)
    emitter.on('cache:hit', handlers.cache)
    emitter.on('*', handlers.wildcard)

    // Emit various events
    emitter.emit('build', mockPayloads.build)
    emitter.emit('cache:hit', mockPayloads.cacheHit)

    // Verify handlers were called correctly
    expect(handlers.build).toHaveBeenCalledWith(mockPayloads.build)
    expect(handlers.cache).toHaveBeenCalledWith(mockPayloads.cacheHit)
    expect(handlers.wildcard).toHaveBeenCalledTimes(2)
  })

  it('should handle event unsubscription correctly', () => {
    const emitter = createUnsafeEmitter()
    const handlers = {
      build: vi.fn(),
      buildSuccess: vi.fn(),
      buildFail: vi.fn(),
    }

    // Setup and immediately unsubscribe some handlers
    const unsubBuild = emitter.on('build', handlers.build)
    emitter.on('build:success', handlers.buildSuccess)
    emitter.on('build:fail', handlers.buildFail)

    unsubBuild()
    emitter.off('build:success')

    // Emit events
    emitter.emit('build', mockPayloads.build)
    emitter.emit('build:success', mockPayloads.buildSuccess)
    emitter.emit('build:fail', mockPayloads.buildFail)

    // Verify correct handlers were called
    expect(handlers.build).not.toHaveBeenCalled()
    expect(handlers.buildSuccess).not.toHaveBeenCalled()
    expect(handlers.buildFail).toHaveBeenCalledWith(mockPayloads.buildFail)
  })

  it('should handle namespace events correctly', () => {
    const emitter = createUnsafeEmitter()
    const cacheHandlers = {
      hit: vi.fn(),
      miss: vi.fn(),
      clear: vi.fn(),
      reset: vi.fn(),
      all: vi.fn(),
    }

    // Setup namespace handlers
    emitter.on('cache:hit', cacheHandlers.hit)
    emitter.on('cache:miss', cacheHandlers.miss)
    emitter.on('cache:clear', cacheHandlers.clear)
    emitter.on('cache:reset', cacheHandlers.reset)
    emitter.on('cache:*', cacheHandlers.all)

    // Emit cache events
    emitter.emit('cache:hit', mockPayloads.cacheHit)
    emitter.emit('cache:miss', mockPayloads.cacheMiss)
    emitter.emit('cache:clear', {})

    // Verify handlers
    expect(cacheHandlers.hit).toHaveBeenCalledWith(mockPayloads.cacheHit)
    expect(cacheHandlers.miss).toHaveBeenCalledWith(mockPayloads.cacheMiss)
    expect(cacheHandlers.clear).toHaveBeenCalledWith({})
    expect(cacheHandlers.reset).not.toHaveBeenCalled()
    expect(cacheHandlers.all).toHaveBeenCalledTimes(3)
  })

  it('should handle events with same name as namespace', () => {
    const emitter = createUnsafeEmitter()
    const buildHandlers = {
      main: vi.fn(),
      success: vi.fn(),
      fail: vi.fn(),
    }

    emitter.on('build', buildHandlers.main)
    emitter.on('build:success', buildHandlers.success)
    emitter.on('build:fail', buildHandlers.fail)

    emitter.emit('build', mockPayloads.build)
    emitter.emit('build:success', mockPayloads.buildSuccess)

    expect(buildHandlers.main).toHaveBeenCalledWith(mockPayloads.build)
    expect(buildHandlers.success).toHaveBeenCalledWith(mockPayloads.buildSuccess)
    expect(buildHandlers.fail).not.toHaveBeenCalled()
  })
})
