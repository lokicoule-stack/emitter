import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter, mockPayloads } from './__fixtures__/setup'

describe('ProxyEmitter - namespace', () => {
  it('should support nested namespaces', () => {
    const proxy = createTestEmitter()
    const handler = vi.fn()

    proxy.build.cache.$on('hit', handler)
    proxy.build.cache.$emit('hit', mockPayloads.cacheHit)

    expect(handler).toHaveBeenNthCalledWith(1, mockPayloads.cacheHit)
  })

  it('should properly namespace events from different branches', () => {
    const proxy = createTestEmitter()
    const buildHandler = vi.fn()
    const serverHandler = vi.fn()

    proxy.build.$on('success', buildHandler)
    proxy.server.$on('start', serverHandler)

    proxy.build.$emit('success', mockPayloads.buildSuccess)
    proxy.server.$emit('start', mockPayloads.serverStart)

    expect(buildHandler).toHaveBeenNthCalledWith(1, mockPayloads.buildSuccess)
    expect(serverHandler).toHaveBeenNthCalledWith(1, mockPayloads.serverStart)
  })

  it('should maintain independent event handlers for different namespaces', () => {
    const proxy = createTestEmitter()
    const buildCacheHandler = vi.fn()
    const serverCacheHandler = vi.fn()

    proxy.build.cache.$on('hit', buildCacheHandler)
    proxy.server.cache.$on('hit', serverCacheHandler)

    proxy.build.cache.$emit('hit', mockPayloads.cacheHit)
    proxy.server.cache.$emit('hit', mockPayloads.serverCacheHit)

    expect(buildCacheHandler).toHaveBeenCalledWith(mockPayloads.cacheHit)
    expect(serverCacheHandler).toHaveBeenCalledWith(mockPayloads.serverCacheHit)
  })
})
