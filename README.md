# super-mkt — Direct-Response Copywriting Skill

*English · [Português](README.pt-BR.md)*

A portable skill that turns any LLM into a senior direct-response copywriter:
strategic analysis before writing, 15+ headlines per brief, objection handling,
frameworks (AIDA, PAS, BAB, QUEST, 4Ps, ACCA, StorySelling), Eugene Schwartz's
stages of awareness, and ready-made formats for Meta Ads, Google Ads, landing
pages, email, Instagram, LinkedIn, SEO and VSLs.

**It always opens with questions.** No copy on the first turn, ever — it briefs you first,
then writes. It never invents data, testimonials or research.

Instructions are in English; the copy it writes follows the user's language.

## What's in the package

```
skills/super-mkt/
├── SKILL.md              # core: persona, 10-step method, headlines, review, self-critique
└── references/
    ├── frameworks.md     # persuasion structures, stages of awareness, triggers, biases
    ├── formats.md        # Meta Ads, Google Ads, landing page, email, Instagram, LinkedIn, SEO, VSL
    └── briefing.md       # 20 briefing questions for when product info is missing

dist/PROMPT.md            # everything in one file, for harnesses without a filesystem
dist/super-mkt.zip
```

Two formats because there are two worlds: harnesses that read files on demand (load
only what the task needs, saving context) and harnesses that accept a single block of text.

## Install

### npx (no clone, works anywhere Node runs)

```bash
npx super-mkt              # Claude Code, user-wide (~/.claude/skills)
npx super-mkt --project    # this project only (./.claude/skills)
npx super-mkt --cursor     # writes .cursor/rules/super-mkt.mdc
npx super-mkt --dir path/  # any folder
npx super-mkt --print      # single-file prompt to stdout
```

`--print` is the universal escape hatch — pipe it into any harness:

```bash
npx super-mkt --print > system-prompt.md
npx super-mkt --print | pbcopy
ollama run llama3 --system "$(npx -y super-mkt --print)"
```

Add `--force` to overwrite an existing install.

### curl

```bash
curl -fsSL https://raw.githubusercontent.com/Bilusca/super-mkt-skill/main/install.sh | bash

# project scope, or a pinned version
SCOPE=project bash -c "$(curl -fsSL https://raw.githubusercontent.com/Bilusca/super-mkt-skill/main/install.sh)"
REF=v1.0.0    bash -c "$(curl -fsSL https://raw.githubusercontent.com/Bilusca/super-mkt-skill/main/install.sh)"
```

### Claude Code plugin marketplace

```
/plugin marketplace add Bilusca/super-mkt-skill
/plugin install super-mkt@super-mkt-marketplace
```

Updates arrive through `/plugin`, no reinstall needed.

### Claude Code, manual

```bash
git clone https://github.com/Bilusca/super-mkt-skill
cp -r super-mkt-skill/skills/super-mkt ~/.claude/skills/
```

It activates on its own when the request is about copy. Or call it directly: `/super-mkt`.

### Claude.ai / Claude Desktop

Settings → Capabilities → Skills → Upload skill → pick `super-mkt.zip`
from the [latest release](https://github.com/Bilusca/super-mkt-skill/releases/latest).

### Cursor, Windsurf, Cline, Copilot

`npx super-mkt --cursor`, or paste `dist/PROMPT.md` into:

- Windsurf: `.windsurfrules`
- Cline: Custom Instructions
- Copilot: `.github/copilot-instructions.md`

### ChatGPT (Custom GPT or Projects)

Custom GPT → Configure → Instructions: paste `dist/PROMPT.md`.
Projects → project instructions: same content.

### API (Anthropic, OpenAI, Gemini, Ollama — any of them)

Use `dist/PROMPT.md` as the system prompt.

```python
system = open("dist/PROMPT.md").read()
```

## Usage

Give it all the context you have. It will ask for whatever is missing.

```
I need Meta Ads copy for an English course aimed at IT professionals.
Price $99. Audience 25-40, already tried Duolingo and quit.
15-day money-back guarantee.
```

Output: strategic analysis → 15 headlines with the top 3 justified → full copy in the
channel's format → self-critique scored 0–10 with what's needed to reach a 10.

## Editing and rebuilding

Edit `skills/super-mkt/SKILL.md` and `skills/super-mkt/references/*.md`, then:

```bash
./build.sh
```

This regenerates `dist/PROMPT.md` and `dist/super-mkt.zip`. Never hand-edit `dist/`.

Requires `zip` and `awk`.

Releasing: tag `vX.Y.Z` and push. The GitHub Action builds the artifacts,
attaches them to the release and publishes to npm (needs an `NPM_TOKEN` secret).

## License

MIT. See `LICENSE`.
