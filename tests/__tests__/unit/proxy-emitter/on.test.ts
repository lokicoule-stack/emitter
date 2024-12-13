import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter, mockPayloads } from './__fixtures__/setup'

describe('ProxyEmitter - on', () => {
  it('should register and emit basic event', () => {
    const proxy = createTestEmitter()
    const handler = vi.fn()

    proxy.build.$on('success', handler)
    proxy.build.$emit('success', mockPayloads.buildSuccess)

    expect(handler).toHaveBeenNthCalledWith(1, mockPayloads.buildSuccess)
  })

  it('should allow multiple handlers for same event', () => {
    const proxy = createTestEmitter()
    const handler1 = vi.fn()
    const handler2 = vi.fn()

    proxy.build.$on('success', handler1)
    proxy.build.$on('success', handler2)
    proxy.build.$emit('success', mockPayloads.buildSuccess)

    expect(handler1).toHaveBeenCalledWith(mockPayloads.buildSuccess)
    expect(handler2).toHaveBeenCalledWith(mockPayloads.buildSuccess)
  })

  it('should handle events without payload', () => {
    const proxy = createTestEmitter()
    const handler = vi.fn()

    proxy.cache.$on('clear', handler)
    proxy.cache.$emit('clear')

    expect(handler).toHaveBeenCalledWith(undefined)
  })
})
