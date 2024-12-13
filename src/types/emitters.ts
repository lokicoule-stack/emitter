import type { EventKey, EventMap, EventPayload, EventType, ValidEventKey } from './events'
import type { ValidHandler, WildcardHandler } from './handlers'
import type { IsUnknown } from './helpers'
import type { FilterEventsByNamespace, NamespaceKeys } from './ns'
import type { GlobalWildcard, NamespaceWildcard, WildcardPatterns } from './wildcard'

/**
 * Core implementation interface without type safety
 */
export interface CoreEmitter {
  on(event: EventType, handler: Function): () => void
  once(event: EventType, handler: Function): void
  off(event: EventType, handler?: Function): void
  emit(event: EventType, payload?: unknown): void
}

/**
 * Type-safe event emitter interface with namespace support
 */
export interface TypedEmitter<TEvents extends EventMap> {
  $on<E extends EventKey<TEvents> | WildcardPatterns<TEvents>>(
    event: E,
    handler: E extends GlobalWildcard
      ? WildcardHandler<TEvents>
      : E extends NamespaceWildcard<infer NS>
        ? WildcardHandler<FilterEventsByNamespace<TEvents, NS>>
        : ValidHandler<TEvents, E & keyof TEvents & string>,
  ): () => void

  $once<E extends EventKey<TEvents>>(
    event: ValidEventKey<TEvents, E & EventType>,
    handler: ValidHandler<TEvents, E & EventType>,
  ): void

  $off<E extends EventKey<TEvents> | WildcardPatterns<TEvents>>(
    event: E,
    handler?: E extends GlobalWildcard
      ? WildcardHandler<TEvents>
      : E extends NamespaceWildcard<infer NS>
        ? WildcardHandler<FilterEventsByNamespace<TEvents, NS>>
        : ValidHandler<TEvents, E & keyof TEvents & string>,
  ): void

  $emit<E extends keyof TEvents & EventType>(event: E, payload: EventPayload<TEvents, E>): void
  $emit<E extends keyof TEvents & EventType>(
    event: IsUnknown<TEvents[E]> extends true ? E : never,
  ): void

  $ns<N extends NamespaceKeys<TEvents>>(ns: N): TypedEmitter<FilterEventsByNamespace<TEvents, N>>
}

/**
 * Complete event emitter type with method and property-based namespace access
 */
export type EventEmitter<TEvents extends EventMap> = TypedEmitter<TEvents> & {
  [K in NamespaceKeys<TEvents>]: EventEmitter<FilterEventsByNamespace<TEvents, K>>
}
