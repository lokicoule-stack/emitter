export type TestEvents = {
  // flat event
  'build': { status: string }
  'run': { status: string }

  // namespaced events
  'cache:hit': { key: string; value: string }
  'cache:miss': { key: string }
  'cache:clear': {} // no payload
  'cache:reset': {}

  // namespaced events with ns equal to flat event name: 'build' and 'run'
  'build:success': { status: string }
  'build:fail': { status: string }
  'run:success': { status: string }
  'run:fail': { status: string }
}

export const mockPayloads = {
  build: { status: 'pending' },
  run: { status: 'running' },
  cacheHit: { key: 'test-key', value: 'test-value' },
  cacheMiss: { key: 'missing-key' },
  buildSuccess: { status: 'success' },
  buildFail: { status: 'failed' },
  runSuccess: { status: 'success' },
  runFail: { status: 'failed' },
} as const
