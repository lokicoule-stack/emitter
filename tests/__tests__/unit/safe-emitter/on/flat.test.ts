import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter, mockPayloads } from '../__fixtures__/setup'

describe('SafeEmitter.on() - Flat Events', () => {
  it('should register and call flat event handler', () => {
    const emitter = createTestEmitter()
    const handler = vi.fn()

    emitter.$on('build', handler)
    emitter.$emit('build', mockPayloads.build)

    expect(handler).toHaveBeenCalledWith(mockPayloads.build)
    expect(handler).toHaveBeenCalledTimes(1)
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
