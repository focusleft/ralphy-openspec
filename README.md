# ralphy-spec

**Spec-driven AI development for Claude Code.** Combines OpenSpec + Ralph Loop for predictable, iterative AI-assisted coding.

## Create a New Project (Step by Step)

These steps create a brand new project from scratch. The new project is its own git repo -- completely independent of ralphy-spec.

### 1. Create the project folder and initialize it

```bash
mkdir my-notes-app
cd my-notes-app
git init
npm init -y
```

### 2. Scaffold ralphy-spec

```bash
npx ralphy-spec init --tools claude-code
```

This creates everything you need:

```
my-notes-app/
├── .claude/commands/        # Skill commands (auto-installed)
│   ├── ralphy-plan.md       #   /ralphy-plan
│   ├── ralphy-implement.md  #   /ralphy-implement
│   ├── ralphy-validate.md   #   /ralphy-validate
│   └── ralphy-archive.md    #   /ralphy-archive
├── openspec/
│   ├── project.md           # Describe your stack here
│   ├── project.yml          # Config
│   ├── specs/               # Source of truth
│   ├── changes/             # Active work
│   └── archive/             # Completed changes
├── ralphy-spec/             # Local state + artifacts
│   ├── config.json
│   ├── STATUS.md
│   ├── TASKS.md
│   ├── BUDGET.md
│   └── ...
└── package.json
```

### 3. Fill in your project context

Open `openspec/project.md` and describe your stack:

```markdown
# Project Context

## Stack
- Language: TypeScript
- Framework: Express
- Database: SQLite
- Package manager: npm

## Conventions
- Code style: ESLint + Prettier
- Testing: Vitest
- CI: GitHub Actions
```

### 4. Add a `.gitignore`

```bash
cat <<'EOF' > .gitignore
node_modules/
ralphy-spec/state.db
ralphy-spec/runs/
ralphy-spec/logs/
ralphy-spec/worktrees/
EOF
```

### 5. Make your first commit

```bash
git add .
git commit -m "Initial project setup with ralphy-spec"
```

### 6. Open Claude Code and start building

```bash
claude
```

You now have four skill commands available. Use them in order:

## Workflow: Build a Note-Taking App (CRUD)

### Step 1 -- Plan

```
You: /ralphy-plan Build a note-taking app with CRUD operations
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
You: /ralphy-implement add-notes-crud
```

The AI implements each task from the spec: models, routes, validation, tests. It runs tests after each change and self-corrects until green.

### Step 3 -- Validate

```
You: /ralphy-validate
```

Runs all acceptance criteria from the specs. Reports what passes, what fails, and what's missing.

### Step 4 -- Archive

```
You: /ralphy-archive add-notes-crud
```

Moves the completed change to `openspec/archive/` and updates the canonical specs.

### Step 5 -- Repeat

Plan the next feature and repeat the cycle:

```
You: /ralphy-plan Add full-text search to notes
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
npx ralphy-spec init --tools claude-code   # Scaffold a new project
npx ralphy-spec init --tools claude-code --force  # Re-scaffold (overwrites)
ralphy-spec status                          # Show current run status
ralphy-spec budget --json                   # Show spend/budget
```

## Credits

Built on the work of:

- **[Ralph Methodology](https://ghuntley.com/ralph)** by Geoffrey Huntley
- **[opencode-ralph-wiggum](https://github.com/Th0rgal/opencode-ralph-wiggum)** by @Th0rgal
- **[OpenSpec](https://github.com/Fission-AI/OpenSpec)** by Fission-AI

## License

BSD-3-Clause
