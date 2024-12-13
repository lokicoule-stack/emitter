import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter, mockPayloads } from './__fixtures__/setup'

describe('createProxyEmitter (Unit)', () => {
  it('should register and emit event', () => {
    const proxy = createTestEmitter()
    const handler = vi.fn()

    proxy.build.$on('success', handler)
    proxy.build.$emit('success', mockPayloads.buildSuccess)

    expect(handler).toHaveBeenNthCalledWith(1, mockPayloads.buildSuccess)
  })

  it('should support nested namespaces', () => {
    const proxy = createTestEmitter()
    const handler = vi.fn()

    proxy.build.cache.$on('hit', handler)
    proxy.build.cache.$emit('hit', mockPayloads.cacheHit)

    expect(handler).toHaveBeenNthCalledWith(1, mockPayloads.cacheHit)
  })

  it('should support wildcard listeners', () => {
    const proxy = createTestEmitter()
    const handler = vi.fn()

    proxy.build.$on('*', handler)
    proxy.build.cache.$emit('hit', mockPayloads.cacheHit)

    expect(handler).toHaveBeenNthCalledWith(1, 'build:cache:hit', mockPayloads.cacheHit)
  })
})
