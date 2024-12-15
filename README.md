<div align="center">
 <img src="https://github.com/lokicoule-stack/emitter/blob/main/media/repo-header.svg?raw=true" alt="Lokiverse Emitter" />
</div>

<div align="center">

[![npm version](https://img.shields.io/npm/v/@lokiverse/emitter.svg)](https://www.npmjs.com/package/@lokiverse/emitter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![codecov](https://codecov.io/gh/lokicoule-stack/emitter/branch/main/graph/badge.svg)](https://codecov.io/gh/lokicoule-stack/emitter)

</div>

<div align="center">
  <strong>
    TypeScript-first event emitter that doesn't make me question my life choices.
  </strong>
</div>

<br />

## The Good Parts

### TypeScript

```typescript
import { createEmitter } from '@lokiverse/emitter'

type Events = {
  'meeting:endless': { minutesWasted: number }
  'meeting:scheduled': { conflictsWithLunch: boolean }
  'meeting:cancelled': { excuseQuality: number }
}

const emitter = createEmitter<Events>()

// Your IDE actually knows what's going on
emitter.meeting.$on('endless', ({ minutesWasted }) => {
  if (minutesWasted < 60) {
    console.log('That was just a warm-up')
  }
  if (minutesWasted > 120) {
    console.log('Time to update the resume')
  }
})
```

## Features

- 🎯 **Actually Type-Safe**: Because `any` is just admitting defeat
- 🌳 **Proper Namespacing**: Not the "string prefix" kind of fake namespacing
- 🃏 **Wildcard Listeners**: Like RegEx, but without the therapy sessions
- 🚀 **Zero Dependencies**: No `node_modules` black hole
- 🤏 **Tiny Bundle**: Smaller than your last code review comments

## Installation

```bash
pnpm add @lokiverse/emitter
```

## Usage

### Basic Usage (That Actually Works)

```typescript
// Define events (with real types, not "documentation")
type GitEvents = {
  'commit:push': { message: string; boringLevels: number }
  'commit:revert': { excuse: string }
}

const git = createEmitter<GitEvents>()

// Your IDE is now your friend
git.commit.$on('push', ({ message, boringLevels }) => {
  if (message.includes('fix typo')) {
    console.log('Sure it was "just" a typo')
  }
})
```

### One-Time Events

```typescript
// For those "it worked on my machine" moments
git.commit.$once('revert', ({ excuse }) => {
  console.log(`Saving ${excuse} for future use`)
})
```

### Wildcard Magic

```typescript
// Catch all the things related to commits
git.commit.$on('*', (event, data) => {
  console.log(`Git did something: ${event}`, data)
  // Perfect for those "what just happened?" moments
})

// Use wildcards with namespaces as flat as earth
git.$on('commit:*', (event, data) => {
  console.log(`Revert or commit? That is the question: ${event}`, data)
})
```

### Namespace Like You Mean It

```typescript
// Split your concerns (unlike your PRs)
const commitEvents = git.$ns('commit')
commitEvents.$on('push', handlePush) // Clean and tidy
```

## Real World Examples (Because We All Copy-Paste)

### Error Handling

```typescript
type ErrorEvents = {
  'error:404': { url: string; lastSeenAlive: Date }
  'error:500': { stack: string; blame: string }
}

const emitter = createEmitter<ErrorEvents>()

emitter.error.$on('500', ({ stack, blame }) => {
  console.log(`Time to blame ${blame || 'the intern'}`)
})
```

### Feature Flags

```typescript
type FeatureEvents = {
  'feature:enabled': { name: string; whoToBlame: string }
  'feature:disabled': { name: string; excuses: string[] }
}

const emitter = createEmitter<FeatureEvents>()

emitter.feature.$on('enabled', ({ name, whoToBlame }) => {
  console.log(`${name} is now enabled. If it breaks, talk to ${whoToBlame}`)
})
```

## Contributing

Found a bug? Open an issue. Have a fix? PR welcome.

> Just remember: With great type safety comes great responsibility.

## License

MIT © [Lokiverse](./LICENSE)
