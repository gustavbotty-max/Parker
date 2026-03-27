# Homeschool AI Assistant — Project Plan

## Purpose
Build an AI-powered homeschool planning assistant for Jonathan's family first.

If it proves genuinely useful at home, refine it into something that could later be shared with a small circle of known homeschool families.

## Core Problem
Homeschool parents often struggle with:
- planning curriculum week to week
- knowing whether a child is on track
- adapting lessons to strengths and weaknesses
- staying confident when progress feels unclear
- producing materials and structure consistently

## Product Vision
A parent-facing AI assistant that helps turn observations, goals, and recent work into:
- clear weekly lesson plans
- targeted practice activities
- printable materials
- simple progress summaries
- next-step recommendations

## Product Positioning
This should **not** be framed as an AI teacher replacing a parent.

Better framing:
- AI homeschool planning assistant
- parent lesson-planning and progress-tracking assistant
- tailored support for parent-led education

## Guiding Constraints
- Start with Jonathan's family only
- Build for real weekly use, not demos
- Keep outputs structured and trustworthy
- Avoid overclaiming educational authority
- No diagnosing learning disabilities or making medical/developmental claims
- The AI should support parent judgment, not replace it

## Best MVP Direction
Start narrow:
- age range: whatever matches Jonathan's real near-term use case at home
- subjects: **reading and math first**
- user: **parent**, not child
- cadence: **weekly planning + weekly review**

## MVP Outcome
A parent can:
1. enter a child profile
2. enter current strengths, struggles, and goals
3. log a few observations from the week
4. get a next-week lesson plan
5. generate printable practice material
6. review progress over time

---

# First 10 Hours of Work Plan

## Hour 1 — Define the first real user and use case
Write down exactly who this is for in your house.

Questions to answer:
- Which child is the first test case?
- What age/grade range are they roughly in?
- Which subject hurts the most right now: reading, writing, math, or something else?
- What does "helpful" actually mean for your family?
- What would save you time every week?

Output for this hour:
- one-paragraph user definition
- one-paragraph problem definition
- one-paragraph "what success looks like"

### Deliverable
Create a simple note with:
- child profile
- current pain points
- goals for the next 30 days

---

## Hour 2 — Pick the narrow MVP scope
Do **not** try to support all homeschooling.

Make these decisions:
- one child or multiple?
- one subject or two?
- weekly planning only, or planning + review?
- printable worksheets now, or later?
- progress summary now, or later?

Recommended MVP scope:
- one child
- reading + math
- weekly planning
- weekly review
- simple printable worksheets/checklists

### Deliverable
Write a one-page MVP definition with:
- in scope
- out of scope
- must-have features
- nice-to-have features

---

## Hour 3 — Design the parent workflow
Map the full user flow from start to finish.

Suggested flow:
1. Parent creates child profile
2. Parent adds goals for the week
3. Parent enters observations and recent work
4. AI creates lesson plan
5. Parent reviews and edits
6. AI generates printable materials
7. Parent logs results at end of week
8. AI adapts next week's plan

### Deliverable
Make a simple workflow doc or sketch covering:
- inputs
- AI processing step
- outputs
- repeat weekly loop

---

## Hour 4 — Define the data the app needs
Figure out what needs to be stored.

Core data model:
- family
- child
- subject
- skill area
- learning goals
- parent observations
- weekly plan
- activity history
- assessment results
- generated materials

### Deliverable
Write a basic schema list like:
- Child: name, age, grade range, strengths, struggles, interests
- Observation: date, subject, note, confidence, parent concern
- Weekly Plan: subject, goals, activities, estimated time, materials needed
- Progress Snapshot: mastered, needs reinforcement, next steps

---

## Hour 5 — Decide what the AI is and is not allowed to do
This is where the product gets trustworthy.

Write clear guardrails.

### The AI should be allowed to:
- suggest lesson plans
- adapt activities to strengths and weaknesses
- summarize progress from structured parent input
- generate age-appropriate worksheets and exercises
- recommend next practice steps

### The AI should not:
- diagnose disorders
- claim mastery without evidence
- replace assessments entirely
- recommend unsafe or inappropriate content
- present guesses as facts

### Deliverable
Write a short "AI behavior rules" section for the product.

---

## Hour 6 — Draft the first prompt system and output templates
Start with one simple engine.

Build prompt templates for:
- weekly lesson plan generation
- progress summary
- worksheet generation
- parent explanation notes

Important: require structured output.

For example, a weekly plan should always return:
- objective
- lesson blocks
- practice activity
- estimated duration
- printable suggestion
- parent note

### Deliverable
Draft 3 to 4 prompts in a markdown file.

---

## Hour 7 — Build a low-tech prototype before full app development
Do not start with a polished app if a rough internal tool will prove the concept faster.

Fast prototype options:
- simple form + AI output page
- spreadsheet + prompt workflow
- lightweight web app using React + Supabase + AI API

Best move:
- create a very basic internal web app for your family
- no fancy branding yet
- just working inputs and outputs

### Deliverable
Choose the stack and create the repo.

Suggested stack:
- Next.js or React frontend
- Supabase for auth/database
- OpenAI/Anthropic/OpenRouter for generation
- HTML-to-PDF for printable exports

---

## Hour 8 — Build the first screen set
Only build the minimum screens needed.

Recommended first screens:
1. Child Profile
2. Weekly Check-In Form
3. Generate Plan
4. Plan Results
5. Printable Export

### Deliverable
Wireframe or rough-build these screens.
Even ugly is fine.

---

## Hour 9 — Test with real family inputs
Use actual homeschool context from your family.

Try these tests:
- child is ahead in reading, behind in math
- child resists writing but loves science
- child had a rough week and only half the plan got done
- parent wants printable phonics or multiplication reinforcement

Look for failure modes:
- too generic
- too wordy
- unrealistic lesson timing
- fake confidence
- weak printables

### Deliverable
Create a short test-results note:
- what worked
- what was weak
- what must change before week 2

---

## Hour 10 — Decide whether this deserves a second week of work
After 10 hours, do not ask "is this a business?"
Ask:
- did this help my family?
- did it save time?
- did it reduce uncertainty?
- did it produce anything we'd actually use again next week?

If yes, then move into Phase 2.
If no, tighten scope and retry.

### Deliverable
Write a go/no-go decision note with:
- biggest value observed
- biggest weakness observed
- next 3 improvements

---

# Phase 2 Plan (After the First 10 Hours)
If the prototype helps your family, the next phase should be:

## 1. Improve trust and structure
- better input forms
- better subject-specific logic
- clearer progress summaries
- more consistent output formats

## 2. Improve printable materials
- worksheets
- checklists
- reading logs
- simple assessments
- weekly summary sheets

## 3. Add progress tracking over time
- weekly snapshots
- skill trend lines
- recurring struggles
- parent confidence tracker

## 4. Expand carefully
Only after the first child/use case works:
- second child
- more subjects
- more adaptive planning
- family dashboard

## 5. Share with a few trusted families
Not public launch. Just:
- 3 to 5 homeschool families you know
- structured feedback
- look for repeated value
- find where people get confused

---

# What Success Looks Like
This project is working if Jonathan can say:
- "This saves me time every week"
- "This helps me feel more confident about what to teach next"
- "The lesson plans are specific enough to use"
- "The printables are actually useful"
- "I would want this again next week"

---

# Recommended Next Immediate Step
Start with a **Family Pilot Brief**.

Write one page answering:
1. Which child is first?
2. Which subject is first?
3. What is the current struggle?
4. What would a good weekly output look like?
5. What printable would be most useful right away?

Once that exists, we can turn this from an idea into an actual build plan.
