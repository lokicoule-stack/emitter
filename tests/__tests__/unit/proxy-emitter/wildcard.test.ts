import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter, mockPayloads } from './__fixtures__/setup'

describe('ProxyEmitter - wildcard', () => {
  it('should support wildcard listeners', () => {
    const proxy = createTestEmitter()
    const handler = vi.fn()

    proxy.build.$on('*', handler)
    proxy.build.cache.$emit('hit', mockPayloads.buildCacheHit)

    expect(handler).toHaveBeenNthCalledWith(1, 'build:cache:hit', mockPayloads.buildCacheHit)
  })

  it('should support multiple wildcard listeners at different levels', () => {
    const proxy = createTestEmitter()
    const rootHandler = vi.fn()
    const buildHandler = vi.fn()

    proxy.$on('*', rootHandler)
    proxy.build.$on('*', buildHandler)
    proxy.build.cache.$emit('hit', mockPayloads.buildCacheHit)

    expect(rootHandler).toHaveBeenCalledWith('build:cache:hit', mockPayloads.buildCacheHit)
    expect(buildHandler).toHaveBeenCalledWith('build:cache:hit', mockPayloads.buildCacheHit)
  })
})
