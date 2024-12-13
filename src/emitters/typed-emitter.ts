import type { CoreEmitter, TypedEmitter } from '../types/emitters'
import type { EventMap } from '../types/events'
import { createNamespacedEmitter } from './ns-emitter'

export const createTypedEmitter = <TEvents extends EventMap>(
  coreEmitter: CoreEmitter,
): TypedEmitter<TEvents> => {
  return {
    $on(event, handler) {
      return coreEmitter.on(event, handler)
    },

    $once(event, handler) {
      coreEmitter.once(event, handler)
    },

    $off(event, handler) {
      coreEmitter.off(event, handler)
    },

    $emit(event, payload?) {
      coreEmitter.emit(event, payload)
    },

    $ns(namespace) {
      return createNamespacedEmitter(coreEmitter, namespace)
    },
  }
}
