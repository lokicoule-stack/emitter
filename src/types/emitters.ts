import type { EventKey, EventMap, EventPayload, EventType, ValidEventKey } from './events'
import type { ValidHandler } from './handlers'
import type { IsUnknown } from './helpers'
import type { FilterEventsByNamespace, NamespaceKeys } from './ns'

/**
 * Base interface for internal event emitter operations
 */
export interface UnsafeEventEmitter {
  on(event: EventType, handler: Function): () => void
  once(event: EventType, handler: Function): void
  off(event: EventType, handler?: Function): void
  emit(event: EventType, payload?: unknown): void
}

/**
 * Core public API for event emitting
 */
export interface BaseEmitter<TEvents extends EventMap> {
  $on<E extends EventKey<TEvents> | '*'>(
    event: ValidEventKey<TEvents, E & EventType>,
    handler: ValidHandler<TEvents, E & EventType>,
  ): () => void

  $once<E extends EventKey<TEvents>>(
    event: ValidEventKey<TEvents, E & EventType>,
    handler: ValidHandler<TEvents, E & EventType>,
  ): void

  $off<E extends EventKey<TEvents> | '*'>(
    event: ValidEventKey<TEvents, E & EventType>,
    handler?: ValidHandler<TEvents, E & EventType>,
  ): void

  $emit<E extends keyof TEvents & EventType>(event: E, payload: EventPayload<TEvents, E>): void
  $emit<E extends keyof TEvents & EventType>(
    event: IsUnknown<TEvents[E]> extends true ? E : never,
  ): void
}

/**
 * Extends BaseEmitter with namespace capabilities
 */
export interface EventEmitter<TEvents extends EventMap> extends BaseEmitter<TEvents> {
  $ns<N extends NamespaceKeys<TEvents>>(ns: N): EventEmitter<FilterEventsByNamespace<TEvents, N>>
}

/**
 * Full type including recursive namespace structure
 */
export type NamespaceTree<TEvents extends EventMap> = EventEmitter<TEvents> & {
  [K in NamespaceKeys<TEvents>]: NamespaceTree<FilterEventsByNamespace<TEvents, K>>
}
