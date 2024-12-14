import { describe, expect, it } from 'vitest'
import { createEmitter } from '../../../src'

describe('createEmitter', () => {
  type TestEvents = {
    'user:login': { userId: string }
    'user:logout': { userId: string }
    'system:error': { code: number; message: string }
  }

  it('should create an emitter with namespace support', () => {
    const emitter = createEmitter<TestEvents>()
    const loginPayload = { userId: '123' }
    let received = false

    emitter.user.$on('login', (payload) => {
      expect(payload).toEqual(loginPayload)
      received = true
    })

    emitter.user.$emit('login', loginPayload)
    expect(received).toBe(true)
  })

  it('should support wildcard pattern matching within namespace', () => {
    const emitter = createEmitter<TestEvents>()
    const events: Array<{ event: string; payload: any }> = []

    emitter.user.$on('*', (event, payload) => {
      events.push({ event, payload })
    })

    emitter.user.$emit('login', { userId: '123' })
    emitter.user.$emit('logout', { userId: '123' })

    expect(events).toHaveLength(2)
    expect(events[0]).toEqual({ event: 'user:login', payload: { userId: '123' } })
    expect(events[1]).toEqual({ event: 'user:logout', payload: { userId: '123' } })
  })

  it('should support traditional flat event pattern', () => {
    const emitter = createEmitter<TestEvents>()
    const received: any[] = []

    emitter.$on('user:login', (payload) => {
      received.push(payload)
    })

    const loginPayload = { userId: '123' }
    emitter.$emit('user:login', loginPayload)

    expect(received).toHaveLength(1)
    expect(received[0]).toEqual(loginPayload)
  })

  it('should support wildcard pattern matching in flat mode', () => {
    const emitter = createEmitter<TestEvents>()
    const events: Array<{ event: string; payload: any }> = []

    emitter.$on('user:*', (event, payload) => {
      events.push({ event, payload })
    })

    emitter.$emit('user:login', { userId: '123' })
    emitter.$emit('user:logout', { userId: '123' })

    expect(events).toHaveLength(2)
    expect(events[0]).toEqual({ event: 'user:login', payload: { userId: '123' } })
    expect(events[1]).toEqual({ event: 'user:logout', payload: { userId: '123' } })
  })

  it('should maintain type safety for event payloads', () => {
    const emitter = createEmitter<TestEvents>()

    emitter.system.$on('error', (payload) => {
      expect(payload).toHaveProperty('code')
      expect(payload).toHaveProperty('message')
    })

    const errorPayload = { code: 500, message: 'Internal Server Error' }
    emitter.system.$emit('error', errorPayload)
  })
})
