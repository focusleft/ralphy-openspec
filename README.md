# ralphy-spec

**Spec-driven AI development for Claude Code.** Combines OpenSpec + Ralph Loop for predictable, iterative AI-assisted coding.

## Create a New Project (One Command)

```bash
git clone https://github.com/focusleft/ralphy-openspec.git
./ralphy-openspec/create-project.sh my-notes-app
```

That's it. The script:

1. Checks prerequisites (git, Node.js >= 20, npm)
2. Builds ralphy-spec and links the CLI globally
3. Creates `my-notes-app/` with git + npm initialized
4. Runs `ralphy-spec init` (copies skill commands to `.claude/commands/`)
5. Sets up `.gitignore` and makes the first commit

When it finishes you'll see:

```
Done! Your project is ready.

  cd my-notes-app
  claude

Inside Claude Code, use these commands:

  /ralphy-plan          Plan a feature (asks you questions first)
  /ralphy-implement     Build it from the spec
  /ralphy-validate      Verify acceptance criteria
  /ralphy-archive       Archive completed work
```

### What the script creates

```
my-notes-app/                    # Your new project (independent git repo)
├── .claude/commands/            # Skill commands (auto-installed)
│   ├── ralphy-plan.md           #   /ralphy-plan
│   ├── ralphy-implement.md      #   /ralphy-implement
│   ├── ralphy-validate.md       #   /ralphy-validate
│   └── ralphy-archive.md        #   /ralphy-archive
├── openspec/
│   ├── project.md               # Fill in your stack here
│   ├── project.yml              # Config
│   ├── specs/                   # Source of truth
│   ├── changes/                 # Active work
│   └── archive/                 # Completed changes
├── ralphy-spec/                 # Local state + artifacts
│   ├── config.json
│   ├── STATUS.md
│   ├── TASKS.md
│   └── BUDGET.md
├── .gitignore
└── package.json
```

## Manual Setup (if you prefer)

<details>
<summary>Click to expand step-by-step instructions</summary>

```bash
# 1. Create project
mkdir my-notes-app && cd my-notes-app
git init && npm init -y

# 2. Scaffold
npx ralphy-spec init --tools claude-code

# 3. Add .gitignore
cat <<'EOF' > .gitignore
node_modules/
ralphy-spec/state.db
ralphy-spec/runs/
ralphy-spec/logs/
ralphy-spec/worktrees/
EOF

# 4. Fill in openspec/project.md with your stack

# 5. Commit
git add . && git commit -m "Initial project setup with ralphy-spec"

# 6. Open Claude Code
claude
```

</details>

## Workflow: Build a Note-Taking App (CRUD)

Open your project in Claude Code and follow these steps:

### Step 1 -- Plan

```
/ralphy-plan Build a note-taking app with CRUD operations
```

The planner **asks you clarifying questions** before writing any specs:

- What fields does a note have? (title, body, tags, timestamps?)
- What storage backend? (SQLite, PostgreSQL, in-memory?)
- Do you need authentication?
- What validation rules? (max title length, required fields?)
- What error handling behavior? (404 for missing notes, 400 for bad input?)

After you answer, it creates precise specs under `openspec/changes/add-notes-crud/`.

### Step 2 -- Implement

```
/ralphy-implement add-notes-crud
```

Implements each task from the spec: models, routes, validation, tests. Runs tests after each change and self-corrects until green.

### Step 3 -- Validate

```
/ralphy-validate
```

Runs all acceptance criteria. Reports what passes, what fails, and what's missing.

### Step 4 -- Archive

```
/ralphy-archive add-notes-crud
```

Moves the completed change to `openspec/archive/` and updates the canonical specs.

### Step 5 -- Repeat

```
/ralphy-plan Add full-text search to notes
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

## CLI Reference

```bash
ralphy-spec init --tools claude-code          # Scaffold a new project
ralphy-spec init --tools claude-code --force  # Re-scaffold (overwrites)
ralphy-spec status                            # Show current run status
ralphy-spec budget --json                     # Show spend/budget
```

## Credits

Built on the work of:

- **[Ralph Methodology](https://ghuntley.com/ralph)** by Geoffrey Huntley
- **[opencode-ralph-wiggum](https://github.com/Th0rgal/opencode-ralph-wiggum)** by @Th0rgal
- **[OpenSpec](https://github.com/Fission-AI/OpenSpec)** by Fission-AI

## License

BSD-3-Clause
