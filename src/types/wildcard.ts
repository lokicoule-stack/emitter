import type { EventMap } from './events'
import type { ExtractNamespace } from './ns'

export type GlobalWildcard = '*'
export type NamespaceWildcard<NS extends string> = `${NS}:*`
export type WildcardPattern = GlobalWildcard | NamespaceWildcard<string>
export type WildcardPatterns<TEvents extends EventMap> =
  | GlobalWildcard
  | NamespaceWildcard<ExtractNamespace<keyof TEvents & string>>
