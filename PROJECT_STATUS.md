# The Workshop — Project Status

## Overview
Personal app hub for sharing projects with friends and family. Static landing page with download links, platform badges, and guided setup walkthroughs for apps that need API keys.

- **Stack:** Static HTML/CSS/JS (Vercel hosting, custom domain planned)
- **GitHub:** ConnectorOfKnowledge/the-workshop (NOT YET CREATED)
- **Domain:** apps.lonniebarkby.com (purchased LonnieBarkby.com on Spaceship.com)
- **Phase:** Initial Build — Landing page complete, needs deployment

## What's Built
- Full landing page (index.html, style.css, app.js)
- Three-tier filter system (Free / Needs API / Fully Functioning)
- Interactive filter tabs (All / Free / API / Pro)
- Setup guide modals for CleanDictate (Gemini API walkthrough) and Prattle (speech-to-text options)
- Responsive design with mobile breakpoint
- Clean Catalog visual direction: white bg, gray sections, blue accent

## Architecture
- Three-tier app organization:
  - **Free to Use** — download and run, no setup needed
  - **Needs API Key** — free app, user provides their own key (modal walkthrough guides)
  - **Fully Functioning** — subscription tier, uses Lonnie's infrastructure (future, needs Stripe)
- Clean Catalog visual direction: white bg, gray sections, blue accent, tab filters
- "The Workshop — Apps by Lonnie" branding

## Initial App Lineup
| App | Platform | Tier | Status |
|-----|----------|------|--------|
| tikscribe | Android | Free to Use | Ready |
| CleanDictate | Android | Needs API Key | Ready |
| Prattle | Windows | Needs API Key | Ready |

## Key Decisions
- Three tiers instead of platform-based sections (Free / API / Paid)
- Modal/overlay walkthrough for API key setup guides
- Clean Catalog design direction (white, blue accent, professional)
- Custom domain: apps.lonniebarkby.com (via Hostinger DNS)
- Shared apps must be self-contained — no shared Supabase backend
- Non-technical audience — setup guides must be crystal clear

## Where We Left Off
- Landing page HTML/CSS/JS is complete and verified locally
- Domain LonnieBarkby.com purchased on Hostinger
- Need to: create GitHub repo, deploy to Vercel, configure Hostinger DNS for apps.lonniebarkby.com subdomain
- Lonnie needs walkthrough for first-time Hostinger DNS setup

## Next Steps
1. Create GitHub repo and push code
2. Deploy to Vercel
3. Walk through Hostinger DNS setup (apps.lonniebarkby.com → Vercel)
4. Add real download links (replace # placeholders)
5. Add app icons/logos (currently text abbreviations)
6. Fully Functioning subscription tier (Stripe, later)
