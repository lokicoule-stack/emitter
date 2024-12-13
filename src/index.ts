import { createCoreEmitter } from './emitters/core-emitter'
import { createProxyEmitter } from './emitters/proxy-emitter'
import { createTypedEmitter } from './emitters/typed-emitter'
import type { EventEmitter } from './types/emitters'
import type { EventMap } from './types/events'

/**
 * Creates a fully typed event emitter with namespace and wildcard support.
 *
 * @description
 * This function creates an event emitter that combines type safety with flexible event handling patterns.
 * It supports both namespace-based and wildcard event subscriptions while maintaining full type inference.
 *
 * @template TEvents - The event map type that defines the structure of events and their payloads
 *
 * @returns {EventEmitter<TEvents>} A typed event emitter instance with the following features:
 * - Namespace support for organized event grouping
 * - Wildcard pattern matching for flexible event handling
 * - Type-safe event emission and handling
 * - Method chaining support
 *
 * @example
 * ```typescript
 * interface MyEvents {
 *   'user:login': { userId: string }
 *   'user:logout': { userId: string }
 *   'system:error': { code: number; message: string }
 * }
 *
 * const emitter = createEmitter<MyEvents>()
 *
 * // Namespace-based event handling (recommended)
 * emitter.user.$on('login', ({ userId }) => console.log('User logged in:', userId))
 * emitter.user.$emit('login', { userId: '123' })
 *
 * // Wildcard pattern matching
 * emitter.user.$on('*', (event, payload) => console.log('User event:', event, payload))
 *
 * // Traditional flat approach (not recommended)
 * emitter.$on('user:login', handler)     // Works but prefer namespace approach
 * emitter.$on('user:*', handler)         // Wildcard for all user events
 * ```
 *
 * @remarks
 * The emitter implements different patterns for event handling:
 *
 * ```typescript
 * emitter.user.$on('login', handler)      // Type-safe namespace access
 * emitter.user.$on('*', handler)          // Type-safe namespace wildcard
 * emitter.on('user:login', handler)       // Clear namespace
 * emitter.on('user:*', handler)          // Clear namespace wildcard
 * ```
 *
 * @see {@link EventEmitter} for the complete API documentation
 * @see {@link EventMap} for event mapping type definition
 */
export const createEmitter = <TEvents extends EventMap>(): EventEmitter<TEvents> => {
  const coreEmitter = createCoreEmitter()
  const typed = createTypedEmitter<TEvents>(coreEmitter)
  return createProxyEmitter(typed)
}
