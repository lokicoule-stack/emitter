# @lokiverse/emitter

Type-safe event emitter for TypeScript.

[![npm version](https://img.shields.io/npm/v/@lokiverse/emitter.svg)](https://www.npmjs.com/package/@lokiverse/emitter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![codecov](https://codecov.io/gh/lokicoule-stack/emitter/branch/main/graph/badge.svg)](https://codecov.io/gh/lokicoule-stack/emitter)

## Install

```bash
npm install @lokiverse/emitter
```

## Usage

```typescript
import { createEmitter } from '@lokiverse/emitter'

type Events = {
  'user:login': { id: string }
  'user:logout': { id: string }
}

const emitter = createEmitter<Events>()

emitter.user.$on('login', ({ id }) => {
  console.log(`User ${id} logged in`)
})

emitter.user.$emit('login', { id: '123' })
```

## Features

- Full TypeScript support
- Namespace-based event organization
- Wildcard listeners
- Zero dependencies
- Small bundle size

## API

### createEmitter<T>()

Creates a new emitter instance.

### .$on(event, handler)

Subscribe to an event.

### .$once(event, handler)

Subscribe to an event once.

### .$off(event, handler)

Unsubscribe from an event.

### .$emit(event, data)

Emit an event.

### .$ns(namespace)

Get a namespace emitter.

### Wildcards

```typescript
// Listen to all events in a namespace
emitter.user.$on('*', (event, data) => {
  console.log(event, data)
})

// Listen to all events matching a pattern
emitter.$on('user:*', (event, data) => {
  console.log(event, data)
})
```

## License

MIT
