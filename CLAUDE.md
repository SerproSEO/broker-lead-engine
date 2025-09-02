# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Broker Lead Engine - A digital marketing agency specializing in lead generation for insurance agencies making $1-5M per year. We provide Facebook Ads, Google Ads, and SEO services, plus a custom GPT agent that helps insurance agents scrape, nurture, and close leads automatically.

## Business Model
### Core Services
1. **Facebook Ads Management** - Targeted campaigns for insurance agencies
2. **Google Ads Management** - Search and display advertising
3. **SEO Services** - Local and organic search optimization
4. **GPT Lead Agent** - Custom AI agent for lead scraping, nurturing, and closing

### Target Market
- **Primary**: Insurance agencies with $1-5M annual revenue
- **Sweet Spot**: Agencies looking to scale from $1M to $5M
- **Pain Points**: Manual lead management, inconsistent follow-up, low close rates

## Vision & Goals
- **Company**: Broker Lead Engine LLC (formerly Serpro SEO LLC)
- **Your Vision**: Build a marketing agency to $100K per month within 1 year
- **Core Offering**: Done-for-you lead generation (Facebook, Google, SEO) + AI agent for lead management
- **Unique Value**: We generate the leads AND provide the AI to convert them

## Current Status (2025-09-01)
- **PIVOT**: Moving from MCP automation to traditional digital marketing + GPT agent
- **Real Client Experience**: 3 clients with proven SEO and ads success
  1. Meditation temple - Ranked top 3 within 25 miles
  2. Connecticut contractor - Ranked top 3 in state
  3. Long Island dress boutique - Ranked top 3 within 20 miles
- **New Focus**: Cyber insurance and professional liability agencies ONLY
- **Beta Offer**: First 3 clients get lifetime free AI lead scanner
- **Target Markets**: Florida and Nevada (NOT Texas)
- Project running from: `C:\Users\b\Documents\GitHub\broker-lead-engine21`

## Business Foundation Defined
- **Services**: Facebook Ads, Google Ads, SEO, AI Lead Scanner
- **Pricing**: $2,997/$4,997/$7,997 monthly packages
- **Guarantee**: 90-day ROI positive or money back
- **See**: `business-core/BUSINESS_FOUNDATION.md` for complete details

## GPT Agent Features (To Build)
### Lead Scraping
- Pull leads from multiple sources (LinkedIn, Google Maps, directories)
- Qualify leads based on insurance agency criteria
- Enrich data with contact information

### Lead Nurturing
- Automated email sequences
- Personalized follow-up messages
- Appointment scheduling
- Lead scoring and prioritization

### Lead Closing
- Objection handling scripts
- Quote generation assistance
- Contract preparation
- Handoff to human agent when needed

## API Keys & Tools Needed
✅ **Configured:**
- Firecrawl API: `fc-ff2409277e1b443eb8a51ca3a7221c5e` (for web scraping)
- DataForSEO: `sam@serproseo.com` / `Ochoacueva1.` (for SEO research)
- Perplexity API: `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` (for research)

❌ **To Configure:**
- OpenAI API (for GPT agent)
- Google Ads API (for campaign management)
- Facebook Marketing API (for Meta ads)
- Stripe (for payment processing)
- Email service (SendGrid/Postmark for nurturing)
- CRM integration (HubSpot/Pipedrive)

## Common Commands
- **Use Claude Opus**: `claude-opus` (batch file in C:\Users\b\ and added to PATH)

## Memory Update Process
When you say **"update memory"** or **"update your memory"**, I will:
1. Add new conversation context and decisions to this file
2. Update any changed requirements or system modifications  
3. Record new insights, problems solved, or lessons learned
4. Maintain complete continuity across all terminal sessions Before starting work
Always in plan mode to make a plan
After you get the plan, make sure you write the plan to .claude/tasks/TASK_NAME.md
The plan should be a detailed implementation plan and the reasoning behind it, as well as tasks broken down
If the task requires external knowledge or a certain package, also research to get the latest knowledge (use Task tool for research)
Don’t over-plan it, always think MVP
Once you write the plan, firstly ask me to review it. Do not continue until I approve the plan

While implementing
You should update the plan as you work
After you complete tasks in the plan, you should update and append detailed descriptions of the changes you made, so following tasks can be easily handed over to other engineers.