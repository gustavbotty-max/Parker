# Clear Path

## Overview
Clear Path began as a social-impact concept focused on homelessness support, then evolved into a broader fintech infrastructure business centered on revenue recovery, cash-flow acceleration, and controlled spending for North Carolina organizations.

Core thesis:
- recover money lost to payment/giving friction
- reduce settlement delay and idle float
- optionally use stablecoin rails (USDC / Solana) for faster treasury movement
- build long-term financial and operational infrastructure that can later support the original social-impact mission

## Current Strategic Framing
The business has shifted from a strictly "Homelessness First" pitch to a higher-velocity **Revenue Recovery** model.

Primary go-to-market logic:
- solve immediate cash-flow and fee problems for organizations
- use those revenue-generating deployments to fund the longer-term mission vision
- avoid leading with crypto externally; lead with lower fees, faster access to funds, transparency, security, and operational efficiency

## GTM / Partner Stack (Raleigh-Cary)

### 1. Cash-Flow Anchor — The Summit Church
- Approx scale: ~$56M annual tithes
- Opportunity thesis: recapture an estimated $1.6M+ likely lost annually to fees and use large float balances for yield / treasury efficiency
- Strategic role: flagship high-volume anchor account

### 2. Efficiency Play — Hayes Barton UMC
- Approx scale: ~$4M–$5M annual giving
- Opportunity thesis: replace legacy Realm / Vanco-style giving stack with a more transparent and efficient system
- Pain points identified: monthly subscriptions, hidden ACH percentages, and legacy giving inefficiency
- Strategic role: credible church replacement case study

### 3. Mission Pilot — CASA (casanc.org)
- Opportunity thesis: resident stability + nonprofit program controls
- Product angle: Lithic-backed "Stability Card" for rent collection and benevolence-to-rent loops
- Operational promise: help prevent evictions and automate HUD / HMIS reporting flows
- Strategic role: bridge from revenue-generating fintech into original social-impact mission

## Product / Moat Thesis
Clear Path is not just a cheaper Stripe-like payment layer. The differentiated thesis is vertical specialization.

### Moat components
- **Restricted spend:** use issuing/auth controls (for example via Lithic auth stream) to block disallowed purchase categories such as alcohol or cash-back in real time
- **Dual-rail privacy / treasury:** use USDC for compliant, practical stable settlement and potentially decentralized stables (such as JupUSD) for more sovereign or wealth-building fund structures
- **Operational recovery:** eliminate multi-day payroll / settlement float ("payroll purgatory") and give organizations materially more liquidity days per year

## Architecture Thesis
### Dollar's Journey
Legacy system model:
- a $100 donation from a Hayes Barton member to a CASA tenant can lose roughly $12 to intermediaries and take 5–7 days to settle

Desired Clear Path model:
- that same $100 becomes roughly $99 net
- settles essentially instantly
- begins earning ~4% yield immediately upon reaching the target wallet / balance layer

## Church / Nonprofit Product Concepts
### Church giving / treasury path
- organizations may accept donor payments via normal rails (card / ACH / fiat / crypto)
- balances may be normalized into USDC / Solana wallet infrastructure behind the scenes
- long-term model may include offering both:
  - fiat-to-fiat path at competitive or slightly lower incumbent pricing
  - fiat-to-Solana / USDC path at lower fees with stronger speed / transparency / treasury benefits

### Controlled spend / card issuing path
- original homelessness-support concept remains strategically important
- donor-visible social profiles tied to giving cards
- nonprofit custody of funds for beneficiaries
- weekly budgeting (example: $100–$200/week)
- MCC / merchant controls to restrict misuse
- donor tax deductibility preserved through nonprofit structure
- possible future church/nonprofit extension: issued cards tied to organization balances for controlled ministry/program spend

## Revenue Model Ideas Under Discussion
Potential revenue lines:
1. donation / platform fee revenue
2. treasury / conversion / yield revenue
3. interchange / spend-management revenue

Working hypothesis:
- interchange and controlled-spend infrastructure may be a stronger long-term revenue engine than trying to win only on low donation fees
- best business may be a combination of giving + treasury + spend controls

## Positioning Lessons
- Do **not** lead with crypto, Solana, or blockchain language in customer-facing messaging
- Lead with:
  - lower fees
  - faster access to funds
  - transparency
  - security
  - more money to mission
  - local NC trust and support
- For churches specifically, initial positioning should focus on keeping more of every gift and improving treasury efficiency, not crypto ideology

## Competitive Context
Relevant competitors and incumbent patterns discussed:
- Realm / ACST
- Vanco
- Planning Center
- Pushpay
- Tithely
- Subsplash

Observed pattern:
- many churches appear to be paying meaningful card/ACH processing costs plus platform overhead
- incumbents often win on bundling, inertia, and admin familiarity rather than true fee / treasury optimization


## Wallet Access / Governance Direction
The preferred architecture direction is **Option C: governed wallet access**.

### Why Option C
Clear Path likely cannot avoid wallet-backed infrastructure if Solana / USDC is truly part of the treasury layer, but raw self-custody would create major UX and operational problems, while fully Clear Path-managed custody increases regulatory and trust burden.

Option C is the middle path:
- wallet-backed accounts exist under the hood
- customer experience feels like a governed business treasury account, not a crypto-native wallet app
- organizations have role-based access rather than universal raw key control
- recovery, multi-device access, and approval workflows are built in from day one

### Architecture principles
- **Wallet-backed, not wallet-first**
- **Org-controlled, not founder-controlled**
- **Recoverable, not seed-phrase-dependent**
- **Role-based, not all-or-nothing**
- **Approval-driven for sensitive treasury actions**
- **Auditable at every important action**

### Example permission model
- **Treasurer / Finance Admin**
  - view balances
  - initiate transfers
  - manage fund permissions
  - approve settlements
- **Executive / Senior Admin**
  - approve major actions
  - manage admins / policy rules
  - read treasury and fund reporting
- **Program / Operations Admin**
  - manage budgets and card controls
  - approve program disbursements
  - view restricted funds and spend
- **Cardholder / Staff User**
  - spend within assigned rules only
  - no direct treasury control

### Required day-one capabilities
- multi-device login / verification
- recoverable account access
- multiple org admins
- role-based permissions
- approval rules for sensitive treasury actions
- audit trail of logins, approvals, recoveries, and money movement

### Product framing
Externally, this should be framed as a **Clear Path Treasury Account** or governed treasury system, not as a raw Solana wallet. The wallet is infrastructure; the user-facing product is secure business account access with policy and recovery.


## Roadmap Item: ACH / Wire Migration Incentives
A high-priority early roadmap item is to create a simple donor or customer migration incentive that encourages switching from card-based giving to ACH / bank transfer / wire where appropriate.

### Why this matters
- lowers processing costs for churches and nonprofits quickly
- creates immediate visible ROI that Clear Path can point to early in a relationship
- improves unit economics for both the customer and Clear Path
- gives sales a simple practical proof point: "we helped you save ~2% and we're just getting started"
- aligns with the goal of delivering obvious value right up front rather than waiting for more advanced treasury features

### Product direction
- make ACH/bank setup extremely easy (for example via Plaid-like bank linking)
- focus first on recurring donors and higher-value repeat donors, where fee savings compound over time
- possible one-time switch incentive or reward for moving recurring giving from card to ACH
- likely better to frame around helping the mission keep more money than around warning donors about card fees

### Why it fits the broader model
This feature does not depend on the full long-term treasury or card vision to create value. It can act as a practical beachhead feature that produces measurable savings and trust early while larger treasury, reporting, and controlled-spend systems are still being built.


### Additional competitor cluster: tap / connect / church communication layer
These are not all direct giving competitors, but they matter because they compete for the front-end church relationship around communication, engagement, QR/NFC interactions, and digital next steps.

- **Clearstream** — church texting/email platform with tap tags, workflows, custom microsites, QR codes, and church communication tooling. Tap Tags are advertised at roughly **$2 each** with free shipping. Strong competitor on the church engagement / “tap to connect” wedge.
- **Text In Church** — church texting and guest follow-up platform focused on digital connect cards, workflows, follow-up automation, and retention.
- **Overflow Tap** — part of Overflow’s generosity/giving product family; likely strong specifically around tap-enabled generosity experiences.
- **Twilio** — not a direct church product, but the raw communications infrastructure layer that can power texting, automation, and verification for other products.
- **Gloo** — faith ecosystem technology platform focused on connection and engagement at a broader ecosystem level.
- **Flocknote** — church communication, household database, online giving, donor management, and registrations in one church-specific platform.
- **EZ Texting** — general SMS marketing platform with text-to-pay and text-to-give style features, but not church-native in the same way as the church-specific products.

### Strategic read on this competitor cluster
- **Clearstream** is the most relevant near-term comparison for the emerging “Tap to Connect” concept because it already frames NFC/tap products as connection tools for giving, volunteering, and more, not just money asks.
- **Text In Church** competes more on communication, guest follow-up, and retention than on treasury or money infrastructure.
- **Overflow Tap** appears relevant on generosity UX specifically, but less obviously on treasury, transparency, or controlled spend.
- **Twilio** is mostly infrastructure, not a true church product competitor.
- **Gloo** competes for the broader faith-tech relationship layer, not the financial operating layer directly.
- **Flocknote** is a serious church software competitor because it combines communication + giving + database features in one place.
- **EZ Texting** is more of a horizontal SMS platform than a direct church-fintech product.

### How Clear Path can stack up against this cluster
The strongest angle is not to out-Clearstream Clearstream on messaging or out-Twilio Twilio on raw communications. Clear Path should differentiate by combining:
- modern church-facing connection tools (e.g. Tap to Connect)
- giving and ACH migration
- restricted-fund / granular transparency
- treasury direction over time
- eventually controlled spend / deployment logic

In other words:
- **Clearstream / Text In Church / Flocknote** win on communication and engagement
- **Clear Path** can become stronger if it turns connection into the top of a deeper financial operating system


## Funding / Timeline
### NC IDEA
- Spring 2026 applications closed: Feb 23, 2026
- Fall 2026 cycle expected to open in late July 2026

### Near-term goal
Use the next ~4 months to run a "Fee-Killer" pilot with a high-volume partner (for example an animal shelter or a mid-sized church) and prove the ~1% revenue model before applying for the $50K NC IDEA SEED grant in August 2026.

## Key Open Questions
- What is the cleanest initial revenue model: platform fees, interchange, yield, or some combination?
- For church customers, should USDC / Solana remain invisible backend infrastructure or be offered as a clearly differentiated settlement option?
- What is the right first pilot partner: flagship church, mid-sized church, or mission-oriented nonprofit?
- What sponsor bank / issuing / conversion stack makes the controlled-spend model viable without excessive regulatory burden?
