import { createSafeEmitter } from '../../../../../src/emitters/safe-emitter'
import type { TestEvents } from '../../../../__fixtures__/events'
import { mockPayloads } from '../../../../__fixtures__/events'

export const createTestEmitter = () => createSafeEmitter<TestEvents>()

export { mockPayloads }
export type { TestEvents }
