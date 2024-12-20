import { createCoreEmitter } from '../../../../../src/emitters/core-emitter'
import { createNamespacedEmitter } from '../../../../../src/emitters/ns-emitter'
import type { NamespaceKeys } from '../../../../../src/types/ns'
import type { TestEvents } from '../../../../__fixtures__/events'
import { mockPayloads } from '../../../../__fixtures__/events'

export const createTestEmitter = <T extends NamespaceKeys<TestEvents>>(namespace: T) => {
  const baseEmitter = createCoreEmitter()
  return createNamespacedEmitter<TestEvents, T>(baseEmitter, namespace)
}

export { mockPayloads }
