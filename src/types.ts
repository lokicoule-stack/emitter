/**
 * Core types
 */
type BaseEvent = Record<string, unknown>

type ErrorEvent = BaseEvent & {
  error: Error
  source: string
  context?: unknown
}

export type EventMap<T extends BaseEvent = BaseEvent> = { error?: ErrorEvent } & T

/**
 * Event helpers
 */
type EventKey<T extends BaseEvent> = keyof T

type EventPayload<T extends BaseEvent, E extends EventKey<T>> = E extends keyof T ? T[E] : never

/**
 * Handlers
 */
export type RegularHandler<T extends EventMap, K extends keyof T> = (payload: T[K]) => void

export type WildcardHandler<T extends EventMap> = (
  // NB: Flatten the union of all event keys in order to prettify the expected type in VSCode
  event: { [K in keyof T]: K }[keyof T],
  payload: T[keyof T],
) => void

type EventHandler<T extends EventMap, K extends EventKey<T>> = K extends '*'
  ? WildcardHandler<T>
  : RegularHandler<T, K>

/**
 * Validation helpers
 */
type ValidEventKey<TEvents extends EventMap, TKey extends string> = TKey extends keyof TEvents
  ? TKey
  : TKey extends '*' | `${string}:*`
    ? TKey
    : never

type ValidHandler<TEvents extends EventMap, TKey extends string> =
  TKey extends ValidEventKey<TEvents, TKey> ? EventHandler<TEvents, TKey> : never

/**
 * Public interface
 */
export interface EventEmitter<TEvents extends EventMap> {
  on<E extends EventKey<TEvents> | '*'>(
    event: ValidEventKey<TEvents, E & string>,
    handler: ValidHandler<TEvents, E & string>,
  ): () => void

  once<E extends EventKey<TEvents>>(
    event: ValidEventKey<TEvents, E & string>,
    handler: ValidHandler<TEvents, E & string>,
  ): void

  off<E extends EventKey<TEvents> | '*'>(
    event: ValidEventKey<TEvents, E & string>,
    handler?: ValidHandler<TEvents, E & string>,
  ): void

  emit<E extends keyof TEvents>(event: E, payload: EventPayload<TEvents, E>): boolean
}
