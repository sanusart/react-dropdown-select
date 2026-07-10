import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.resolve(__dirname, '../src')
const targetDir = path.resolve(__dirname, './vendor/src')

function copyWithJsx(dir, targetBase) {
  if (!fs.existsSync(targetBase)) {
    fs.mkdirSync(targetBase, { recursive: true })
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const srcPath = path.join(dir, entry.name)
    const targetName = entry.isDirectory()
      ? entry.name
      : entry.name.replace(/\.js$/, '.jsx')
    const targetPath = path.join(targetBase, targetName)

    if (entry.isDirectory()) {
      copyWithJsx(srcPath, targetPath)
    } else if (entry.name.endsWith('.js')) {
      fs.copyFileSync(srcPath, targetPath)
    } else {
      fs.copyFileSync(srcPath, targetPath)
    }
  }
}

// Clean and copy
if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true })
}

copyWithJsx(srcDir, targetDir)
console.log('Copied src -> vendor/src with .js -> .jsx')
