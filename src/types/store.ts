import type { EventType, WildcardPattern } from './events'

export type Store = {
  listeners: Map<EventType, Set<Function>>
  wildcardListeners: Set<{
    pattern: WildcardPattern
    handler: Function
  }>
}
