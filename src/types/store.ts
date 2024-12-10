import type { EventMap, RegularHandler, WildcardHandler } from './main'

export type EmitterStore<T extends EventMap> = {
  readonly handlers: Map<keyof T, Set<RegularHandler<T, keyof T>>>
  readonly wildcardHandlers: Set<WildcardHandler<T>>
  readonly onceHandlers: WeakMap<Function, Function>
}
