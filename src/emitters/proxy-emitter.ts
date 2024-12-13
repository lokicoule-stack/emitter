import type { EventEmitter, TypedEmitter } from '../types/emitters'
import type { EventMap } from '../types/events'
import type { NamespaceKeys } from '../types/ns'

export const createProxyEmitter = <TEvents extends EventMap>(
  emitter: TypedEmitter<TEvents>,
): EventEmitter<TEvents> => {
  const cache = new Map<string, EventEmitter<any>>()

  return new Proxy(emitter, {
    get(target, prop: string) {
      if (prop in target) {
        return target[prop as keyof typeof target]
      }

      if (!cache.has(prop)) {
        cache.set(prop, createProxyEmitter(target.$ns(prop as NamespaceKeys<TEvents>)))
      }

      return cache.get(prop)
    },
  }) as EventEmitter<TEvents>
}
