import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter, mockPayloads } from '../__fixtures__/setup'

describe('SafeEmitter.on() - Wildcard Events', () => {
  it('should handle wildcard listeners', () => {
    const emitter = createTestEmitter()
    const handler = vi.fn()

    emitter.on('*', handler)
    emitter.emit('build', mockPayloads.build)
    emitter.emit('cache:hit', mockPayloads.cacheHit)

    expect(handler).toHaveBeenCalledTimes(2)
    expect(handler).toHaveBeenCalledWith('build', mockPayloads.build)
    expect(handler).toHaveBeenCalledWith('cache:hit', mockPayloads.cacheHit)
  })
})
