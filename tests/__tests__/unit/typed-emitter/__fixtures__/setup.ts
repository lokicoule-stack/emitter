import { createCoreEmitter } from '../../../../../src/emitters/core-emitter'
import { createTypedEmitter } from '../../../../../src/emitters/typed-emitter'
import type { TestEvents } from '../../../../__fixtures__/events'
import { mockPayloads } from '../../../../__fixtures__/events'

export const createTestEmitter = () => createTypedEmitter<TestEvents>(createCoreEmitter())

export { mockPayloads }
export type { TestEvents }
