import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter, mockPayloads } from './__fixtures__/setup'

describe('NamespacedEmitter.once()', () => {
  it('should call handler only once', () => {
    const emitter = createTestEmitter('build')
    const handler = vi.fn()

    emitter.$once('success', handler)
    emitter.$emit('success', mockPayloads.buildSuccess)
    emitter.$emit('success', mockPayloads.buildSuccess)

    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith(mockPayloads.buildSuccess)
  })
})
