import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter, mockPayloads } from './__fixtures__/setup'

describe('SafeEmitter.namespace()', () => {
  it('should create namespaced emitter', () => {
    const emitter = createTestEmitter()
    const cacheEmitter = emitter.namespace('cache')
    const handler = vi.fn()

    cacheEmitter.on('hit', handler)
    cacheEmitter.emit('hit', mockPayloads.cacheHit)

    expect(handler).toHaveBeenCalledWith(mockPayloads.cacheHit)
  })
})
