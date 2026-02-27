# V2 Redesign — Decision Notes for Jonathan

## Things You Might Want Different

1. **Color scheme** — I went with deep navy (#1e3a5f) + blue + green accents. You might prefer something warmer, or want to match Primerica's brand colors. Easy to swap.

2. **Headshot** — ✅ Your current photo (`IMG_20260216_184332_190.jpg`) looks professional and works great. No change needed.

3. **Blog strategy** — I removed the inline overlay blog system (where posts opened as popups) and made them all separate pages. The Dow 50k post was extracted to its own file. If you preferred the popup style, we can bring it back.

4. **Removed dead links entirely** — Footer no longer has "Insurance Basics", "Retirement Tips", "College Savings Strategies", "YouTube", or "Newsletter" links since they went nowhere. If you want placeholder pages for these, let me know.

5. **"Book a Call" floating button** — Added a persistent floating button on every page linking to your Zoom scheduler. Some people find these annoying. Easy to remove if you don't like it.

6. **Calculator math untouched** — All JavaScript calculation logic is preserved exactly. If any of the formulas need updating (e.g., Primerica rate changes), that's a separate task.

7. **Email capture** — ✅ All 6 calculators and 21 Sources of Cash now have Formspree integration (endpoint: `xkovojay`). 21 Sources is fully email-gated (content hidden until email submitted). Calculators show results but offer email report capture.

8. **Dashboard page** — Not included in v2. It was an internal content pipeline dashboard, not client-facing. If you want it, say the word.

9. **21 Sources of Cash** — Included but it's a workshop/tool page. Consider whether this should be a gated resource (email required to access) for lead gen.

10. **Phone number** — Site says "Contact via Email" but no phone number. If you want a business number displayed, we should add it.

## Domain Name Availability (checked 2026-02-27)

### ❌ Already Taken
- PlanWithParker.com — taken (was my #1 pick, unfortunately)
- TriangleMoneyCoach.com — taken

### ✅ Available
- **ParkerFinancialNC.com** — Professional, name-branded, state-specific ⭐ MY TOP PICK
- **MoneySmartTriangle.com** — Approachable, educational
- **TriangleFamilyFinance.com** — Community-focused
- **TriangleFinancialCoach.com** — Clear positioning
- **NCMoneyCoach.com** — Short, broader than Triangle
- **JonathanParkerFinancial.com** — Full name, very professional
- **TriangleFamilyPlanner.com** — Family-focused

### Recommendation
**ParkerFinancialNC.com** — Professional, memorable, includes your name for trust, and "NC" signals local. Works great for SEO ("Parker Financial NC" is a natural search query). ~$10-12/year on Namecheap or Google Domains.

## Pre-Launch Checklist
- [ ] Choose domain name
- [ ] Buy domain (~$10-12)
- [ ] Set up GitHub Pages custom domain (CNAME file)
- [ ] Upload a good headshot photo
- [ ] Set up Google Analytics (free)
- [ ] Wire up Formspree for insurance calculator email
- [ ] Test all calculators on mobile
- [ ] Review & approve design
