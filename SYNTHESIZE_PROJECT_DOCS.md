# SYNTHESIZE_PROJECT_DOCS.md
## Directive: Generate the Three Foundational Project Documents

You are being initialized inside a repository that already contains code.
Your task is to audit that repository and produce three documents that will
govern all future work on this project.

Do not begin writing until you have completed the full audit sequence below.
Do not ask questions. Make defensible inferences from the code and note your
confidence level where ambiguity exists.

---

## THE THREE DOCUMENTS — WHAT THEY ARE

Before you write anything, understand what you are producing:

**Document 1 — `CLAUDE.md` (The Law)**
A normative document that prescribes HOW this project operates. It does not
describe what has been built. It defines immutable rules: the architecture
pattern, the module conventions, the collaboration protocol, the stack
constraints. Once written, this document is consulted on every session but
never modified during normal execution — only updated when the operator
explicitly changes an architectural rule.

**Document 2 — `[PROJECTNAME]_BUILD_MANIFEST.md` (The Ledger)**
A descriptive document recording the current state of real-world facts about
this project. It tracks what is confirmed versus what is pending: client data,
credentials, integration endpoints, asset files, business details. It also
carries the high-level phase status table. This document changes only when
external reality changes — a credential arrives, a decision is confirmed,
an account is created.

**Document 3 — `[PROJECTNAME]_ROADMAP.md` (The Log)**
A procedural document that tracks execution progress through a fixed build
sequence. It contains a checklist of every deliverable, marked `[x]` when
done and `[ ]` when pending. Items move in one direction only — they get
checked off as work is verified complete. Gate criteria define what "done"
means for each phase.

---

## STEP 1 — AUDIT THE REPOSITORY

Read the following in order. Do not skip. Do not begin writing documents
until this entire audit is complete.

**Infrastructure layer:**
- `package.json` — extract: project name, version, scripts, all dependencies
- `vite.config.js` / `next.config.js` / `webpack.config.js` — extract: aliases, ports, build targets
- `tailwind.config.js` — extract: custom tokens, content paths, plugins
- `tsconfig.json` / `jsconfig.json` — extract: paths, compiler targets
- `vercel.json` / `netlify.toml` / deployment config — extract: rewrite rules, headers, environment

**Data and configuration layer:**
- Any file named `manifest.js`, `config.js`, `constants.js`, `env.js`, or similar
- Any `.env.example` file — extract: what environment variables are required
- Any flags or feature-toggle file — extract: what is simulated vs live

**Source structure:**
- List every directory under `src/` (or the source root)
- List every file in each directory — note the naming conventions
- Read `main.js` / `index.js` / `app.js` / `_app.tsx` — extract the entry point pattern:
  how modules are imported, how the app is initialized, what the render sequence is

**Module sampling:**
- Read 3–5 representative modules across different directories
- Extract: what each module exports, what pattern it follows, how it handles
  data, how it handles events, what it imports from shared utilities

**Existing documentation:**
- Read any existing `README.md`, `CLAUDE.md`, or similar docs
- Note what is already documented versus what must be inferred

**Git history:**
- Run `git log --oneline -20` — extract: commit cadence, naming conventions,
  what phases have been delivered
- Run `git status` — note any uncommitted changes

---

## STEP 2 — BUILD YOUR INFERENCES

After the audit, answer these questions internally before writing:

1. What is the **project name** and what does it do in one sentence?
2. What is the **stack** — framework, styling, build tool, backend?
3. What is the **module architecture pattern** — how are files organized and
   why? What rule determines whether something is a component vs a module vs a utility?
4. What is the **render/data/init lifecycle** — how does data flow from config
   to UI? How are side effects isolated from pure rendering?
5. What **simulation or environment pattern** exists — are there flags, modes,
   or environment variables that control live vs fake behaviour?
6. What **phases of work** are apparent from the git history and file structure —
   what has been built, what is clearly intended but not yet built?
7. What **client or business data** is present vs missing — what fields are null,
   placeholder, or marked TBC?
8. What **conventions** are consistent across the codebase — naming, file
   structure, CSS approach, event handling, state management?

---

## STEP 3 — WRITE `CLAUDE.md`

Produce a `CLAUDE.md` at the repository root with these sections:

**Collaboration Protocol**
Four rules the agent must follow before executing any directive:
Audit → Weigh → Flag Deficits → Proceed.
Write these specifically for this project's concerns.

**Project Identity**
A table: Name, Client/Owner, Domain, Concept (one sentence), Stack, Backend,
Key Constraint, Anchor document.

**Core Architectural Pattern**
The single most important rule governing how this codebase is structured.
For a render/init pattern, explain it. For a component/service pattern,
explain it. Make the failure mode explicit — what breaks silently if this
rule is violated.

**Module Placement Rules**
A table mapping: Type of code → Directory → Examples from the actual codebase.

**Data Layer**
Where does the single source of truth live? What is the object name? What
must never be hardcoded in components?

**Simulation / Environment Architecture** (if applicable)
How does the switch from simulated to live operation work? What file controls it?
What is the only change required to graduate a dependency?

**Deployment State**
Current staging URL, production domain, CI/CD chain, current environment mode.

**Standby Protocol**
What must the agent do at the start of every new session to re-orient itself.
List the files to read, in order.

---

## STEP 4 — WRITE `[PROJECTNAME]_BUILD_MANIFEST.md`

Name this file using the project name in uppercase with underscores:
e.g., `WELLNESS_METRICS_BUILD_MANIFEST.md`.

Produce it with these sections:

**Phase Status Table**
A table of every identifiable build phase with columns: Phase number, Name,
Status. Mark phases as `**Complete**`, `**In Progress**`, or `Pending` based
on what you found in the git history and file structure. Be honest — if you
are inferring completion from file existence rather than verified functionality,
note it.

**Business / Brand Identity**
Every piece of client-facing identity data present in the config:
name, legal name, tagline, domain, registration number, etc.
Mark each field as confirmed (has a real value) or `TBC` (null, placeholder,
or missing). Do not invent values.

**Contact & Social**
Every contact field and social handle. Mark confirmed vs TBC.

**Integration Endpoints & Credentials**
Every external service the project connects to. For each: service name,
what credential is needed, where it lives in the config, current status
(null / placeholder / confirmed). Do not log actual secrets — log their
config key names only.

**Feature Flags / Simulation Switches**
Every flag that controls live vs simulated behaviour. For each: flag name,
current value, what resolves it to live.

**Outstanding Items Before Production**
A numbered list of every item that must be resolved before the project can
be promoted to production. Derive this from all the TBC fields and pending
flags above.

---

## STEP 5 — WRITE `[PROJECTNAME]_ROADMAP.md`

Name this file using the same project name prefix.

Produce it with these sections:

**Header**
One paragraph explaining what this document is: the build execution checklist,
how items are marked complete, what the gate criteria mean.

**One section per phase**
For each phase identified in the manifest:
- Phase name and number as a heading
- A brief description of what this phase delivers
- A checklist of specific deliverables as `[ ]` or `[x]` items
- Sub-items under each deliverable where meaningful
- A **Gate** line at the end of each phase: a single sentence defining
  the observable condition that proves this phase is complete

Mark items `[x]` only when you have confirmed evidence from the codebase
that the deliverable exists and follows the project's conventions.
Mark items `[ ]` when they are absent, incomplete, or could not be confirmed.

**SVVP / Staging Checklist** (if applicable)
A final checklist of conditions required before the staging URL is considered
a complete demo — this is separate from production readiness.

**Pre-Production Final Gate**
A checklist of every step required before `vercel --prod` or equivalent
production deployment command.

---

## STEP 6 — DELIVER

After writing all three documents:

1. Run `git status` to confirm what you have created
2. Stage and commit all three files:
   ```
   git add CLAUDE.md [PROJECT]_BUILD_MANIFEST.md [PROJECT]_ROADMAP.md
   git commit -m "docs: synthesize foundational project documents (CLAUDE.md, manifest, roadmap)"
   ```
3. Report to the operator with:
   - What you found in the audit (key observations, surprises, gaps)
   - What inferences you made with lower confidence (and why)
   - The current phase status as you have assessed it
   - The count of TBC items in the manifest
   - What you believe the next directive should address

Close your report with:
```
Three foundational documents written and committed.
Law → Ledger → Log. System ready.
```

---

## CONSTRAINTS

- Write every document as if the project will be maintained for 2+ years by
  agents who have never seen this codebase before. Precision over brevity.
- Do not fabricate values for TBC fields. A confirmed null is more useful
  than a plausible invention.
- Do not recommend changes to the codebase in these documents. These documents
  describe and govern — they do not propose.
- If you cannot confidently determine something from the audit, say so explicitly
  in the document with a note like: `[Inferred from file structure — verify]`
- The three documents must be internally consistent. Phase status in the manifest
  must match the roadmap checkboxes. Architecture rules in CLAUDE.md must match
  the patterns visible in the codebase.
