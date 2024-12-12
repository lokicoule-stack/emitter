import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter, mockPayloads } from './__fixtures__/setup'

describe('SafeEmitter.off()', () => {
  it('should remove specific handler', () => {
    const emitter = createTestEmitter()
    const handler = vi.fn()

    emitter.on('build', handler)
    emitter.off('build', handler)
    emitter.emit('build', mockPayloads.build)

    expect(handler).not.toHaveBeenCalled()
  })

  it('should remove all handlers when no handler specified', () => {
    const emitter = createTestEmitter()
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
