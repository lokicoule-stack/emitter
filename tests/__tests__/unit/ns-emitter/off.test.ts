import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter, mockPayloads } from './__fixtures__/setup'

describe('NamespacedEmitter.off()', () => {
  it('should remove specific handler', () => {
    const emitter = createTestEmitter('run')
    const handler = vi.fn()

    emitter.$on('success', handler)
    emitter.$off('success', handler)
    emitter.$emit('success', mockPayloads.runSuccess)

    expect(handler).not.toHaveBeenCalled()
  })

  it('should handle wildcard unsubscription', () => {
    const emitter = createTestEmitter('cache')
    const handler = vi.fn()
    const wildcardHandler = vi.fn()

    emitter.$on('hit', handler)
    emitter.$on('*', wildcardHandler)
    emitter.$off('*', wildcardHandler)
    emitter.$emit('hit', mockPayloads.cacheHit)

    expect(handler).toHaveBeenCalledWith(mockPayloads.cacheHit)
    expect(wildcardHandler).not.toHaveBeenCalled()
  })
})
