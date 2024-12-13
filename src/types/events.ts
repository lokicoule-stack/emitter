export type EventType = string
export type WildcardPattern = '*' | `${string}:*`

export type BaseEvent = Record<EventType, unknown>

export type ErrorEvent = BaseEvent & {
  error: Error
  source: string
  context?: unknown
}

export type EventMap<T extends BaseEvent = BaseEvent> = { error?: ErrorEvent } & T

export type EventKey<T extends BaseEvent> = keyof T & EventType

export type EventPayload<T extends BaseEvent, E extends EventKey<T>> = E extends keyof T
  ? T[E]
  : never

export type ValidEventKey<
  TEvents extends EventMap,
  TKey extends EventType,
> = TKey extends keyof TEvents ? TKey : TKey extends WildcardPattern ? TKey : never
