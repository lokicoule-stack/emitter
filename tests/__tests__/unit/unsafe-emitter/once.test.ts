import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter, mockPayloads } from './__fixtures__/setup'

describe('UnsafeEmitter.once()', () => {
  it('should call handler only once', () => {
    const emitter = createTestEmitter()
    const handler = vi.fn()

    emitter.once('build', handler)
    emitter.emit('build', mockPayloads.build)
    emitter.emit('build', mockPayloads.build)

    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith(mockPayloads.build)
  })
})
