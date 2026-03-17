# ralphy-spec

**Spec-driven AI development for Claude Code.** Combines OpenSpec + Ralph Loop for predictable, iterative AI-assisted coding.

## Quick Start

```bash
npx ralphy-spec init --tools claude-code
```

This creates skill commands in `.claude/commands/` and the OpenSpec scaffold in your project.

## Commands

| Skill Command | What it does |
|---|---|
| `/ralphy-plan` | Gather requirements interactively, then create specs |
| `/ralphy-implement` | Build iteratively from specs |
| `/ralphy-validate` | Verify acceptance criteria and tests |
| `/ralphy-archive` | Complete and archive the change |

## Example: Build a Note-Taking App (CRUD)

### Step 1 - Plan

```
You: /ralphy-plan Build a note-taking app with CRUD operations
```

The planner will **ask you clarifying questions** before writing any specs:

- What tech stack? (e.g., Node.js + Express + SQLite, or React + REST API)
- What fields does a note have? (title, body, tags, timestamps?)
- What storage backend? (SQLite, PostgreSQL, in-memory?)
- Do you need authentication?
- What validation rules? (max title length, required fields?)
- What error handling behavior? (404 for missing notes, 400 for bad input?)

Once you answer, it creates precise specs under `openspec/changes/add-notes-crud/`.

### Step 2 - Implement

```
You: /ralphy-implement add-notes-crud
```

The AI implements each task from the spec: models, routes, validation, tests. It runs tests after each change and self-corrects until green.

### Step 3 - Validate

```
You: /ralphy-validate
```

Runs all acceptance criteria from the specs. Reports what passes, what fails, and what's missing.

### Step 4 - Archive

```
You: /ralphy-archive add-notes-crud
```

Moves the completed change to `openspec/archive/` and updates the canonical specs.

## What Gets Created

```
.claude/commands/           # Skill commands for Claude Code
  ralphy-plan.md
  ralphy-implement.md
  ralphy-validate.md
  ralphy-archive.md

openspec/
  specs/                    # Source of truth (current behavior)
  changes/                  # Active work
  archive/                  # Completed changes
  project.md                # Project context

ralphy-spec/                # Local state and artifacts
  state.db
  STATUS.md
  TASKS.md
  BUDGET.md
  runs/
  logs/
```

## How It Works

**OpenSpec:** Specs before code. The planner asks targeted questions to build structured specifications with testable acceptance criteria -- no assumptions.

**Ralph Loop:** The AI receives the same prompt repeatedly until task completion. Each iteration, it sees previous work in files and self-corrects.

| Problem | Solution |
|---|---|
| Vague requirements | Planner asks clarifying questions first |
| AI guesses wrong | Specs lock intent before coding starts |
| AI stops mid-task | Loop retries until done |
| No way to verify | Tests validate output |

## Installation

```bash
# npx (recommended)
npx ralphy-spec init --tools claude-code

# Global install
npm install -g ralphy-spec
ralphy-spec init --tools claude-code

# With force overwrite
ralphy-spec init --tools claude-code --force
```

## Credits

Built on the work of:

- **[Ralph Methodology](https://ghuntley.com/ralph)** by Geoffrey Huntley
- **[opencode-ralph-wiggum](https://github.com/Th0rgal/opencode-ralph-wiggum)** by @Th0rgal
- **[OpenSpec](https://github.com/Fission-AI/OpenSpec)** by Fission-AI

## License

BSD-3-Clause
