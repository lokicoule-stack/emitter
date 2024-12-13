export type TestEvents = {
  // flat event
  'build': { status: string }
  'run': { status: string }

  // namespaced events
  'cache:hit': { key: string; value: string }
  'cache:miss': { key: string }
  'cache:clear': {} // no payload
  'cache:reset': void

  // namespaced events with ns equal to flat event name: 'build' and 'run'
  'build:success': { status: string }
  'build:fail': { status: string }
  'run:success': { status: string }
  'run:fail': { status: string }

  'server:start': { port: number }
  'server:stop': { code: number }
  'server:cache:hit': { key: string; value: string }
  'server:cache:miss': { key: string }
  'request:incoming': { method: string; url: string }
  'request:complete': { status: number; duration: number }
  'error:occurred': { message: string; code: string }

  // nested namespace
  'build:cache:hit': { key: string; value: string }
  'build:cache:miss': { key: string }
  'run:cache:hit': { key: string; value: string }
  'run:cache:miss': { key: string }
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
  buildCacheHit: { key: 'build-key', value: 'build-value' },
  buildCacheMiss: { key: 'build-missing-key' },
  runCacheHit: { key: 'run-key', value: 'run-value' },
  runCacheMiss: { key: 'run-missing-key' },
  serverStart: { port: 3000 },
  serverStop: { code: 0 },
  serverCacheHit: { key: 'server-key', value: 'server-value' },
  serverCacheMiss: { key: 'server-missing-key' },
} as const
