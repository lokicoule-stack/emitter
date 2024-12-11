import type { EventMap } from './events'

export type FilterEventsByNamespace<TEvents extends EventMap, N extends string> = {
  [K in keyof TEvents as K extends `${N}:${infer E}` ? E : never]: TEvents[K]
}

export type NamespaceKeys<T extends EventMap> = {
  [K in keyof T]: K extends `${infer N}:${string}` ? N : never
}[keyof T]
