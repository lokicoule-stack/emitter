import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter, mockPayloads } from './__fixtures__/setup'

describe('CoreEmitter.on()', () => {
  it('should register and call event handler', () => {
    const emitter = createTestEmitter()
    const handler = vi.fn()

    emitter.on('build', handler)
    emitter.emit('build', mockPayloads.build)

    expect(handler).toHaveBeenCalledWith(mockPayloads.build)
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should handle multiple handlers for same event', () => {
    const emitter = createTestEmitter()
    const handler1 = vi.fn()
    const handler2 = vi.fn()

    emitter.on('build', handler1)
    emitter.on('build', handler2)
    emitter.emit('build', mockPayloads.build)

    expect(handler1).toHaveBeenCalledWith(mockPayloads.build)
    expect(handler2).toHaveBeenCalledWith(mockPayloads.build)
  })

  it('should return unsubscribe function', () => {
    const emitter = createTestEmitter()
    const handler = vi.fn()

    const unsubscribe = emitter.on('build', handler)
    unsubscribe()
    emitter.emit('build', mockPayloads.build)

    expect(handler).not.toHaveBeenCalled()
  })
})
