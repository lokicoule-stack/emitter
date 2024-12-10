/**
 * Core types
 */
export type BaseEvent = Record<string, unknown>

export type ErrorEvent = BaseEvent & {
  error: Error
  source: string
  context?: unknown
}

export type EventMap<T extends BaseEvent = BaseEvent> = { error?: ErrorEvent } & T

/**
 * Event helpers
 */
export type EventKey<T extends BaseEvent> = keyof T

export type EventPayload<T extends BaseEvent, E extends EventKey<T>> = E extends keyof T
  ? T[E]
  : never

/**
 * Handlers
 */
export type RegularHandler<T extends EventMap, K extends keyof T> = (payload: T[K]) => void

export type WildcardHandler<T extends EventMap> = (
  // NB: Flatten the union of all event keys in order to prettify the expected type in VSCode
  event: { [K in keyof T]: K }[keyof T],
  payload: T[keyof T],
) => void

export type EventHandler<T extends EventMap, K extends EventKey<T>> = K extends '*'
  ? WildcardHandler<T>
  : RegularHandler<T, K>
