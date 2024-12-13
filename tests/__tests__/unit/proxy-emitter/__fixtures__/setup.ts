import { createProxyEmitter } from '../../../../../src/emitters/proxy-emitter'
import type { TestEvents } from '../../../../__fixtures__/events'
import { mockPayloads } from '../../../../__fixtures__/events'

export const createTestEmitter = () => {
  return createProxyEmitter<TestEvents>()
}

export { mockPayloads }
