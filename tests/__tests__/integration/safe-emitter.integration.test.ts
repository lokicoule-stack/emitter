import { describe, expect, it, vi } from 'vitest'
import { createSafeEmitter } from '../../../src/emitters/safe-emitter'
import type { TestEvents } from '../../__fixtures__/events'
import { mockPayloads } from '../../__fixtures__/events'

describe('SafeEmitter Integration Tests', () => {
  it('should handle complex event flow', () => {
    const emitter = createSafeEmitter<TestEvents>()
    const handlers = {
      build: vi.fn(),
      buildSuccess: vi.fn(),
      cacheHit: vi.fn(),
      wildcard: vi.fn(),
    }

    emitter.on('build', handlers.build)
    emitter.on('build:success', handlers.buildSuccess)
    emitter.on('cache:hit', handlers.cacheHit)
    emitter.on('*', handlers.wildcard)

    emitter.emit('build', mockPayloads.build)
    emitter.emit('build:success', mockPayloads.buildSuccess)
    emitter.emit('cache:hit', mockPayloads.cacheHit)

    expect(handlers.build).toHaveBeenCalledWith(mockPayloads.build)
    expect(handlers.buildSuccess).toHaveBeenCalledWith(mockPayloads.buildSuccess)
    expect(handlers.cacheHit).toHaveBeenCalledWith(mockPayloads.cacheHit)
    expect(handlers.wildcard).toHaveBeenCalledTimes(3)
  })

  it('should handle multiple namespaces', () => {
    const emitter = createSafeEmitter<TestEvents>()
    const cacheEmitter = emitter.namespace('cache')
    const buildEmitter = emitter.namespace('build')

    const handlers = {
      cacheHit: vi.fn(),
      cacheMiss: vi.fn(),
      buildSuccess: vi.fn(),
      buildFail: vi.fn(),
    }

    cacheEmitter.on('hit', handlers.cacheHit)
    cacheEmitter.on('miss', handlers.cacheMiss)
    buildEmitter.on('success', handlers.buildSuccess)
    buildEmitter.on('fail', handlers.buildFail)

    cacheEmitter.emit('hit', mockPayloads.cacheHit)
    emitter.emit('cache:miss', mockPayloads.cacheMiss)
    buildEmitter.emit('success', mockPayloads.buildSuccess)
    emitter.emit('build:fail', mockPayloads.buildFail)

    expect(handlers.cacheHit).toHaveBeenCalledWith(mockPayloads.cacheHit)
    expect(handlers.cacheMiss).toHaveBeenCalledWith(mockPayloads.cacheMiss)
    expect(handlers.buildSuccess).toHaveBeenCalledWith(mockPayloads.buildSuccess)
    expect(handlers.buildFail).toHaveBeenCalledWith(mockPayloads.buildFail)
  })

  it('should handle unsubscription across namespaces', () => {
    const emitter = createSafeEmitter<TestEvents>()
    const runEmitter = emitter.namespace('run')
    const handlers = {
      runSuccess: vi.fn(),
      runFail: vi.fn(),
    }

    const unsubSuccess = runEmitter.on('success', handlers.runSuccess)
    runEmitter.on('fail', handlers.runFail)

    runEmitter.emit('success', mockPayloads.runSuccess)
    unsubSuccess()
    emitter.emit('run:success', mockPayloads.runSuccess)
    emitter.emit('run:fail', mockPayloads.runFail)

    expect(handlers.runSuccess).toHaveBeenCalledTimes(1)
    expect(handlers.runFail).toHaveBeenCalledWith(mockPayloads.runFail)
  })

  it('should handle empty payload events', () => {
    const emitter = createSafeEmitter<TestEvents>()
    const cacheEmitter = emitter.namespace('cache')
    const handler = vi.fn()

    cacheEmitter.on('clear', handler)
    cacheEmitter.emit('clear', {})

    expect(handler).toHaveBeenCalledWith({})
  })
})
