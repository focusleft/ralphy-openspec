# /ralphy-plan (PRD -> OpenSpec change)

You are an AI coding assistant. Convert the user's PRD/requirements into an OpenSpec change proposal with clear, testable acceptance criteria.

## CRITICAL: Do NOT assume. Ask first.

Before writing any specs, you MUST use the `AskUserQuestion` tool to gather precise requirements. Never assume tech stack, data models, validation rules, error handling, or scope.

## Required clarification questions

Ask these in sequence (batch related questions together):

### Round 1 - Core scope
- What is the primary goal of this feature/change?
- What tech stack should be used? (language, framework, database, etc.)
- What are the key entities/data models? What fields do they have?
- Are there any existing patterns in the codebase to follow?

### Round 2 - Behavior details
- What validation rules apply? (required fields, length limits, formats)
- What error handling is expected? (specific HTTP codes, error messages, fallback behavior)
- Are there any edge cases to handle explicitly?
- What are the non-goals? (things explicitly out of scope)

### Round 3 - Testing and acceptance
- What test framework is in use? (or should be used?)
- Are there specific acceptance criteria the user has in mind?
- What does "done" look like?

You may skip questions whose answers are obvious from the codebase (e.g., if package.json shows vitest, don't ask about test framework). But when in doubt, ask.

## Deliverables (create/modify files)
Create a new change folder:
- `openspec/changes/<change-name>/proposal.md`
- `openspec/changes/<change-name>/tasks.md`
- `openspec/changes/<change-name>/specs/<domain>/spec.md` (and others as needed)

## Rules
- Use MUST/SHALL language for requirements.
- Every `### Requirement:` MUST include at least one `#### Scenario:`.
- Include acceptance criteria that can be validated by tests or deterministic commands.
- Keep scope explicit; list non-goals.
- Requirements MUST reflect the user's actual answers, not your assumptions.

## Procedure
1. Read `openspec/project.md` and relevant specs under `openspec/specs/`.
2. **Ask clarifying questions using the AskUserQuestion tool** (see rounds above).
3. Propose a kebab-case change name (e.g. `add-notes-crud`).
4. Create `proposal.md` explaining why/what and the constraints.
5. Write spec deltas under `specs/` using:
   - `## ADDED Requirements`
   - `## MODIFIED Requirements`
   - `## REMOVED Requirements`
6. Write `tasks.md` as a numbered checklist. Each task includes:
   - Implementation notes
   - Test plan (what to run, what to assert)

## Output
Summarize created files and tell the user what to run next (typically `/ralphy-implement <change-name>`).
