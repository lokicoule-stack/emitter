import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter, mockPayloads } from './__fixtures__/setup'

describe('ProxyEmitter - off', () => {
  it('should remove event listener', () => {
    const proxy = createTestEmitter()
    const handler = vi.fn()

    proxy.build.$on('success', handler)
    proxy.build.$off('success', handler)
    proxy.build.$emit('success', mockPayloads.buildSuccess)

    expect(handler).not.toHaveBeenCalled()
  })

  it('should support removing all listeners of an event', () => {
    const proxy = createTestEmitter()
    const handler1 = vi.fn()
    const handler2 = vi.fn()

    proxy.build.$on('success', handler1)
    proxy.build.$on('success', handler2)
    proxy.build.$off('success')
    proxy.build.$emit('success', mockPayloads.buildSuccess)

    expect(handler1).not.toHaveBeenCalled()
    expect(handler2).not.toHaveBeenCalled()
  })
})
