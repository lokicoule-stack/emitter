import type { EventEmitter } from '../types/emitters'
import type { EventKey, EventMap, EventPayload, EventType, ValidEventKey } from '../types/events'
import type { ValidHandler } from '../types/handlers'
import type { FilterEventsByNamespace, NamespaceKeys } from '../types/ns'
import { createNSEmitter } from './ns-emitter'
import { createUnsafeEmitter } from './unsafe-emitter'

export const createSafeEmitter = <TEvents extends EventMap>() => {
  const unsafeEmitter = createUnsafeEmitter()

  const safeEmitter: EventEmitter<TEvents> = {
    on<E extends EventKey<TEvents> | '*'>(
      event: ValidEventKey<TEvents, E & EventType>,
      handler: ValidHandler<TEvents, E & EventType>,
    ) {
      return unsafeEmitter.on(event, handler)
    },

    once<E extends EventKey<TEvents>>(
      event: ValidEventKey<TEvents, E & EventType>,
      handler: ValidHandler<TEvents, E & EventType>,
    ) {
      unsafeEmitter.once(event, handler)
    },

    off<E extends EventKey<TEvents> | '*'>(
      event: ValidEventKey<TEvents, E & EventType>,
      handler?: ValidHandler<TEvents, E & EventType>,
    ) {
      unsafeEmitter.off(event, handler)
    },

    emit<E extends keyof TEvents & EventType>(event: E, payload: EventPayload<TEvents, E>) {
      return unsafeEmitter.emit(event, payload)
    },

    namespace<N extends NamespaceKeys<TEvents>>(
      ns: N,
    ): EventEmitter<FilterEventsByNamespace<TEvents, N>> {
      return createNSEmitter(unsafeEmitter, ns)
    },
  }

  return safeEmitter
}
