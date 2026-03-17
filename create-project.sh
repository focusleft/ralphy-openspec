#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────────────────────
# create-project.sh — One-touch project setup using ralphy-spec
#
# Usage:
#   ./create-project.sh <project-name>
#
# What it does:
#   1. Checks prerequisites (git, node >= 20, npm)
#   2. Clones ralphy-spec, builds it, links the CLI globally
#   3. Creates a new project directory with the given name
#   4. Runs ralphy-spec init inside it (installs Claude Code skills)
#   5. Sets up .gitignore, initial commit — ready for Claude Code
# ─────────────────────────────────────────────────────────────

RALPHY_REPO="https://github.com/focusleft/ralphy-openspec.git"
RALPHY_CLONE_DIR="$HOME/.ralphy-spec-tool"
MIN_NODE_MAJOR=20

# ── Colors ───────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
NC='\033[0m' # No Color

info()  { echo -e "${GREEN}✓${NC} $1"; }
warn()  { echo -e "${YELLOW}⚠${NC} $1"; }
fail()  { echo -e "${RED}✗${NC} $1"; exit 1; }
step()  { echo -e "\n${BOLD}[$1/$TOTAL_STEPS] $2${NC}"; }

# ── Argument check ───────────────────────────────────────────
if [ $# -eq 0 ]; then
  echo ""
  echo "Usage: $0 <project-name>"
  echo ""
  echo "Example:"
  echo "  $0 my-notes-app"
  echo ""
  exit 1
fi

PROJECT_NAME="$1"
PROJECT_DIR="$(pwd)/$PROJECT_NAME"
TOTAL_STEPS=6

if [ -d "$PROJECT_DIR" ]; then
  fail "Directory '$PROJECT_NAME' already exists. Pick a different name or remove it first."
fi

echo ""
echo -e "${BOLD}Creating project: $PROJECT_NAME${NC}"
echo "Location: $PROJECT_DIR"
echo ""

# ── Step 1: Check prerequisites ─────────────────────────────
step 1 "Checking prerequisites"

# git
if ! command -v git &> /dev/null; then
  fail "git is not installed. Install it from https://git-scm.com"
fi
info "git $(git --version | awk '{print $3}')"

# node
if ! command -v node &> /dev/null; then
  fail "node is not installed. Install Node.js >= $MIN_NODE_MAJOR from https://nodejs.org"
fi
NODE_VERSION=$(node -v | sed 's/^v//')
NODE_MAJOR=$(echo "$NODE_VERSION" | cut -d. -f1)
if [ "$NODE_MAJOR" -lt "$MIN_NODE_MAJOR" ]; then
  fail "Node.js $NODE_VERSION is too old. Need >= $MIN_NODE_MAJOR. Update at https://nodejs.org"
fi
info "node $NODE_VERSION"

# npm
if ! command -v npm &> /dev/null; then
  fail "npm is not installed. It ships with Node.js — reinstall Node from https://nodejs.org"
fi
info "npm $(npm --version)"

# ── Step 2: Install ralphy-spec CLI ─────────────────────────
step 2 "Installing ralphy-spec CLI"

if command -v ralphy-spec &> /dev/null; then
  info "ralphy-spec already available ($(ralphy-spec --version 2>/dev/null || echo 'linked'))"
else
  if [ -d "$RALPHY_CLONE_DIR" ]; then
    warn "Updating existing clone at $RALPHY_CLONE_DIR"
    git -C "$RALPHY_CLONE_DIR" pull --quiet 2>/dev/null || true
  else
    echo "  Cloning ralphy-spec..."
    git clone --quiet "$RALPHY_REPO" "$RALPHY_CLONE_DIR"
  fi

  echo "  Installing dependencies..."
  (cd "$RALPHY_CLONE_DIR" && npm install --silent 2>/dev/null)

  echo "  Building..."
  (cd "$RALPHY_CLONE_DIR" && npm run build --silent 2>/dev/null)

  echo "  Linking CLI globally..."
  (cd "$RALPHY_CLONE_DIR" && npm link --silent 2>/dev/null)

  if ! command -v ralphy-spec &> /dev/null; then
    fail "npm link succeeded but 'ralphy-spec' command not found. Try: export PATH=\"\$(npm prefix -g)/bin:\$PATH\""
  fi
  info "ralphy-spec installed"
fi

# ── Step 3: Create project directory ────────────────────────
step 3 "Creating project: $PROJECT_NAME"

mkdir -p "$PROJECT_DIR"
(cd "$PROJECT_DIR" && git init --quiet)
(cd "$PROJECT_DIR" && npm init -y --silent 2>/dev/null)
info "Created $PROJECT_DIR with git + npm"

# ── Step 4: Scaffold with ralphy-spec ───────────────────────
step 4 "Running ralphy-spec init"

(cd "$PROJECT_DIR" && ralphy-spec init --tools claude-code)
info "Scaffolded .claude/commands/, openspec/, and ralphy-spec/"

# ── Step 5: Set up .gitignore ───────────────────────────────
step 5 "Setting up .gitignore"

cat > "$PROJECT_DIR/.gitignore" << 'GITIGNORE'
node_modules/

# ralphy-spec local state (don't commit)
ralphy-spec/state.db
ralphy-spec/runs/
ralphy-spec/logs/
ralphy-spec/worktrees/
GITIGNORE

info ".gitignore created"

# ── Step 6: Initial commit ──────────────────────────────────
step 6 "Making initial commit"

(cd "$PROJECT_DIR" && git add . && git commit --quiet -m "Initial project setup with ralphy-spec")
info "Committed"

# ── Done ─────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}${BOLD}Done!${NC} Your project is ready."
echo ""
echo "  cd $PROJECT_NAME"
echo "  claude"
echo ""
echo "Inside Claude Code, use these commands:"
echo ""
echo "  /ralphy-plan          Plan a feature (asks you questions first)"
echo "  /ralphy-implement     Build it from the spec"
echo "  /ralphy-validate      Verify acceptance criteria"
echo "  /ralphy-archive       Archive completed work"
echo ""
echo "Try it:"
echo ""
echo "  /ralphy-plan Build a note-taking app with CRUD operations"
echo ""
