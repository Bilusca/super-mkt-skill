# Audit mode — scoring an existing piece

Use this when the user hands over copy that already exists: a page, a document, a URL, an ad, an email, a script.

## Getting the source

- **URL** — fetch it if the harness can browse. If it can't, say so plainly and ask the user to paste the text or run the fetch. Never audit a page you have not actually read; never guess at a site from its domain name.
- **File** — read it directly.
- **Pasted text** — audit as given.
- **Screenshot** — audit what is legible, and say which parts you could not read.

Audit what is in front of you. If a critical block is missing from the source (no pricing, no CTA visible, the page continues past the fold you were given), say so instead of inventing it.

## Context before scoring

Ask three short questions, then proceed:

1. What is this page or piece supposed to make someone do?
2. Who is the audience, and how aware are they of the problem and of you?
3. What does the current version do numerically — traffic, conversion rate, open rate, CPA — if they know?

If the user says to just audit it, adopt explicit assumptions, state them at the top of the report, and score against those.

## The ten dimensions

Score each 0–10. Weight matters: a 4 on Promise sinks the piece, a 4 on Scannability is a Tuesday fix.

| # | Dimension | What a 10 looks like |
|---|---|---|
| 1 | **Promise clarity** | A stranger reads the first screen and can say exactly what they get and for whom |
| 2 | **Hook / headline** | Stops the scroll on its own, without the rest of the page carrying it |
| 3 | **Audience fit & awareness stage** | The entry point matches what the reader already knows and believes |
| 4 | **Unique mechanism** | The "why this works when the others didn't" is named and specific |
| 5 | **Proof** | Concrete, verifiable, close to the claims it supports |
| 6 | **Objection handling** | The three biggest reasons to say no are addressed before they harden |
| 7 | **Offer** | Value, price, inclusions and guarantee are unambiguous and stacked in the right order |
| 8 | **CTA & friction** | One primary action, repeated at decision points, with the next step obvious |
| 9 | **Structure & scannability** | Hierarchy, rhythm, and blocks in conversion order |
| 10 | **Voice & anti-slop** | Sounds like a specific human, not like generated filler |

Overall score is a judgment call informed by the ten, not their arithmetic mean. Say so.

## Severity

- **Critical** — costs conversions on every visit. Fix before anything else.
- **High** — measurable drag, fix this week.
- **Medium** — worth fixing, not urgent.
- **Nit** — only if you're already in there.

Never pad a report with nits to look thorough.

## Report format

1. **Verdict** — one or two sentences and the overall score. Lead with the single thing that matters most.
2. **Scorecard** — table of the ten dimensions with scores and a five-word note each.
3. **What's working** — two to four bullets. Real ones. Do not invent praise, and do not skip this: the user needs to know what not to break.
4. **Findings, ordered by severity** — for each: the quoted excerpt, why it costs conversion, and a rewritten version. A finding without a rewrite is a complaint, not an audit.
5. **AI-slop flags** — every banned word or structure found, quoted, with replacements. Cross-reference the anti-slop list in SKILL.md.
6. **Priority plan** — the fixes split into "do today" (under an hour, no design or dev) and "structural" (needs a decision, a new asset, or engineering).
7. **Rewrite of the weakest critical block** — usually the headline or hero. Give the rewrite plus 5 alternatives.
8. **What to test next** — two or three A/B tests, each with the hypothesis and the metric that settles it.

## Rules

- Quote the actual text. An audit that paraphrases what it criticizes cannot be acted on.
- Every criticism ships with the fix.
- Score the copy, not the design — unless the layout is what breaks the reading order, in which case say that under Structure.
- If a claim in the copy looks unverifiable or legally risky, flag it. That is part of the audit, not a side note.
- Do not soften scores to be pleasant. A 5 reported as an 8 costs the user money.
- After the report, offer the rewrite: "want me to rebuild the page from this?"
