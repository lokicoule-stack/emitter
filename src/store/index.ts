import type { Store } from '../types/store'

export const createStore = (): Store => ({
  listeners: new Map(),
  wildcardListeners: new Set(),
})
