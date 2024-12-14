import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        'node_modules/',
        'dist/',
        'coverage/**',
        'benchmarks/**',
        'scripts/**',
        '*.config.*',
        'src/types/**',
        'tests/**',
      ],
    },
    typecheck: {
      enabled: true,
      tsconfig: './tsconfig.test.json',
    },
  },
})
