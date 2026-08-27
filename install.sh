#!/usr/bin/env bash
# One-liner installer:
#   curl -fsSL https://raw.githubusercontent.com/bilusca/super-mkt/main/install.sh | bash
# Options (env vars):
#   SCOPE=project   install into ./.claude/skills instead of ~/.claude/skills
#   REF=v1.0.0      install a specific tag or branch (default: main)
set -euo pipefail

REPO="${REPO:-bilusca/super-mkt}"
REF="${REF:-main}"
SCOPE="${SCOPE:-user}"

if [ "$SCOPE" = "project" ]; then
  DEST="$PWD/.claude/skills"
else
  DEST="$HOME/.claude/skills"
fi

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "downloading $REPO@$REF ..."
curl -fsSL "https://codeload.github.com/$REPO/tar.gz/$REF" | tar -xz -C "$TMP"

SRC="$(find "$TMP" -type d -path '*/skills/super-mkt' -print -quit)"
[ -n "$SRC" ] || { echo "skill folder not found in the archive" >&2; exit 1; }

mkdir -p "$DEST"
rm -rf "$DEST/super-mkt"
cp -R "$SRC" "$DEST/super-mkt"

echo "installed: $DEST/super-mkt"
echo "restart Claude Code, then ask for copy or run /super-mkt"
