# SYNTHESIZE_PROJECT_DOCS.md
## Directive: Generate the Three Foundational Project Documents

You are being initialized inside a repository that contains strategic and
operational documents but no source code yet. This is a pre-build state.
Your task is to read every document present, extract all available intelligence,
and produce three governing documents that will frame every future session
in this repository.

Do not begin writing until you have completed the full audit sequence below.
Do not ask questions. Make defensible inferences from the material and mark
your confidence level where genuine ambiguity exists.

---

## THE THREE DOCUMENTS — WHAT THEY ARE

Understand what you are producing before you write anything. These are not
notes or summaries. They are instruments with distinct ontological roles.

**Document 1 — `CLAUDE.md` (The Law)**
A normative document. It prescribes HOW this project will be operated.
It defines immutable rules: collaboration protocol, architecture constraints,
module conventions, stack decisions, simulation/live switch behaviour, and
the standby re-entry sequence. It does not describe what has been built —
it governs how everything will be built. It is consulted at the start of
every session and is only revised when the operator explicitly changes an
architectural rule.

**Document 2 — `[PROJECTNAME]_BUILD_MANIFEST.md` (The Ledger)**
A descriptive document. It records the current state of real-world facts:
what is confirmed versus what is pending. Business identity, integration
credentials, client data, asset inventory, environment variables, and
the high-level phase status table all live here. This document changes
only when external reality changes — a credential is confirmed, a decision
is made, an asset arrives. Facts extracted from strategic documents that
have not yet been operationally confirmed are marked `TBC`.

**Document 3 — `[PROJECTNAME]_ROADMAP.md` (The Log)**
A procedural document. It is the build execution checklist — every
deliverable for every phase, marked `[x]` when done and `[ ]` when
pending. Because no code exists yet, all items begin as `[ ]`. Items move
in one direction only. Gate criteria define the observable condition that
proves each phase is complete.

---

## STEP 1 — READ THE REPOSITORY

This repository contains documents, not code. Read every file present.
Do not skip any. Do not begin writing until this entire step is complete.

**Primary source — the strategic PDF:**
Read the PDF blueprint document in the repository root in full.
Extract everything: the platform concept, the product vision, the user
personas, the proposed architecture, the technology recommendations,
the data models, the integration requirements, the business model,
the phasing logic, and any stated constraints or principles.
This is the master intelligence source. Treat it as the founding document.

**Operational DNA — the working protocol documents:**
Read `COGNITIVE_DEBRIEF.md` in full.
Extract: the collaboration protocol, the architectural patterns established
in prior work, the render/init contract or equivalent execution model,
the simulation/live switch architecture, the module placement rules,
the design token system, the commit and deployment conventions.

Read `FUTURE_PROJECT_BOOTSTRAP.md` in full.
Extract: the universal operational rules, the Brain/Hands relationship
definition, the scientific cadence protocol, the code integrity mandates,
the telemetry standards, the initialization sequence.

**Business facts — the source of truth document:**
Read `SOURCE_OF_TRUTH.md` in full.
Extract: every confirmed business fact present — names, domains, contacts,
credentials, accounts, decisions, assets. Note explicitly which fields are
confirmed with real values and which are stated as pending or unknown.

**Environment configuration:**
Read `.claude/settings.local.json`.
Extract: any permissions, tool configurations, or environment constraints
already established for this project's Claude environment.

**Git history:**
Run `git log --oneline` — extract: what commits exist, what has already
been established.
Run `git status` — note any uncommitted files.

---

## STEP 2 — SYNTHESIZE YOUR UNDERSTANDING

After reading everything, construct these answers internally before writing
a single document:

**About the platform:**
1. What is the project name and the precise one-sentence definition of what it does?
2. Who is the primary user? Who is the secondary user? What problem does each have?
3. What is the core value proposition — the thing that must work before everything else matters?
4. What are the stated technical constraints or non-negotiables from the blueprint?

**About the architecture:**
5. What stack is recommended or decided — frontend framework, styling, build tool, backend, database?
6. What is the module/component architecture pattern that fits this project's domain?
   Apply the operational DNA from `COGNITIVE_DEBRIEF.md` — adapt it to this project's context.
7. What external integrations are required — APIs, payment systems, auth providers, storage services?
8. What is the simulation/live switch strategy — which integrations should start simulated,
   and what credential resolves each one to live?
9. What is the single source of truth data structure — what central config object holds all
   business facts and integration credentials?

**About the build sequence:**
10. What are the natural phases of this build — what must exist before what?
    Phase 0 is always substrate (tooling, config, data layer).
    Phase N is always SEO and launch gate.
    Derive the middle phases from the platform's feature set as described in the blueprint.
11. What is the SVVP — what does the complete platform look like in simulation mode?
    What does a stakeholder need to be able to do on the staging URL to consider it a demo?

**About the ledger:**
12. From `SOURCE_OF_TRUTH.md` and the PDF, what is confirmed? What is TBC?
    List every field that belongs in the manifest and its current status.

---

## STEP 3 — WRITE `CLAUDE.md`

Produce `CLAUDE.md` at the repository root. Write every section for this
specific project — do not copy generic text. Use the actual project name,
actual stack decisions, actual module names where they can be determined.

Include these sections:

**Collaboration Protocol**
Audit → Weigh → Flag Deficits → Proceed.
Write each rule with this project's specific concerns in mind.
What are the most likely audit failures for this domain?
What deficit types are most probable given the integration requirements?

**Project Identity**
Table: Name, Owner/Client, Domain, Concept (one sentence), Stack,
Backend/Database, Key Constraint, Anchor Document.

**SVVP Definition**
One paragraph defining what the System Viable Viable Product means for
this specific platform — what the complete simulation-mode system delivers,
and how the graduation mechanism works.

**Phase Status**
A table listing every phase (derived from your Step 2 synthesis) with
Phase number, Name, and Status. At project start, all phases are Pending.

**Deployment State**
Staging URL (TBC if not yet created), production domain, CI/CD chain
(note if not yet configured), current environment mode.

**Architecture Constraints**
The core architectural rule for this codebase. Describe the execution
lifecycle — how data flows from the central config to the UI, how side
effects are isolated, what the failure mode is if the pattern is broken.
Apply the render/init contract or its equivalent for the chosen stack.

**Module Placement Rules**
Table: Code type → Directory → Examples (use anticipated module names
from the blueprint's feature set).

**Simulation / Live Switch Architecture**
The adapter pattern for each external dependency.
List every integration, its adapter file path, what flag controls it,
and what credential resolves it to live.

**Standby Protocol**
Numbered list: what the agent reads, in order, at the start of every
session to re-orient. Include file names specific to this project.

---

## STEP 4 — WRITE `[PROJECTNAME]_BUILD_MANIFEST.md`

Name this file with the project name in uppercase with underscores.
Derive the project name from the PDF or `SOURCE_OF_TRUTH.md`.

Include these sections:

**Phase Status Table**
Table: Phase number | Name | Status.
All phases Pending at project start.
Mirror the phase table from `CLAUDE.md` exactly — these two must match.

**Business / Brand Identity**
Every identity field: legal name, trading name, tagline, domain, registration
number, VAT number, etc. Source values from `SOURCE_OF_TRUTH.md`.
Mark each: confirmed value, or `TBC — [what is needed]`.

**Contact & Social**
Every contact and social field. Mark confirmed vs TBC.

**Product / Service Catalogue**
From the blueprint: every product or service offering, its pricing model,
its key attributes. Mark confirmed vs TBC per field.

**Integration Registry**
Every external service required. For each:
- Service name and purpose
- Credential(s) needed (key name only — never log secrets)
- Config key path where it will live
- Current status: `null` / `TBC` / confirmed

**Feature Flags**
Every simulation switch that will be needed. For each:
- Flag name (follow the `xyzSimulated: true` convention)
- What it controls
- What resolves it to `false` (live)

**Asset Inventory**
Every static asset the platform requires: logo files, photography, icons,
brand fonts, demo content. Mark present vs TBC.

**Outstanding Items Before Production**
Numbered list: every unresolved item from the sections above.
This is the client data collection checklist.

---

## STEP 5 — WRITE `[PROJECTNAME]_ROADMAP.md`

Use the same project name prefix as the manifest.

Include these sections:

**Header**
One paragraph: what this document is, how `[x]` is earned (only by verified
functional delivery, not file existence), what gate criteria mean.

**Phase 0 — Substrate** (always first)
Deliverables: project scaffolding, tooling configuration, central config/data
file, flags file, integration adapter stubs, entry point, CI/CD connection,
staging URL live.
Gate: `npm run dev` (or equivalent) runs clean. Staging URL is live.
All items `[ ]`.

**Phases 1 through N** (derived from the blueprint's feature set)
For each phase:
- Heading with phase number and name
- One sentence describing what this phase delivers to the end user
- Checklist of specific, testable deliverables as `[ ]` items
- Sub-items where a deliverable has meaningful sub-components
- **Gate:** one sentence — the observable condition that proves this phase is done

Derive phases from the blueprint's feature architecture. Order them by:
dependency (what must exist before what), user-facing value (core features
before supporting features), and risk (highest-uncertainty integrations
scaffolded early in simulation mode).

**Phase N — SEO & Launch Gate** (always last)
Deliverables: meta tags, structured data, robots.txt, sitemap.xml,
launch validation script, production build verification.
Gate: `npm run build` exits clean. Launch script runs with zero errors.

**SVVP Staging Checklist**
Conditions for the staging URL to be considered a complete stakeholder demo.
All `[ ]` at project start.

**Switch Flip Log**
Table: Date | Switch | Flag key set to | Confirmed by.
All rows empty at project start — filled as credentials arrive.

**Pre-Production Final Gate**
Checklist of every step before production deployment.
All `[ ]` at project start.

---

## STEP 6 — VALIDATE CONSISTENCY

Before committing, verify:

- The phase table in `CLAUDE.md` matches the phase table in the manifest exactly
- The phase headings in the roadmap match both tables exactly
- Every integration listed in the manifest has a corresponding flag in the
  flags section and a corresponding adapter path in `CLAUDE.md`
- Every TBC field in the manifest appears in the Outstanding Items list
- No confirmed value in `SOURCE_OF_TRUTH.md` is marked TBC in the manifest
- No invented value appears anywhere — only confirmed facts or explicit TBC markers

---

## STEP 7 — DELIVER

After writing and validating all three documents:

1. Run `git status` to confirm the three new files
2. Commit:
   ```
   git add CLAUDE.md [PROJECT]_BUILD_MANIFEST.md [PROJECT]_ROADMAP.md
   git commit -m "docs: synthesize foundational project documents from strategic blueprint"
   ```
3. Report to the operator:
   - The project name and one-sentence platform definition as you have understood it
   - The phase count and phase names in build sequence order
   - The count of confirmed fields vs TBC fields in the manifest
   - The integrations requiring simulation adapters, listed by name
   - Any material where you had low confidence and why
   - The single most important thing you believe Phase 1 must deliver

Close your report with:
```
Three foundational documents written and committed.
Law → Ledger → Log. System ready.
```

---

## CONSTRAINTS

- Source every fact from the documents you read. Do not invent business names,
  domain names, pricing, or contact details. If it is not in the source material,
  it is TBC.
- Apply the operational patterns from `COGNITIVE_DEBRIEF.md` and
  `FUTURE_PROJECT_BOOTSTRAP.md` — these establish how this operator builds
  systems. The new project inherits those patterns unless the blueprint
  explicitly requires something different.
- Write every document at the precision level required for a 2-year maintenance
  horizon — an agent who has never seen this repo must be fully operational
  after reading `CLAUDE.md` alone.
- The three documents must be internally consistent. Any inconsistency between
  them will create confusion in future sessions.
- Do not recommend changes to the strategic documents. Your role here is
  synthesis and structuring, not critique.
- Mark every inference with `[Inferred — verify with operator]` if it is not
  explicitly stated in the source material.
