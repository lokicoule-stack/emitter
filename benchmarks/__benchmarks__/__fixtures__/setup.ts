import EventEmitter3 from 'eventemitter3'
import EventEmitter from 'events'
import mitt from 'mitt'
import { createEmitter } from '../../../src/index'

export const TEST_PAYLOAD = { port: 3000 }
export const ITERATIONS = 10000
export const HANDLERS_COUNT = 100

export const createPayload = (size: number) => ({
  data: 'x'.repeat(size),
  timestamp: Date.now(),
})

export const emitters = {
  lokiverse: createEmitter(),
  nodejs: new EventEmitter(),
  eventemitter3: new EventEmitter3(),
  mitt: mitt(),
}
