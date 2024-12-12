import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter, mockPayloads } from '../__fixtures__/setup'

describe('SafeEmitter.once() - Namespaced Events', () => {
  it('should call handler only once for namespaced event', () => {
    const emitter = createTestEmitter()
    const handler = vi.fn()

    emitter.once('cache:hit', handler)
    emitter.emit('cache:hit', mockPayloads.cacheHit)
    emitter.emit('cache:hit', mockPayloads.cacheHit)

    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith(mockPayloads.cacheHit)
  })
})
