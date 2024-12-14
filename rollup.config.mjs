import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

const terserOptions = {
  compress: {
    ecma: 2023,
    module: true,
    passes: 3,
    pure_getters: true,
    keep_fnames: true,
    keep_classnames: true,
  },
  mangle: {
    module: true,
    keep_fnames: true,
    keep_classnames: true,
  },
  format: {
    comments: false,
    ecma: 2023,
  },
}

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: true,
      plugins: [terser(terserOptions)],
    },
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
      }),
    ],
  },
  {
    input: 'src/types/main.ts',
    output: {
      file: 'dist/types/main.js',
      format: 'esm',
      sourcemap: true,
      plugins: [terser(terserOptions)],
    },
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
  },
  {
    input: 'src/types/main.ts',
    output: {
      file: 'dist/types/main.d.ts',
      format: 'esm',
    },
    plugins: [dts({ respectExternal: true })],
  },
]
