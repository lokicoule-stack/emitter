import type { EventKey, EventMap, EventType, ValidEventKey } from './events'

export type RegularHandler<T extends EventMap, K extends keyof T> = (payload: T[K]) => void

export type WildcardHandler<T extends EventMap> = (
  // NB: Flatten the union of all event keys in order to prettify the expected type in VSCode
  event: { [K in keyof T]: K }[keyof T],
  payload: T[keyof T],
) => void

export type EventHandler<T extends EventMap, K extends EventKey<T>> = K extends '*'
  ? WildcardHandler<T>
  : RegularHandler<T, K>

export type ValidHandler<TEvents extends EventMap, TKey extends EventType> =
  TKey extends ValidEventKey<TEvents, TKey> ? EventHandler<TEvents, TKey> : never
