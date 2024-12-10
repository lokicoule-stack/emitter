import { describe, expectTypeOf, it, vitest } from 'vitest'
import type { EventEmitter } from './types'

describe('EventEmitter Type Tests', () => {
  const emitter = {
    on: vitest.fn<(...args: unknown[]) => () => void>(),
    once: vitest.fn<(...args: unknown[]) => void>(),
    off: vitest.fn<(...args: unknown[]) => void>(),
    emit: vitest.fn<(...args: unknown[]) => boolean>(),
  } as EventEmitter<MyEvents>

  type MyEvents = {
    'auth:login': { userId: string }
    'auth:logout': void
    'data:update': { data: unknown }
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
      expectTypeOf(event).toMatchTypeOf<'auth:login' | 'auth:logout' | 'data:update'>()
      expectTypeOf(payload).toMatchTypeOf<{ userId: string } | void | { data: unknown }>()
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
})
