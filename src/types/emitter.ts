import type { EventHandler, EventKey, EventMap, EventPayload } from './main'

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
 * Namespace
 */
type FilterEventsByNamespace<TEvents extends EventMap, N extends string> = {
  [K in keyof TEvents as K extends `${N}:${infer E}` ? E : never]: TEvents[K]
}

type NamespaceKeys<T extends EventMap> = {
  [K in keyof T]: K extends `${infer N}:${string}` ? N : never
}[keyof T]

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

  namespace<N extends NamespaceKeys<TEvents>>(
    ns: N,
  ): EventEmitter<FilterEventsByNamespace<TEvents, N>>
}
