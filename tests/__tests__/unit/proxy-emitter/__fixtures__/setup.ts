import { createCoreEmitter } from '../../../../../src/emitters/core-emitter'
import { createProxyEmitter } from '../../../../../src/emitters/proxy-emitter'
import { createTypedEmitter } from '../../../../../src/emitters/typed-emitter'
import type { TestEvents } from '../../../../__fixtures__/events'
import { mockPayloads } from '../../../../__fixtures__/events'

export const createTestEmitter = () => {
  return createProxyEmitter<TestEvents>(createTypedEmitter(createCoreEmitter()))
}

export { mockPayloads }
