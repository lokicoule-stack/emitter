import { createCoreEmitter } from '../../../../../src/emitters/core-emitter'
import { createNamespacedEmitter } from '../../../../../src/emitters/ns-emitter'
import type { TestEvents } from '../../../../__fixtures__/events'
import { mockPayloads } from '../../../../__fixtures__/events'

export const createCoreEmitterTest = () => {
  return createCoreEmitter()
}

export const createTestEmitter = <N extends 'build' | 'cache' | 'run'>(namespace: N) => {
  return createNamespacedEmitter<TestEvents, N>(createCoreEmitter(), namespace)
}

export { mockPayloads }
