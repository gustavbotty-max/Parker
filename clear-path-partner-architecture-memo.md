# Clear Path — Partner Architecture Memo
## Revenue Engine, Competitive Advantage, Build-vs-Buy, and Technical Roadmap by Phase

_Date: 2026-03-23_

---

# 1. Why this memo exists

This memo is for internal strategy and architecture planning.

It is meant to answer, in practical terms:
- where revenue is actually generated
- why Clear Path has an advantage in each phase
- what the product stack looks like in each phase
- what we build ourselves vs what we integrate from partners
- what new technical requirements each phase adds
- what partner/compliance complexity each phase introduces

This document assumes the preferred operating model is:

> **Clear Path is the software orchestrator and rules engine, while regulated partners handle money movement, fund housing/custody, yield products, and card issuance.**

That means the company should be designed as an embedded-finance software platform, not as a bank, direct MTL, or direct issuer.

---

# 2. Core strategic thesis

## The product is not just “cheaper giving”
If Clear Path only becomes a lower-fee donation processor, the moat is weak and the revenue ceiling is limited.

The stronger thesis is:

> Clear Path is a financial operating layer for mission-driven organizations that unifies giving, treasury, restricted-fund traceability, and controlled spend.

That matters because it creates multiple revenue surfaces:
- money in
- money held
- money deployed
- money governed
- money reported

## The long arc of the business
The full company arc is:

1. **Reduce friction and fee drag on money entering the system**
2. **Improve the transparency and usefulness of money while it sits in the system**
3. **Control and monetize how money leaves the system**
4. **Apply that infrastructure to the original mission vision**

That sequence is important because it turns the company from a “good cause idea” into an actual financial infrastructure business.

---

# 3. Revenue model overview

## Revenue should come from four layers

### Layer 1 — Intake economics
Revenue created when money enters the platform:
- payment fee share
- ACH/card economics
- conversion economics where applicable

### Layer 2 — Treasury economics
Revenue created while funds are held:
- yield share
- treasury spread / conversion economics
- premium treasury features

### Layer 3 — Deployment economics
Revenue created when funds leave the platform:
- accelerated payout fee
- premium treasury action fee
- vendor or recipient speed premium

### Layer 4 — Spend / card economics
Revenue created when controlled spend is activated:
- interchange share
- premium card / spend controls
- program administration / reporting fees

## Why this matters
This means Clear Path does not have to depend on a single revenue pillar.

The healthier long-term model is:
- **Phase 1:** intake + light premium trust/reporting
- **Phase 2:** treasury + yield share
- **Phase 3:** interchange + spend controls + premium governance
- **Phase 4:** mission-program administration + advanced transparency

---

# 4. Phase-by-phase architecture and business review

---

# Phase 1 — Trust + Savings Wedge
## Purpose
Create visible, immediate ROI for local organizations in Raleigh / Cary / Triangle.

## Main customer type
- mid-sized churches
- smaller nonprofits with recurring giving
- organizations frustrated with legacy stacks like Realm / Vanco

## Main product promise
- lower fee drag
- easier ACH adoption
- better restricted-fund visibility
- improved donor/admin trust

## Main revenue source(s)
### Primary
- transaction economics / fee share on money in
- improved margin from ACH migration vs card-heavy flows

### Secondary
- premium fund-traceability reporting
- premium reporting / board-facing exports if adopted early

## Why this phase can make money
This phase works economically because ACH migration can improve economics for both the customer and Clear Path.

If the platform can make ACH setup extremely easy and nudge recurring donors away from cards, then:
- the customer sees visible savings
- Clear Path can maintain or improve effective margin
- the platform earns the right to introduce deeper treasury products later

## Competitive advantage in this phase
### 1. ACH migration as a practical wedge
Most incumbents support ACH, but they do not make ACH migration the hero.

Clear Path can position ACH migration as:
- a measurable savings lever
- a first proof point of value
- a concrete reason to switch

### 2. Restricted-fund traceability
This is more differentiated than “we process donations.”

Example:
- a donor gives to a missionary fund
- the organization can prove the funds were isolated, tracked, and used accordingly

This is one of the few blockchain-adjacent features that normal churches/nonprofits may actually value.

### 3. Better story than “cover the fee” prompts
Many legacy platforms surface fee offsetting to donors.
That is useful, but weak as a strategy.

Clear Path can say:
- we improved your economics structurally
- not just by asking donors to absorb processor pain

## Technical stack in this phase

### What we need to build
#### Core product
- web donation intake UX
- org admin dashboard
- internal ledger / transaction state store
- restricted-fund model
- ACH migration flow logic
- donor reporting
- fund activity dashboard
- premium traceability/reporting layer

#### Core backend capabilities
- donation creation and state transitions
- fund tagging / restriction enforcement in ledger
- donor profile and payment method mapping
- reporting/export layer
- admin roles (lightweight)

### What we should implement via partners
- ACH/card acceptance rails
- account linking / bank verification (Plaid-like)
- regulated money movement
- payout to organization bank account
- optional basic wallet / MPC layer if treasury abstraction exists from day one

## Likely partner stack in Phase 1
- payment processor / donations partner
- ACH provider / bank debit capability
- bank-linking provider
- sponsor bank / regulated movement layer

## Build-vs-implement summary
### Build
- ledger
- donor/org UX
- restricted-fund logic
- reporting
- ACH migration experience

### Implement
- raw rails
- bank verification
- regulated movement
- any underlying account housing

## New technical requirements introduced in this phase
- money-state tracking
- donation + fund tagging model
- first version of balance model
- reporting architecture
- ACH onboarding / migration workflow

## Phase 1 target economics
### Revenue target
- **$25K–$75K annualized run-rate**

### Per-customer target
- **$3K–$10K per org / year**

### What needs to be true
- customers switch because ROI is obvious
- ACH migration actually happens
- premium reporting has at least some demand

## Target market scope
### Initial geography
- Raleigh / Cary / Triangle

### Expand beyond city when
- 3+ strong local proof points
- repeatable onboarding
- stable local economics

---

# Phase 2 — Treasury Layer + Yield Participation
## Purpose
Turn trust and money-in flows into a treasury product with real account stickiness.

## Main customer type
- existing Phase 1 customers
- organizations with meaningful designated balances
- organizations willing to keep money inside the Clear Path system for visibility and upside

## Main product promise
- treasury-backed account experience
- better fund-level balance visibility
- recoverable governed access
- aligned yield participation

## Main revenue source(s)
### Primary
- yield share on managed balances

### Secondary
- premium treasury controls/reporting
- baseline transaction economics continue
- possible accelerated payout fees begin to matter

## Why this phase can make money
This phase is what makes the “if you win, we win” model real.

If organizations keep meaningful balances in-system across:
- missionary funds
- building funds
- benevolence funds
- reserve funds
- campaign balances

then yield-share can become a real aligned revenue stream.

## Competitive advantage in this phase
### 1. Treasury account + fund logic, not just “wallet access”
Most customer-facing products either:
- feel like generic giving tools
- or feel too crypto-native

Clear Path should offer:
- governed treasury accounts
- fund-aware balances
- role-based approvals
- recoverable access

That is a real UX advantage.

### 2. Traceable restricted funds as a treasury feature
The designated-fund traceability from Phase 1 becomes much more powerful here because balances are now actively managed within the platform.

### 3. Value-aligned pricing
If Clear Path earns a portion of created yield rather than relying on a monthly software tax, the sales story becomes stronger for churches/nonprofits.

## Technical stack in this phase

### What we need to build
#### Treasury layer
- governed treasury account UX
- fund-level balance display and state
- approval workflows
- multi-admin and role-based access
- recovery/admin continuity flows
- premium treasury reporting
- yield accounting and revenue attribution

#### Ledger requirements
- available / pending / restricted / reserved balance states
- yield attribution by organization and possibly by fund
- transaction reconciliation across offchain and onchain/integration layers

### What we should implement via partners
- MPC / embedded wallet infrastructure
- stablecoin treasury infrastructure
- fund housing / custody layer
- yield partner / balance product
- redemption / payout partner
- fiat ↔ stablecoin conversion where applicable

## Likely partner stack in Phase 2
- MPC / embedded wallet provider
- stablecoin / treasury provider
- sponsor bank / fund housing partner
- redemption / payout partner
- yield-enabled regulated partner structure

## Build-vs-implement summary
### Build
- governed treasury UX
- admin permissions and approvals
- treasury ledger states
- fund-aware reporting
- yield attribution/reporting

### Implement
- wallet infrastructure
- custody / balance housing
- yield products
- conversion/redemption rails

## New technical requirements introduced in this phase
- governed wallet-backed access model
- approval engine
- recoverability / org continuity model
- deeper ledger state complexity
- treasury accounting model
- partner reconciliation layer

## Phase 2 target economics
### Revenue target
- **$150K–$500K annualized run-rate**

### Per-customer target
- **$8K–$30K per account / year**

### What needs to be true
- balances are real and sticky
- customers trust the treasury layer enough to keep funds in-system
- yield partner economics are actually attractive

## Geography target
- Triangle-wide
- broader North Carolina once treasury model is stable

---

# Phase 3 — Controlled Spend + Card Programs
## Purpose
Turn Clear Path from a money-in + treasury product into a money-deployment platform.

## Main customer type
- churches with ministry/team budgets
- nonprofits with program disbursement needs
- organizations needing approval logic and controlled card-based spend

## Main product promise
- issue controlled cards to approved users
- tie spend to designated balances and program rules
- improve oversight without increasing admin chaos

## Main revenue source(s)
### Primary
- interchange
- premium spend controls / governance features

### Secondary
- yield share continues
- accelerated payout and treasury action fees

## Why this phase can make money
This is where Clear Path can become much more economically powerful.

If customers use:
- ministry cards
- benevolence cards
- controlled spend cards
- program cards

then interchange plus premium spend governance can materially improve account economics.

## Competitive advantage in this phase
### 1. Controlled spend is not generic issuing
The differentiator is not “we have a card.”
It is:
- fund-aware spend
- MCC restrictions
- role-based budgets
- approvals
- policy enforcement
- traceability from donation or designated balance to spend

### 2. Better fit for mission-driven organizations
This phase is where Clear Path becomes very differentiated from generic embedded-finance products.

### 3. Better monetization without forcing software rent first
Interchange and premium spend features deepen the economics while staying aligned with customer usage.

## Technical stack in this phase

### What we need to build
#### Spend layer
- cardholder/admin UX
- budget engine
- policy engine
- spend approval workflows
- exception handling
- receipt capture / transaction context
- fund-to-expense reconciliation
- advanced program reporting

#### Ledger requirements
- authorization state vs settlement state
- card program balance tracking
- spend allocation by fund/program/user
- dispute/adjustment handling in ledger

### What we should implement via partners
- issuer / card program infrastructure
- sponsor bank relationship
- auth stream / transaction feed
- card ops / network plumbing
- partner-led compliance where possible

## Likely partner stack in Phase 3
- issuer / card program partner (Lithic-like)
- sponsor bank
- auth stream / authorization controls partner
- treasury/wallet stack from Phase 2

## Build-vs-implement summary
### Build
- budget / policy engine
- admin/cardholder product layer
- spend-to-fund reconciliation
- reporting / governance layer

### Implement
- issuing rails
- sponsor-bank stack
- raw transaction stream plumbing
- low-level card-network infrastructure

## New technical requirements introduced in this phase
- authorization pipeline handling
- real-time rules engine
- transaction-state management
- dispute/adjustment handling
- strong audit trails for spend deployment

## Phase 3 target economics
### Revenue target
- **$500K–$1.5M+ annualized run-rate**

### Per-customer target
- **$15K–$75K+ per larger customer / year**

### What needs to be true
- card usage is real
- partner economics improve with maturity
- premium governance features are clearly valuable

## Geography / segment target
- broader NC
- selective Southeast expansion
- church and nonprofit segments where controlled deployment matters

---

# Phase 4 — Mission Operating System
## Purpose
Apply the proven infrastructure to the original money-to-the-needy and support-distribution vision.

## Main customer type
- housing stability nonprofits
- homelessness / re-entry organizations
- faith-based aid / benevolence programs
- support organizations needing beneficiary-level controls

## Main product promise
- transparent donor trust layer
- controlled support distribution
- more dignified money delivery
- less misuse / leakage
- clearer program reporting

## Main revenue source(s)
### Primary
- interchange from controlled spend programs
- premium reporting/compliance/program administration

### Secondary
- treasury/yield economics where program structures allow

## Why this phase can make money
Because the original vision becomes much more commercially viable once the core infrastructure already exists.

The product is no longer trying to launch from zero into the most operationally difficult use case.

## Competitive advantage in this phase
### 1. Trust layer already proven elsewhere
By this stage Clear Path should already be known for:
- transparency
- fund integrity
- better money deployment

### 2. Controlled spend / beneficiary logic already proven elsewhere
This reduces risk in the mission-heavy phase.

### 3. Stronger donor trust story
The original mission concept becomes stronger once the company can credibly say:
- we already know how to govern funds well
- now we are applying that to higher-need populations

## Technical stack in this phase

### What we need to build
- beneficiary profile logic
- donor transparency layer for support flows
- program-specific workflows
- stronger exception handling and review tools
- mission-specific reporting surfaces

### What we should implement via partners
- reuse the same regulated financial stack
- add domain-specific integrations where needed

## Build-vs-implement summary
### Build
- beneficiary workflows
- donor/program transparency surfaces
- program admin logic

### Implement
- regulated rails already established in prior phases
- any required domain-specific third-party integrations

## New technical requirements introduced in this phase
- beneficiary-level workflow states
- more complex operator review model
- sensitive-case exception handling

## Phase 4 target economics
### Revenue target
- **$1M+ annualized run-rate**

### What needs to be true
- earlier phases must already be stable
- program operators must trust the product enough to adopt it
- support workflows must be operationally realistic

## Geography / segment target
- selective, not blanket expansion
- mission-heavy organizations that match proven program workflows

---

# 5. Build-vs-Buy Summary by Layer

## Layer: Donations / money in
### Build
- donor UX
- org dashboard
- fund mapping
- ledger state

### Buy / implement
- ACH/card rails
- bank verification
- regulated movement

## Layer: Treasury / balances
### Build
- governed account UX
- approvals
- balance views by fund
- yield reporting

### Buy / implement
- MPC / wallet stack
- treasury infra
- fund housing/custody partner
- yield partner

## Layer: Controlled spend / cards
### Build
- budget engine
- controls logic
- spend governance
- reporting

### Buy / implement
- card issuing
- sponsor bank
- auth stream / transaction feed

## Layer: Mission workflows
### Build
- beneficiary/admin logic
- donor transparency layer
- program workflows

### Buy / implement
- regulated rails from prior phases
- any domain-specific integrations needed for programs

---

# 6. The actual moat by phase

## Phase 1 moat
- ACH migration as immediate ROI
- restricted-fund traceability
- better trust story than generic processors

## Phase 2 moat
- governed treasury accounts
- better fund-level money visibility
- aligned yield participation

## Phase 3 moat
- fund-aware controlled spend
- stronger governance and deployment controls
- better economics via interchange + premium controls

## Phase 4 moat
- donor-to-need transparency
- controlled support deployment
- mission-aligned financial infrastructure that is actually usable

---

# 7. Raleigh-first roadmap

## Raleigh launch objective
Use local density and trust to prove:
- savings
- trust
- operational simplicity
- repeatable onboarding

## What success looks like before expanding
- at least 3 strong case studies
- repeatable implementation motion
- one dominant story that clearly wins in-market
- stable economics at local scale

## Expansion order
1. Triangle
2. North Carolina
3. Selective Southeast
4. Vertical expansion through similar organizations and networks

---

# 8. Final conclusion

The strongest version of Clear Path is **not**:
- just a cheaper giving platform
- just a wallet product
- just a social-impact app

It is:

> **a financial operating layer for mission-driven organizations that makes money easier to receive, govern, grow, and deploy.**

The correct sequence is:
- save money first
- earn trust second
- deepen treasury adoption third
- unlock deployment economics fourth
- realize the full mission on top of proven infrastructure
