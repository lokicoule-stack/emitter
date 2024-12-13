import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter, mockPayloads } from './__fixtures__/setup'

describe('TypedEmitter.namespace()', () => {
  it('should create namespaced emitter', () => {
    const emitter = createTestEmitter()
    const cacheEmitter = emitter.$ns('cache')
    const handler = vi.fn()

    cacheEmitter.$on('hit', handler)
    cacheEmitter.$emit('hit', mockPayloads.cacheHit)

    expect(handler).toHaveBeenCalledWith(mockPayloads.cacheHit)
  })
})
