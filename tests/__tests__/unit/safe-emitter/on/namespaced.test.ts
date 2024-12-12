import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter, mockPayloads } from '../__fixtures__/setup'

describe('SafeEmitter.on() - Namespaced Events', () => {
  it('should register and call namespaced event handler', () => {
    const emitter = createTestEmitter()
    const handler = vi.fn()

    emitter.on('cache:hit', handler)
    emitter.emit('cache:hit', mockPayloads.cacheHit)

    expect(handler).toHaveBeenCalledWith(mockPayloads.cacheHit)
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
