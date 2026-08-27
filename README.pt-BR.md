# super-mkt — Skill de Copywriting de Resposta Direta

*[English](README.md) · Português*

Skill portátil que transforma qualquer LLM em copywriter de resposta direta sênior:
análise estratégica antes da escrita, 15+ headlines por briefing, quebra de objeções,
frameworks (AIDA, PAS, BAB, QUEST, 4Ps, ACCA, StorySelling), estágios de consciência
de Eugene Schwartz e formatos prontos para Meta Ads, Google Ads, landing pages,
email, Instagram, LinkedIn, SEO e VSL.

**Sempre começa perguntando.** Nunca entrega copy no primeiro turno — faz o briefing antes
de escrever. Nunca inventa dados, depoimentos ou pesquisas.

As instruções da skill são em inglês; a copy que ela escreve segue o idioma do usuário.

## O que tem no pacote

```
skills/super-mkt/
├── SKILL.md              # núcleo: persona, método de 10 passos, headlines, revisão, autocrítica
└── references/
    ├── frameworks.md     # estruturas de persuasão, estágios de consciência, gatilhos, vieses
    ├── formats.md        # Meta Ads, Google Ads, landing page, email, Instagram, LinkedIn, SEO, VSL
    └── briefing.md       # 20 perguntas de briefing para quando falta informação do produto

dist/PROMPT.md            # tudo em um arquivo só, para harness sem sistema de arquivos
dist/super-mkt.zip
```

Dois formatos porque existem dois mundos: harness que lê arquivo sob demanda (carrega só
o que a tarefa pede, economiza contexto) e harness que só aceita um bloco de texto.

## Instalação

### npx (sem clone, funciona em qualquer lugar com Node)

```bash
npx super-mkt              # Claude Code, uso global (~/.claude/skills)
npx super-mkt --project    # só neste projeto (./.claude/skills)
npx super-mkt --cursor     # escreve .cursor/rules/super-mkt.mdc
npx super-mkt --dir pasta/ # qualquer pasta
npx super-mkt --print      # prompt de arquivo único no stdout
```

`--print` é a saída universal — jogue em qualquer harness:

```bash
npx super-mkt --print > system-prompt.md
npx super-mkt --print | xclip -selection clipboard
ollama run llama3 --system "$(npx -y super-mkt --print)"
```

Use `--force` para sobrescrever uma instalação existente.

### curl

```bash
curl -fsSL https://raw.githubusercontent.com/Bilusca/super-mkt-skill/main/install.sh | bash

# escopo de projeto, ou versão fixada
SCOPE=project bash -c "$(curl -fsSL https://raw.githubusercontent.com/Bilusca/super-mkt-skill/main/install.sh)"
REF=v1.0.0    bash -c "$(curl -fsSL https://raw.githubusercontent.com/Bilusca/super-mkt-skill/main/install.sh)"
```

### Marketplace de plugins do Claude Code

```
/plugin marketplace add Bilusca/super-mkt-skill
/plugin install super-mkt@super-mkt-marketplace
```

Atualizações chegam pelo `/plugin`, sem reinstalar.

### Claude Code, manual

```bash
git clone https://github.com/Bilusca/super-mkt-skill
cp -r super-mkt-skill/skills/super-mkt ~/.claude/skills/
```

Ativa sozinha quando o pedido é de copy. Ou chame direto: `/super-mkt`.

### Claude.ai / Claude Desktop

Settings → Capabilities → Skills → Upload skill → envie o `super-mkt.zip`
da [última release](https://github.com/Bilusca/super-mkt-skill/releases/latest).

### Cursor, Windsurf, Cline, Copilot

`npx super-mkt --cursor`, ou cole o `dist/PROMPT.md` em:

- Windsurf: `.windsurfrules`
- Cline: Custom Instructions
- Copilot: `.github/copilot-instructions.md`

### ChatGPT (Custom GPT ou Projects)

Custom GPT → Configure → Instructions: cole o `dist/PROMPT.md`.
Projects → instruções do projeto: mesmo conteúdo.

### API (Anthropic, OpenAI, Gemini, Ollama — qualquer uma)

Use o `dist/PROMPT.md` como system prompt.

```python
system = open("dist/PROMPT.md").read()
```

## Como usar

Dê todo o contexto que tiver. Ela pergunta o que faltar.

```
Preciso de copy para Meta Ads de um curso de inglês para
profissionais de TI. Ticket R$ 497. Público 25-40 anos,
já tentou Duolingo e desistiu. Garantia de 15 dias.
```

Saída: análise estratégica → 15 headlines com as 3 melhores justificadas → copy completa
no formato do canal → autocrítica com nota 0–10 e o que falta para chegar a 10.

## Editar e rebuildar

Edite `skills/super-mkt/SKILL.md` e `skills/super-mkt/references/*.md`, depois:

```bash
./build.sh
```

Regenera `dist/PROMPT.md` e `dist/super-mkt.zip`. Nunca edite `dist/` na mão.

Requer `zip` e `awk`.

Para publicar: crie a tag `vX.Y.Z` e dê push. A GitHub Action builda os artefatos,
anexa na release e publica no npm (precisa do secret `NPM_TOKEN`).

## Licença

MIT. Veja `LICENSE`.
