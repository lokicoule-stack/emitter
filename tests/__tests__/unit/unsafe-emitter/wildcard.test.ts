import { describe, expect, it, vi } from 'vitest'
import { createTestEmitter, mockPayloads } from './__fixtures__/setup'

describe('UnsafeEmitter Wildcard Listeners', () => {
  it('should receive all events', () => {
    const emitter = createTestEmitter()
    const wildcardHandler = vi.fn()

    emitter.on('*', wildcardHandler)
    emitter.emit('build', mockPayloads.build)
    emitter.emit('run', mockPayloads.run)

    expect(wildcardHandler).toHaveBeenCalledTimes(2)
    expect(wildcardHandler).toHaveBeenNthCalledWith(1, 'build', mockPayloads.build)
    expect(wildcardHandler).toHaveBeenNthCalledWith(2, 'run', mockPayloads.run)
  })
})
