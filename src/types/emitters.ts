import type { EventKey, EventMap, EventPayload, EventType, ValidEventKey } from './events'
import type { ValidHandler } from './handlers'
import type { FilterEventsByNamespace, NamespaceKeys } from './ns'

/**
 * Public interface
 */
export interface EventEmitter<TEvents extends EventMap> {
  on<E extends EventKey<TEvents> | '*'>(
    event: ValidEventKey<TEvents, E & EventType>,
    handler: ValidHandler<TEvents, E & EventType>,
  ): () => void

  once<E extends EventKey<TEvents>>(
    event: ValidEventKey<TEvents, E & EventType>,
    handler: ValidHandler<TEvents, E & EventType>,
  ): void

  off<E extends EventKey<TEvents> | '*'>(
    event: ValidEventKey<TEvents, E & EventType>,
    handler?: ValidHandler<TEvents, E & EventType>,
  ): void

  emit<E extends keyof TEvents & EventType>(event: E, payload: EventPayload<TEvents, E>): boolean

  namespace<N extends NamespaceKeys<TEvents>>(
    ns: N,
  ): EventEmitter<FilterEventsByNamespace<TEvents, N>>
}
