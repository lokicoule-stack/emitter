import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    benchmark: {
      include: ['**/*.bench.{js,ts}'],
      reporters: ['verbose'],
      /* outputJson: './benchmark-results.json',
      compare: './benchmark-results.json', */
    },
    typecheck: {
      enabled: false,
    },
  },
})
