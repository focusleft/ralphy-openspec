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
TOTAL_STEPS=7

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

(cd "$PROJECT_DIR" && ralphy-spec init --tools claude-code) || warn "ralphy-spec init had issues — will copy skills manually"

# Ensure .claude/skills/ are present (copy from source templates as fallback)
SKILLS_SRC="$RALPHY_CLONE_DIR/src/templates/claude-code"
SKILLS_DST="$PROJECT_DIR/.claude/skills"
if [ -d "$SKILLS_SRC" ] && [ ! -f "$SKILLS_DST/ralphy-plan.md" ]; then
  mkdir -p "$SKILLS_DST"
  cp "$SKILLS_SRC"/*.md "$SKILLS_DST/"
  info "Copied Claude Code skills from source templates"
fi
info "Scaffolded .claude/skills/, openspec/, and ralphy-spec/"

# ── Step 5: Generate project README ──────────────────────────
step 5 "Generating README"

cat > "$PROJECT_DIR/README.md" << READMEEOF
# $PROJECT_NAME

Built with [ralphy-spec](https://github.com/focusleft/ralphy-openspec) — spec-driven AI development for Claude Code.

## Getting Started

Open this project in Claude Code:

\`\`\`bash
cd $PROJECT_NAME
claude
\`\`\`

## Skills

This project includes four Claude Code skills that drive the development workflow:

| Skill | What it does |
|---|---|
| \`/ralphy-plan\` | Converts a feature description into structured specs with testable acceptance criteria. Asks clarifying questions before writing anything. |
| \`/ralphy-implement\` | Implements all tasks from a spec. Runs tests after each change and self-corrects until green. |
| \`/ralphy-validate\` | Verifies the implementation against every acceptance criterion. Reports pass/fail/missing. |
| \`/ralphy-archive\` | Moves a completed change to the archive and updates canonical specs. |

## Workflow

### 1. Plan — define what to build

\`\`\`
/ralphy-plan Add user authentication with email and password
\`\`\`

The planner will ask you targeted questions (tech stack, data models, validation rules, edge cases) before generating any specs. Nothing is assumed.

**Using an external brief:** If you have a feature description in a file, pass it directly:

\`\`\`
/ralphy-plan @features/user-auth.md
\`\`\`

This is useful when requirements come from a product doc, design brief, or issue description. Create a \`features/\` folder and drop your markdown files there — the planner reads them and asks follow-up questions based on their content.

### 2. Implement — build it from the spec

\`\`\`
/ralphy-implement add-user-auth
\`\`\`

The implementer reads the tasks and specs generated in step 1, writes code and tests in order, and only marks a task complete when tests pass.

### 3. Validate — prove it works

\`\`\`
/ralphy-validate
\`\`\`

Runs every acceptance criterion from the spec scenarios. Outputs a clear report of what passed, what failed, and what tests are missing.

### 4. Archive — close it out

\`\`\`
/ralphy-archive add-user-auth
\`\`\`

Moves the completed change from \`openspec/changes/\` to \`openspec/archive/\` and updates the canonical specs.

Then start the next feature:

\`\`\`
/ralphy-plan @features/next-feature.md
\`\`\`

## Project Structure

\`\`\`
$PROJECT_NAME/
├── .claude/skills/              # Claude Code skills (drives the workflow)
│   ├── ralphy-plan.md           #   /ralphy-plan — planning & spec generation
│   ├── ralphy-implement.md      #   /ralphy-implement — code & test execution
│   ├── ralphy-validate.md       #   /ralphy-validate — acceptance verification
│   └── ralphy-archive.md        #   /ralphy-archive — change archival
├── openspec/                    # Specifications (source of truth)
│   ├── project.md               #   Your stack, conventions, architecture
│   ├── project.yml              #   Config (backend, workspace mode, validators)
│   ├── specs/                   #   Canonical specs (updated after each archive)
│   ├── changes/                 #   Active work (proposal + tasks + spec deltas)
│   └── archive/                 #   Completed changes (history)
├── ralphy-spec/                 # Local runtime state & artifacts
│   ├── config.json              #   Test command, completion settings
│   ├── STATUS.md                #   Current run status (auto-generated)
│   ├── TASKS.md                 #   Task progress (auto-generated)
│   └── BUDGET.md                #   Spend tracking (auto-generated)
├── features/                    #   (create this) Feature briefs for /ralphy-plan
├── .gitignore
├── package.json
└── README.md
\`\`\`

## Key Files to Review

### \`openspec/project.md\` — Project context (edit this first)

Describes your tech stack, coding conventions, and architecture. The planner reads this before generating specs so it matches your project's patterns. **Fill this in before running your first /ralphy-plan.**

### \`openspec/project.yml\` — Configuration

Controls which backend (cursor, claude-code, opencode), workspace mode, and validators are used. The defaults work out of the box.

### \`openspec/changes/<name>/proposal.md\` — Change proposal

Generated by \`/ralphy-plan\`. Contains the rationale, scope, constraints, and non-goals for a change. Review this to make sure the planner understood your intent before implementing.

### \`openspec/changes/<name>/tasks.md\` — Task checklist

Generated by \`/ralphy-plan\`. Ordered list of implementation tasks with test plans. The implementer works through these in sequence. Review to confirm priority and completeness.

### \`openspec/changes/<name>/specs/\` — Spec deltas

Generated by \`/ralphy-plan\`. Detailed requirements using MUST/SHALL language with testable scenarios. These are the acceptance criteria that \`/ralphy-validate\` checks against.

### \`ralphy-spec/config.json\` — Runtime config

Sets the test command (\`npm test\` by default) and completion signal. Update the test command if your project uses a different runner.

## Tips

- **Always fill in \`openspec/project.md\` first** — the better the context, the better the specs.
- **Review specs before implementing** — catch scope issues early by reading \`proposal.md\` and \`tasks.md\`.
- **Use external feature files** — keep requirements in \`features/*.md\` and pass them with \`@features/file.md\`.
- **Run validate before archive** — make sure everything passes before closing out a change.
- **Check STATUS.md and TASKS.md** — these are auto-generated and show current progress at a glance.
READMEEOF

info "README.md generated"

# ── Step 6: Set up .gitignore ───────────────────────────────
step 6 "Setting up .gitignore"

cat > "$PROJECT_DIR/.gitignore" << 'GITIGNORE'
node_modules/

# ralphy-spec local state (don't commit)
ralphy-spec/state.db
ralphy-spec/runs/
ralphy-spec/logs/
ralphy-spec/worktrees/
GITIGNORE

info ".gitignore created"

# ── Step 7: Initial commit ──────────────────────────────────
step 7 "Making initial commit"

(cd "$PROJECT_DIR" && git add . && git commit --quiet -m "Initial project setup with ralphy-spec")
info "Committed"

# ── Done ─────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}${BOLD}Done!${NC} Your project is ready."
echo ""
echo "  cd $PROJECT_NAME"
echo "  claude"
echo ""
echo "Inside Claude Code, use these skills:"
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
