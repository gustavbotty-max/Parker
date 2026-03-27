# Homeschool AI Assistant — Technical Architecture

## Purpose
This document translates the homeschool AI assistant idea into a practical v1 system design.

The goal is **not** to build a giant edtech platform on day one.
The goal is to build a constrained, trustworthy, family-first assistant that helps Jonathan's household plan and review homeschool work.

If it works well for Jonathan's family, the same architecture can later be expanded for a small number of known families.

---

# 1. Product Philosophy

## What this is
A **parent-facing homeschool planning and progress assistant**.

It helps a parent:
- capture what is happening with a child
- turn that into a weekly plan
- generate printable materials
- track progress over time
- reduce uncertainty about what to teach next

## What this is not
This is **not**:
- an autonomous teacher
- a diagnosis engine
- a replacement for the parent
- a freeform chatbot that says whatever sounds educational

The product should feel more like:
- a structured planning engine
- a parent dashboard
- a constrained educational agent

---

# 2. Recommended v1 Architecture

## Core idea
Use an **OpenClaw-style agent runtime** behind a custom app/dashboard.

### The app provides:
- family login
- child profiles
- weekly check-in forms
- generated lesson plans
- printable outputs
- progress history

### The agent provides:
- planning intelligence
- summarization
- adaptation based on strengths/weaknesses
- worksheet/activity generation
- structured educational reasoning within strict guardrails

### The system should include:
- locked core behavior (server-side "Soul")
- hard sandbox
- limited tool permissions
- structured data storage
- schema-based outputs

---

# 3. High-Level System Components

## A. Frontend App
Parent-facing dashboard.

### Main screens
1. **Parent Dashboard**
   - upcoming week
   - child summaries
   - recent progress notes
   - quick actions

2. **Child Profile**
   - age / grade band
   - interests
   - strengths
   - struggles
   - learning preferences
   - current goals

3. **Weekly Check-In Form**
   - what went well
   - what was hard
   - what was completed
   - what was skipped
   - parent observations
   - optional work samples

4. **Plan Generation Screen**
   - choose child
   - choose subjects
   - time available
   - goals for the week
   - request printable materials

5. **Plan Results Screen**
   - weekly objectives
   - daily/subject blocks
   - practice tasks
   - materials list
   - parent notes
   - export actions

6. **Progress History**
   - previous weekly plans
   - progress snapshots
   - recurring gaps
   - notes over time

7. **Printable Materials Screen**
   - worksheets
   - checklists
   - reading logs
   - review sheets
   - PDF export

## B. Backend/API Layer
Handles:
- authentication
- data persistence
- request validation
- agent orchestration
- PDF generation
- audit logging

## C. Agent Runtime Layer
A constrained agent that can:
- read structured child data
- read weekly observations
- produce lesson plans
- produce progress summaries
- generate printable content

But cannot:
- self-modify
- browse freely
- contact anyone
- access unrelated workspace data
- execute arbitrary tools

## D. Database Layer
Stores the family and learning data.

## E. File/Export Layer
For:
- PDFs
- generated worksheets
- printable lesson plans
- optionally uploaded work samples

---

# 4. Recommended v1 Stack

## Frontend
- **Next.js** preferred
  - good for dashboard apps
  - good for auth flows
  - good for server routes
  - flexible for PDF/export workflows

React alone is fine too, but Next is the cleaner long-term choice.

## Backend
- **Next.js server actions / API routes** for v1
- or a small **Node/Express** backend if you want a clearer separation

## Database
- **Supabase Postgres**

Why:
- fast setup
- auth included
- database included
- storage available
- easy enough for early product work

## Auth
- **Supabase Auth** or **Clerk**

## AI Layer
Any of these can work:
- OpenAI
- Anthropic
- OpenRouter

Best practice:
- use a stronger model for planning/summaries
- use cheaper models for formatting/classification when possible

## PDF / Printable Generation
- HTML templates → PDF generation
- or a server-side PDF renderer

Do **not** start with super fancy document layout. Clean, printable, useful beats decorative nonsense.

---

# 5. Core Data Model

## Family
- id
- account owner
- family name
- preferences
- created_at

## Child
- id
- family_id
- first_name
- age
- grade_band
- learning_style_notes
- strengths
- struggles
- interests
- current_focus
- created_at
- archived_at

## Subject
- id
- child_id
- subject_name
- current_level_notes
- current_goals
- priority_level

## Weekly Check-In
- id
- child_id
- week_start
- subjects_covered
- what_went_well
- what_was_hard
- what_was_skipped
- parent_observations
- attachments
- confidence_rating

## Weekly Plan
- id
- child_id
- week_start
- subjects
- objectives_json
- schedule_json
- printable_requests_json
- parent_notes
- ai_summary
- created_at

## Progress Snapshot
- id
- child_id
- subject
- date
- strengths_observed
- reinforcement_needed
- confidence_level
- next_step_recommendations

## Generated Material
- id
- child_id
- weekly_plan_id
- type
- title
- content_json
- pdf_path
- created_at

## Audit Log
- id
- child_id
- action_type
- prompt_template_used
- model_used
- created_at
- operator_type (user/system)

This matters more than it seems. Auditability is how you keep the AI from becoming an elegant liar.

---

# 6. Locked System Behavior ("Soul" Equivalent)

## Principle
In the app, the core Soul should be **server-side and uneditable by end users**.

Parents can customize style and preferences, but not the underlying behavioral rules.

## Core behavioral rules
The assistant should always:
- support the parent as primary educator
- produce clear, practical, age-appropriate outputs
- explain uncertainty honestly
- prefer structured plans over vague motivational language
- avoid overclaiming mastery or deficits
- distinguish observation from inference
- produce outputs that are usable in real life

## The assistant must never:
- diagnose disabilities
- make medical, psychological, or developmental claims
- shame the child or parent
- claim certainty without evidence
- recommend unsafe or clearly age-inappropriate content
- override parent intent or family values

## Parent-configurable settings
These can be editable:
- tone (gentle, direct, encouraging)
- teaching style preference
- faith-friendly / secular preference
- time available per day
- preferred lesson length
- printable preference level
- low-prep vs more hands-on

---

# 7. Tool Permission Model

## Allowed tools/functions for the homeschool agent
- read child profile data
- read prior weekly check-ins
- read prior plans
- write new plans
- write progress summaries
- generate printable content
- export PDF

## Disallowed by default
- shell access
- network browsing
- email sending
- messaging users directly
- arbitrary file access
- editing system instructions
- contacting third parties

## Why this matters
If the app is meant to be trustworthy, the agent cannot behave like a general assistant with loose privileges.

It should live in a fenced yard, not wander off into the woods with a machete.

---

# 8. Structured Input Design

The product should not rely on open-ended chat alone.

## Better input pattern
Use forms with optional free text.

### Weekly check-in inputs
- Which child?
- Which subjects?
- What went well?
- What felt difficult?
- What was incomplete?
- Any behavior/attention notes?
- Any wins worth reinforcing?
- What is the priority for next week?
- How much time is available next week?
- Generate printables? yes/no

### Child profile inputs
- age
- grade range
- favorite activities
- strongest subjects
- hardest subjects
- current goals
- parent concerns

This keeps the model grounded.

---

# 9. Structured Output Design

Every major agent output should follow a schema.

## A. Weekly Plan output
Should always include:
- weekly overview
- top 3 goals
- subject blocks
- estimated time per block
- materials needed
- printable recommendations
- parent guidance notes
- watch-fors

## B. Progress Summary output
Should always include:
- what appears stronger
- what needs reinforcement
- what evidence this is based on
- confidence level
- suggested next-step focus

## C. Worksheet output
Should always include:
- age/level target
- instructions
- exercises
- answer key (optional / parent-only)
- printable formatting metadata

Schema discipline is the difference between product and toy.

---

# 10. Safety / Trust Guardrails

## Educational trust rules
The system should:
- say when evidence is limited
- avoid pretending to know what it does not know
- separate observations from recommendations
- keep recommendations bounded and practical

## Child safety rules
The system should not generate:
- inappropriate content
- emotionally manipulative language
- fear-based evaluation messaging
- harsh labels for a child

## Parent trust rules
The system should avoid:
- fake authority
- generic praise with no evidence
- contradictory recommendations
- excessive verbosity

## Product copy rule
Never imply:
- guaranteed academic outcomes
- formal educational accreditation
- diagnostic authority

---

# 11. Core Agent Workflows

## Workflow 1 — Weekly Planning
1. Parent selects child
2. Parent completes weekly check-in
3. Backend validates structured input
4. Agent receives child profile + latest observations + goals
5. Agent returns structured weekly plan
6. Backend stores result
7. App displays plan and offers PDF export

## Workflow 2 — Progress Review
1. Parent logs what was completed
2. Parent notes difficulties/wins
3. Agent summarizes likely strengths/gaps
4. Result saved as progress snapshot
5. Next plan references this snapshot

## Workflow 3 — Printable Generation
1. Parent requests worksheet/checklist
2. Agent generates structured content
3. Template engine renders printable PDF
4. PDF saved and attached to plan

---

# 12. Build Order

## Phase 0 — Design and scope
- define first child/use case
- define first two subjects
- define weekly planning workflow
- define data model
- write prompt templates

## Phase 1 — Family pilot MVP
Build only:
- auth
- child profile
- weekly check-in form
- generate weekly plan
- generate printable worksheet/checklist
- save plan history

## Phase 2 — Trust and usability
Add:
- progress snapshots
- better printable formatting
- parent preferences
- stronger output schemas
- plan revision/editing

## Phase 3 — Small-circle beta
Add:
- multi-family support
- billing
- onboarding flow
- data separation / tenancy hardening
- stronger analytics
- support tooling

---

# 13. What to Build First

## First real milestone
A parent can do this in under 10 minutes:
1. select child
2. enter current struggles and goals
3. click generate
4. receive a usable weekly plan
5. download one printable worksheet

That is the first win.

Not branding.
Not a mascot.
Not a giant curriculum engine.

Just one clean loop that actually helps.

---

# 14. Key Product Risks

## Risk 1 — Too broad too early
Trying to support:
- all ages
- all subjects
- all learning styles
- all educational philosophies

...will bury the project.

## Risk 2 — Freeform AI mush
If outputs are not structured, the assistant will feel smart but unreliable.

## Risk 3 — Weak trust
If parents can't tell *why* the system suggested something, they won't rely on it.

## Risk 4 — Fancy before useful
If you polish too early, you'll hide bad workflow under pretty design.

---

# 15. Recommended v1 Scope (Opinionated)

If I were choosing the exact first slice, I would do:

- **1 family**
- **1 child**
- **2 subjects max**
- **weekly plan + weekly review**
- **1 printable per week**
- **simple dashboard only**

Why?
Because that is enough to discover whether the core loop works.

Anything larger is probably theater.

---

# 16. Near-Term Technical Tasks

## Immediate next technical tasks
1. Define the first child pilot profile
2. Define the first subject scope
3. Draft the system prompt / locked behavior rules
4. Draft JSON schemas for:
   - weekly plan
   - progress summary
   - printable worksheet
5. Set up repo + app shell
6. Build child profile form
7. Build weekly check-in form
8. Build first plan-generation endpoint
9. Render first plan result page
10. Add simple PDF export

---

# 17. Suggested File Structure for the Project

```text
homeschool-ai/
  app/
    dashboard/
    children/
    plans/
    printables/
    api/
  components/
  lib/
    ai/
      prompts/
      schemas/
      policies/
    db/
    pdf/
  supabase/
  docs/
    product-brief.md
    architecture.md
    prompt-rules.md
```

## Suggested prompt files
- `lib/ai/prompts/system-teacher-assistant.md`
- `lib/ai/prompts/weekly-plan.md`
- `lib/ai/prompts/progress-summary.md`
- `lib/ai/prompts/worksheet-generator.md`

## Suggested schema files
- `lib/ai/schemas/weekly-plan.ts`
- `lib/ai/schemas/progress-summary.ts`
- `lib/ai/schemas/worksheet.ts`

---

# 18. Success Criteria for v1

v1 is successful if Jonathan can say:
- this saves me time
- this helps me decide what to do next week
- this gives me more confidence
- this produces at least one printable I actually use
- I would open this again next week without being nagged

If those are true, then the product deserves expansion.
If not, tighten the loop and fix the workflow before dreaming bigger.

---

# 19. Recommended Next Step

Pair this architecture doc with the existing project plan and do one concrete task next:

## Best next move
Create a **Family Pilot Brief** with:
- first child
- first subject(s)
- current pain point
- weekly time available
- what a successful weekly output should include

Once that exists, the app stops being a concept and starts becoming a build spec.
