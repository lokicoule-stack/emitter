import { createEmitter } from '../dist/index.js'

type TestEvents = {
  'test:event': { message: string }
  'data:update': { id: number; value: any }
}

function validateBuild() {
  try {
    const emitter = createEmitter<TestEvents>()

    emitter.$on('test:event', ({ message }) => {
      console.log('Received message:', message)
    })

    emitter.test.$emit('event', { message: 'Build validation successful!' })

    console.log('✅ Build validation passed')
    process.exit(0)
  } catch (error) {
    console.error('❌ Build validation failed:', error)
    process.exit(1)
  }
}

validateBuild()
