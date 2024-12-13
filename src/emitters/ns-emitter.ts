import type { EventEmitter, UnsafeEventEmitter } from '../types/emitters'
import type { EventKey, EventMap, EventPayload, ValidEventKey } from '../types/events'
import type { ValidHandler } from '../types/handlers'
import type { FilterEventsByNamespace, NamespaceKeys } from '../types/ns'

export const createNSEmitter = <TEvents extends EventMap, N extends NamespaceKeys<TEvents>>(
  baseEmitter: UnsafeEventEmitter,
  namespace: N,
): EventEmitter<FilterEventsByNamespace<TEvents, N>> => {
  return {
    $on<E extends EventKey<FilterEventsByNamespace<TEvents, N>> | '*'>(
      event: ValidEventKey<FilterEventsByNamespace<TEvents, N>, E & string>,
      handler: ValidHandler<FilterEventsByNamespace<TEvents, N>, E & string>,
    ) {
      return baseEmitter.on(`${namespace}:${event}`, handler)
    },

    $once<E extends EventKey<FilterEventsByNamespace<TEvents, N>>>(
      event: ValidEventKey<FilterEventsByNamespace<TEvents, N>, E & string>,
      handler: ValidHandler<FilterEventsByNamespace<TEvents, N>, E & string>,
    ) {
      baseEmitter.once(`${namespace}:${event}`, handler)
    },

    $off<E extends EventKey<FilterEventsByNamespace<TEvents, N>> | '*'>(
      event: ValidEventKey<FilterEventsByNamespace<TEvents, N>, E & string>,
      handler?: ValidHandler<FilterEventsByNamespace<TEvents, N>, E & string>,
    ) {
      baseEmitter.off(`${namespace}:${event}`, handler)
    },

    $emit<E extends keyof FilterEventsByNamespace<TEvents, N> & string>(
      event: E,
      payload?: EventPayload<FilterEventsByNamespace<TEvents, N>, E>,
    ) {
      return baseEmitter.emit(`${namespace}:${event}`, payload)
    },

    $ns<SubN extends NamespaceKeys<FilterEventsByNamespace<TEvents, N>>>(
      ns: SubN,
    ): EventEmitter<FilterEventsByNamespace<FilterEventsByNamespace<TEvents, N>, SubN>> {
      return createNSEmitter(baseEmitter, `${namespace}:${ns}` as any)
    },
  }
}
