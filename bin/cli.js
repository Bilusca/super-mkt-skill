#!/usr/bin/env node
'use strict'

const fs = require('fs')
const os = require('os')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const SKILL_SRC = path.join(ROOT, 'skills', 'super-mkt')
const BUNDLE = path.join(ROOT, 'dist', 'PROMPT.md')
const NAME = 'super-mkt'

const HELP = `
  super-mkt — install the direct-response copywriting skill

  Usage
    npx super-mkt [target] [options]

  Targets
    (default)        install for Claude Code, user-wide (~/.claude/skills)
    --project        install into ./.claude/skills (this repo only)
    --cursor         write ./.cursor/rules/super-mkt.mdc
    --dir <path>     copy the skill folder into <path>
    --print          print the single-file prompt to stdout
    --where          print the packaged source paths and exit

  Options
    --force          overwrite an existing install
    -h, --help       this text

  Examples
    npx super-mkt
    npx super-mkt --project --force
    npx super-mkt --print > system-prompt.md
    npx super-mkt --print | pbcopy
`

function copyDir (src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name)
    const to = path.join(dest, entry.name)
    if (entry.isDirectory()) copyDir(from, to)
    else fs.copyFileSync(from, to)
  }
}

function installTo (dir, force) {
  const dest = path.join(dir, NAME)
  if (fs.existsSync(dest) && !force) {
    console.error(`already installed: ${dest}\nre-run with --force to overwrite`)
    process.exit(1)
  }
  fs.rmSync(dest, { recursive: true, force: true })
  copyDir(SKILL_SRC, dest)
  console.log(`installed: ${dest}`)
  console.log('restart Claude Code, then ask for copy or run /super-mkt')
}

function main (argv) {
  const has = f => argv.includes(f)
  if (has('-h') || has('--help')) return console.log(HELP)

  if (has('--where')) {
    console.log(SKILL_SRC)
    console.log(BUNDLE)
    return
  }

  if (has('--print')) return process.stdout.write(fs.readFileSync(BUNDLE, 'utf8'))

  const force = has('--force')

  if (has('--cursor')) {
    const dest = path.join(process.cwd(), '.cursor', 'rules', 'super-mkt.mdc')
    if (fs.existsSync(dest) && !force) {
      console.error(`already exists: ${dest}\nre-run with --force to overwrite`)
      process.exit(1)
    }
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    const body = fs.readFileSync(BUNDLE, 'utf8')
    fs.writeFileSync(dest, `---\ndescription: super-mkt — direct-response copywriting\nalwaysApply: false\n---\n\n${body}`)
    return console.log(`written: ${dest}`)
  }

  const dirFlag = argv.indexOf('--dir')
  if (dirFlag !== -1) {
    const dir = argv[dirFlag + 1]
    if (!dir) {
      console.error('--dir needs a path')
      process.exit(1)
    }
    return installTo(path.resolve(dir), force)
  }

  const base = has('--project')
    ? path.join(process.cwd(), '.claude', 'skills')
    : path.join(os.homedir(), '.claude', 'skills')

  installTo(base, force)
}

main(process.argv.slice(2))
