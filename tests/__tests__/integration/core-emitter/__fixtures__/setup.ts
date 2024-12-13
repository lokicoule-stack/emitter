import { createCoreEmitter } from '../../../../../src/emitters/core-emitter'
import { mockPayloads } from '../../../../__fixtures__/events'

export const createTestEmitter = () => {
  return createCoreEmitter()
}

export { mockPayloads }
