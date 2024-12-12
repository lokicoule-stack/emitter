import { describe, expectTypeOf, it, vitest } from 'vitest'
import type { EventEmitter } from '../../../src/types/emitters'

describe('EventEmitter API', () => {
  const emitter = {
    on: vitest.fn<(...args: unknown[]) => () => void>(),
    once: vitest.fn<(...args: unknown[]) => void>(),
    off: vitest.fn<(...args: unknown[]) => void>(),
    emit: vitest.fn<(...args: unknown[]) => boolean>(),
    namespace: vitest.fn<(...args: unknown[]) => unknown>(),
  } as EventEmitter<MyEvents>

  type MyEvents = {
    'auth:login': { userId: string }
    'auth:logout': void
    'data:update': { data: unknown }
    'system:monitor:cpu': { usage: number }
    'system:monitor:memory': { usage: number }
  }

  it('should type check regular event handlers', () => {
    emitter.on('auth:login', (payload) => {
      expectTypeOf(payload).toMatchTypeOf<{ userId: string }>()
    })

    emitter.on('auth:logout', (payload) => {
      expectTypeOf(payload).toMatchTypeOf<void>()
    })

    emitter.on('data:update', (payload) => {
      expectTypeOf(payload).toMatchTypeOf<{ data: unknown }>()
    })

    // @ts-expect-error - Invalid event name
    emitter.on('invalid', () => {})

    // @ts-expect-error - Invalid payload type
    emitter.emit('auth:login', { invalid: '123' })

    // @ts-expect-error - Invalid event
    emitter.emit('invalid', undefined)
  })

  it('should type check wildcard handlers', () => {
    emitter.on('*', (event, payload) => {
      expectTypeOf(event).toMatchTypeOf<
        | 'auth:login'
        | 'auth:logout'
        | 'data:update'
        | 'system:monitor:cpu'
        | 'system:monitor:memory'
      >()
      expectTypeOf(payload).toMatchTypeOf<
        { userId: string } | void | { data: unknown } | { usage: number }
      >()
    })

    // @ts-expect-error - Once doesn't support wildcard
    emitter.once('*', () => {})
  })

  it('should type check off method', () => {
    emitter.off('auth:login')
    emitter.off('auth:login', (payload) => {
      expectTypeOf(payload).toMatchTypeOf<{ userId: string }>()
    })
    emitter.off('*')
    emitter.off('*', () => {})

    // @ts-expect-error - Invalid event
    emitter.off('invalid', () => {})
  })

  it('should type check once method', () => {
    emitter.once('auth:login', (payload) => {
      expectTypeOf(payload).toMatchTypeOf<{ userId: string }>()
    })

    // @ts-expect-error - Invalid event
    emitter.once('invalid', () => {})

    // @ts-expect-error - Wildcard not supported in once
    emitter.once('*', () => {})
  })

  it('should type check namespace', () => {
    const authNamespace = emitter.namespace('auth')

    authNamespace.on('login', (payload) => {
      expectTypeOf(payload).toMatchTypeOf<{ userId: string }>()
    })

    authNamespace.on('logout', (payload) => {
      expectTypeOf(payload).toMatchTypeOf<void>()
    })

    authNamespace.emit('login', { userId: '123' })

    // @ts-expect-error - Events from other namespaces should not be accessible
    authNamespace.on('data:update', () => {})

    // @ts-expect-error - Original event name with namespace prefix should not work
    authNamespace.on('auth:login', () => {})

    // @ts-expect-error - Invalid event in this namespace
    authNamespace.emit('invalid', {})

    authNamespace.on('*', (event, payload) => {
      expectTypeOf(event).toMatchTypeOf<'login' | 'logout'>()
      expectTypeOf(payload).toMatchTypeOf<{ userId: string } | void>()
    })
  })

  it('should type check nested namespaces', () => {
    const systemNamespace = emitter.namespace('system')

    const monitorNamespace = systemNamespace.namespace('monitor')

    monitorNamespace.on('cpu', (payload) => {
      expectTypeOf(payload).toMatchTypeOf<{ usage: number }>()
    })

    monitorNamespace.on('memory', (payload) => {
      expectTypeOf(payload).toMatchTypeOf<{ usage: number }>()
    })

    monitorNamespace.emit('cpu', { usage: 0.5 })

    // @ts-expect-error - Invalid event in this namespace
    monitorNamespace.emit('invalid', {})

    // @ts-expect-error - Original event name with namespace prefix should not work
    monitorNamespace.on('system:monitor:cpu', () => {})

    monitorNamespace.on('*', (event, payload) => {
      expectTypeOf(event).toMatchTypeOf<'cpu' | 'memory'>()
      expectTypeOf(payload).toMatchTypeOf<{ usage: number }>()
    })
  })
})
