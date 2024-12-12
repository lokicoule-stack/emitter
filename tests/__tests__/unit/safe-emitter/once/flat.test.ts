import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter, mockPayloads } from '../__fixtures__/setup'

describe('SafeEmitter.once() - Flat Events', () => {
  it('should call handler only once for flat event', () => {
    const emitter = createTestEmitter()
    const handler = vi.fn()

    emitter.once('build', handler)
    emitter.emit('build', mockPayloads.build)
    emitter.emit('build', mockPayloads.build)

    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith(mockPayloads.build)
  })
})
