import chalk from 'chalk'
import fs from 'fs/promises'
import { gzipSize } from 'gzip-size'
import path from 'path'
import prettyBytes from 'pretty-bytes'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MAX_SIZE = 2048

async function checkBundleSize() {
  const files = [
    { path: '../dist/index.js', name: 'Main Bundle' },
    { path: '../dist/types/main.js', name: 'Types Bundle' },
  ]

  console.log(chalk.bold('\nBundle Size Check:'))
  console.log('=================\n')

  let failed = false

  for (const file of files) {
    const filePath = path.join(__dirname, file.path)

    try {
      const content = await fs.readFile(filePath)
      const rawSize = content.length
      const gzippedSize = await gzipSize(content)

      const isOversize = rawSize > MAX_SIZE

      console.log(`${file.name}:`)
      console.log(`  Raw Size:      ${chalk[isOversize ? 'red' : 'green'](prettyBytes(rawSize))}`)
      console.log(`  Gzipped Size:  ${chalk.green(prettyBytes(gzippedSize))}`)

      if (isOversize) {
        console.log(chalk.red(`  ⚠️  Exceeds maximum size of ${prettyBytes(MAX_SIZE)}`))
        failed = true
      }

      console.log()
    } catch (error) {
      console.error(chalk.red(`Error checking ${file.name}:`), error)
      process.exit(1)
    }
  }

  if (failed) {
    console.error(chalk.red('\n❌ Bundle size check failed'))
    process.exit(1)
  } else {
    console.log(chalk.green('\n✅ Bundle size check passed'))
  }
}

checkBundleSize().catch((error) => {
  console.error('Script failed:', error)
  process.exit(1)
})
