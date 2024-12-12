import { createNSEmitter } from '../../../../../src/emitters/ns-emitter'
import { createUnsafeEmitter } from '../../../../../src/emitters/unsafe-emitter'
import type { NamespaceKeys } from '../../../../../src/types/ns'
import type { TestEvents } from '../../../../__fixtures__/events'
import { mockPayloads } from '../../../../__fixtures__/events'

export const createTestEmitter = <T extends NamespaceKeys<TestEvents>>(namespace: T) => {
  const baseEmitter = createUnsafeEmitter()
  return createNSEmitter<TestEvents, T>(baseEmitter, namespace)
}

export { mockPayloads }
