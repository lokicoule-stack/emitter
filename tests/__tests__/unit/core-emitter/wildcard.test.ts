import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter, mockPayloads } from './__fixtures__/setup'

describe('CoreEmitter Wildcard Listeners', () => {
  it('should receive all events with global wildcard *', () => {
    const emitter = createTestEmitter()
    const wildcardHandler = vi.fn()

    emitter.on('*', wildcardHandler)
    emitter.emit('build', mockPayloads.build)
    emitter.emit('run', mockPayloads.run)

    expect(wildcardHandler).toHaveBeenCalledTimes(2)
    expect(wildcardHandler).toHaveBeenNthCalledWith(1, 'build', mockPayloads.build)
    expect(wildcardHandler).toHaveBeenNthCalledWith(2, 'run', mockPayloads.run)
  })

  it('should handle namespace wildcard patterns', () => {
    const emitter = createTestEmitter()
    const buildHandler = vi.fn()

    emitter.on('build:*', buildHandler)
    emitter.emit('build:start', { status: 'starting' })
    emitter.emit('build:end', { status: 'complete' })
    emitter.emit('run:start', { status: 'starting' }) // Should not trigger

    expect(buildHandler).toHaveBeenCalledTimes(2)
    expect(buildHandler).toHaveBeenNthCalledWith(1, 'build:start', { status: 'starting' })
    expect(buildHandler).toHaveBeenNthCalledWith(2, 'build:end', { status: 'complete' })
  })

  it('should allow removing specific wildcard handlers', () => {
    const emitter = createTestEmitter()
    const handler1 = vi.fn()
    const handler2 = vi.fn()

    emitter.on('build:*', handler1)
    emitter.on('build:*', handler2)
    emitter.off('build:*', handler1)

    emitter.emit('build:start', mockPayloads.build)

    expect(handler1).not.toHaveBeenCalled()
    expect(handler2).toHaveBeenCalledWith('build:start', mockPayloads.build)
  })

  it('should remove all handlers for a wildcard pattern', () => {
    const emitter = createTestEmitter()
    const handler1 = vi.fn()
    const handler2 = vi.fn()

    emitter.on('build:*', handler1)
    emitter.on('build:*', handler2)
    emitter.off('build:*')

    emitter.emit('build:start', mockPayloads.build)

    expect(handler1).not.toHaveBeenCalled()
    expect(handler2).not.toHaveBeenCalled()
  })

  it('should handle multiple wildcard patterns simultaneously', () => {
    const emitter = createTestEmitter()
    const allHandler = vi.fn()
    const buildHandler = vi.fn()
    const runHandler = vi.fn()

    emitter.on('*', allHandler)
    emitter.on('build:*', buildHandler)
    emitter.on('run:*', runHandler)

    emitter.emit('build:start', { id: 1 })
    emitter.emit('run:end', { id: 2 })

    expect(allHandler).toHaveBeenCalledTimes(2)
    expect(buildHandler).toHaveBeenCalledTimes(1)
    expect(buildHandler).toHaveBeenCalledWith('build:start', { id: 1 })
    expect(runHandler).toHaveBeenCalledTimes(1)
    expect(runHandler).toHaveBeenCalledWith('run:end', { id: 2 })
  })

  it('should reject invalid wildcard patterns', () => {
    const emitter = createTestEmitter()
    const handler = vi.fn()

    // Should not register handlers with invalid patterns
    emitter.on('build:test:*', handler)
    emitter.emit('build:test:start', {})

    expect(handler).not.toHaveBeenCalled()
  })
})
