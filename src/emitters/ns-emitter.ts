import type { CoreEmitter, TypedEmitter } from '../types/emitters'
import type { EventMap } from '../types/events'
import type { FilterEventsByNamespace, NamespaceKeys } from '../types/ns'

export const createNamespacedEmitter = <TEvents extends EventMap, N extends NamespaceKeys<TEvents>>(
  coreEmitter: CoreEmitter,
  namespace: N,
): TypedEmitter<FilterEventsByNamespace<TEvents, N>> => {
  return {
    $on(event, handler) {
      return coreEmitter.on(`${namespace}:${event}`, handler)
    },

    $once(event, handler) {
      coreEmitter.once(`${namespace}:${event}`, handler)
    },

    $off(event, handler) {
      coreEmitter.off(`${namespace}:${event}`, handler)
    },

    $emit(event, payload?): void {
      coreEmitter.emit(`${namespace}:${event}`, payload)
    },

    $ns(childNamespace) {
      return createNamespacedEmitter(coreEmitter, `${namespace}:${childNamespace}` as any)
    },
  }
}
