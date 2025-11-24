<div align="center">
  <img src="https://github.com/lokicoule-stack/emitter/blob/main/media/repo-header.svg?raw=true" alt="Lokiverse Emitter" />
</div>

<div align="center">

[![npm version](https://img.shields.io/npm/v/@lokiverse/emitter.svg)](https://www.npmjs.com/package/@lokiverse/emitter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![codecov](https://codecov.io/gh/lokicoule-stack/emitter/branch/main/graph/badge.svg)](https://codecov.io/gh/lokicoule-stack/emitter)

Type-safe event emitter for TypeScript.

</div>

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

```typescript
const emitter = createEmitter<Events>()
```

### Namespaces

Access namespaced events directly on the emitter:

```typescript
type Events = {
  'user:login': { id: string }
  'order:created': { orderId: string }
}

const emitter = createEmitter<Events>()

// Access namespace directly
emitter.user.$on('login', handler)
emitter.order.$on('created', handler)

// Or get a namespace reference
const userEvents = emitter.$ns('user')
userEvents.$on('login', handler)
```

### .$on(event, handler)

Subscribe to an event.

```typescript
emitter.user.$on('login', ({ id }) => {
  console.log(id)
})
```

### .$once(event, handler)

Subscribe to an event once.

```typescript
emitter.user.$once('login', ({ id }) => {
  console.log('First login:', id)
})
```

### .$off(event, handler)

Unsubscribe from an event.

```typescript
const handler = ({ id }) => console.log(id)
emitter.user.$on('login', handler)
emitter.user.$off('login', handler)
```

### .$emit(event, data)

Emit an event.

```typescript
emitter.user.$emit('login', { id: '123' })
```

### Wildcards

Listen to multiple events with wildcards:

```typescript
// All events in a namespace
emitter.user.$on('*', (event, data) => {
  console.log(event, data)
})

// All events matching a pattern
emitter.$on('user:*', (event, data) => {
  console.log(event, data)
})
```

## License

MIT
