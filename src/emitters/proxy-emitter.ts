import type { EventEmitter, NamespaceTree } from '../types/emitters'
import type { EventMap } from '../types/events'
import type { NamespaceKeys } from '../types/ns'
import { createSafeEmitter } from './safe-emitter'

export const createProxyEmitter = <TEvents extends EventMap>(
  emitter: EventEmitter<TEvents> = createSafeEmitter<TEvents>(),
) => {
  const handler: ProxyHandler<EventEmitter<TEvents>> = {
    get(target, prop: string | symbol) {
      if (prop in target) {
        return target[prop as keyof typeof target]
      }

      if (typeof prop === 'string') {
        return createProxyEmitter(target.$ns(prop as NamespaceKeys<TEvents>))
      }

      return undefined
    },
  }

  return new Proxy(emitter, handler) as NamespaceTree<TEvents>
}
