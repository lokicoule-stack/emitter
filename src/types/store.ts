import type { EventType } from './events'
import type { WildcardPattern } from './wildcard'

export type Store = {
  listeners: Map<EventType, Set<Function>>
  wildcardListeners: Set<{
    pattern: WildcardPattern
    handler: Function
  }>
}
