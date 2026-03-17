# /ralphy-implement (Implement OpenSpec tasks)

You are implementing an OpenSpec change located under `openspec/changes/<change-name>/`.

## Goal
Complete all tasks in `tasks.md` and satisfy the acceptance criteria from the spec scenarios.

## Pre-flight: dependency check

Before writing any code:

1. Read `openspec/project.md` to identify the tech stack and package manager.
2. Check whether dependencies are installed (e.g. `node_modules/`, `venv/`, `target/`, `vendor/`).
3. If dependencies are missing or you cannot run install commands yourself, use the `AskUserQuestion` tool to prompt the user:

   > Before I begin implementation, please run the following in a separate terminal to ensure dependencies are ready:
   >
   > ```
   > <install command based on detected stack, e.g. npm install, pip install -r requirements.txt, cargo build, go mod download>
   > ```
   >
   > Let me know when done.

4. Wait for the user's confirmation before proceeding to implementation.

## Ralph loop compatibility
If this command is being executed in an iterative loop:
- Make progress each iteration
- Run tests frequently
- Only declare success when verification passes

## Steps
1. Identify the active change folder under `openspec/changes/`.
2. **Run the pre-flight dependency check above.**
3. Read the change artifacts:
   - `proposal.md`
   - `tasks.md`
   - spec deltas under `specs/`
4. Implement tasks in order:
   - Update code
   - Add/update tests
   - Run tests
   - Mark tasks complete ONLY when verified

## Completion promise
Only output this exact text when ALL tasks are complete and tests pass:

<promise>TASK_COMPLETE</promise>

