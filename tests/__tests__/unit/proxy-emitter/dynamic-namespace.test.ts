import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter } from './__fixtures__/setup'

describe('ProxyEmitter - dynamic namespace behavior', () => {
  it('should support dynamic namespace', () => {
    const proxy = createTestEmitter()
    const handler = vi.fn()

    // @ts-expect-error - dynamic namespace
    proxy.dynamicNamespace.$on('event', handler)
    // @ts-expect-error - dynamic namespace
    proxy.dynamicNamespace.$emit('event', { data: 'test' })

    expect(handler).toHaveBeenCalledWith({ data: 'test' })
  })

  it('should support deeply nested dynamic namespaces', () => {
    const proxy = createTestEmitter()
    const handler = vi.fn()

    // @ts-expect-error - deep dynamic namespace
    const deepPath = proxy.a.very.deep.dynamic.namespace
    deepPath.$on('event', handler)
    deepPath.$emit('event', { test: true })

    expect(handler).toHaveBeenCalledWith({ test: true })
  })

  it('should maintain event isolation between namespaces', () => {
    const proxy = createTestEmitter()
    const handler1 = vi.fn()
    const handler2 = vi.fn()

    // @ts-expect-error - dynamic namespace
    proxy.namespace1.$on('event', handler1)
    // @ts-expect-error - dynamic namespace
    proxy.namespace2.$on('event', handler2)

    // @ts-expect-error - dynamic namespace
    proxy.namespace1.$emit('event', { source: '1' })

    expect(handler1).toHaveBeenCalledWith({ source: '1' })
    expect(handler2).not.toHaveBeenCalled()
  })

  it('should support wildcard listeners across all namespaces', () => {
    const proxy = createTestEmitter()
    const wildcardHandler = vi.fn()

    proxy.$on('*', wildcardHandler)

    // @ts-expect-error - dynamic namespace
    proxy.dynamic.namespace.$emit('event', { data: 'test' })
    // @ts-expect-error - dynamic namespace
    proxy.another.path.$emit('event', { data: 'test2' })

    expect(wildcardHandler).toHaveBeenCalledTimes(2)
    expect(wildcardHandler).toHaveBeenCalledWith('dynamic:namespace:event', { data: 'test' })
    expect(wildcardHandler).toHaveBeenCalledWith('another:path:event', { data: 'test2' })
  })
})
