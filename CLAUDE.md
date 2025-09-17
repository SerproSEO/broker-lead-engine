# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Hook Configuration

## Task Completion Sound Hook

```yaml
hooks:
  task_completion:
    trigger: "todo_completed"
    command: "powershell -c (New-Object Media.SoundPlayer 'C:\\Windows\\Media\\chimes.wav').PlaySync()"
    description: "Play sound when Claude completes a task"
```

## Project Overview

Broker Lead Engine LLC is a specialized digital marketing agency focused on professional liability insurance agencies. The website is built as a static HTML/CSS/JavaScript site targeting $1M-$5M revenue insurance agencies primarily in NY (expanding to CT/NJ/PA/FL/NV/AZ).

## Development Commands

This is a static website project with no build system. Development involves:

- **Local Development**: Use any HTTP server (e.g., `python -m http.server 8000` or Live Server extension)
- **Content Generation**: Run Python scripts to generate pages at scale
  - `python generate_content.py` - Generate specific content pages
  - `python generate_all_content.py` - Generate all 360+ pages for full SEO coverage
- **Testing**: Manual testing in browsers (no automated test suite)

## Architecture & File Structure

### Core Website Files
- `index.html` - Homepage focused on professional liability insurance SEO
- `styles.css` - Complete styling system (3800+ lines) with CSS custom properties
- `script.js` - Analytics tracking, smooth scrolling, modal functionality
- `logo.png` - Company branding asset

### Landing Pages
- `professional-liability-seo.html` - Main service page
- `new-york-professional-liability-seo.html` - Location-specific landing page
- `legal-malpractice-insurance-seo.html` - Industry-specific page
- `about.html`, `contact.html` - Standard pages
- `privacy.html`, `terms.html` - Legal pages

### Content Generation System
The project uses a Python-based template system for programmatic SEO:

- **Templates**: 8 HTML templates for different page types (pillar, cluster, location, tool, FAQ, guide, playbook, blog)
- **Generation Scripts**: Python scripts that populate templates with keyword data
- **Content Database**: Extensive keyword lists and content variables for insurance industry

### Template Architecture
Templates use placeholder variables (e.g., `{{MAIN_KEYWORD}}`, `{{CITY_NAME}}`) that get replaced by Python scripts:
- `pillar-page-template.html` - Comprehensive topic pages
- `cluster-page-template.html` - Supporting content pages
- `location-page-template.html` - City/region-specific pages
- `faq-page-template.html` - Question-answer format pages
- `guide-page-template.html` - Actionable tip-based content (Backlinko style)
- `playbook-template.html` - Actionable tip-based content (identical to guide)
- `tool-page-template.html` - Calculator/tool pages
- `blog-page-template.html` - Blog posts and cluster content

### SEO Infrastructure
- `sitemap.xml` - Search engine sitemap
- `robots.txt` - Search engine directives
- Comprehensive meta tag structure across all pages
- Google Analytics tracking integration

## Content Strategy Files

Documentation files contain marketing strategy and keyword research:
- `CONTENT_ARCHITECTURE_BLUEPRINT.md` - Content strategy framework
- `CONTENT_CALENDAR_IMPLEMENTATION.md` - Editorial calendar
- `PROFESSIONAL_LIABILITY_KEYWORDS_1000.md` - Primary keyword database
- `COMPETITIVE_INTELLIGENCE_ANALYSIS.md` - Market analysis

## Design System

The CSS uses a custom property system with:
- **Colors**: Primary blue (`--primary: #3b82f6`), accent green (`--accent: #10b981`)
- **Typography**: Inter font family with multiple weights
- **Components**: Reusable classes for buttons, cards, forms, navigation
- **Responsive**: Mobile-first approach with breakpoints

## Key Features

1. **Professional Liability Focus**: All content targets professional liability insurance specifically
2. **Local SEO Optimization**: City and state-specific landing pages
3. **Guarantee Structure**: 100% money back guarantee if no results in 6 months, 50% discount after month 3
4. **Template-Driven Content**: Scalable content generation for hundreds of pages
5. **Analytics Tracking**: Google Analytics integration for performance monitoring

## Business Context

- **Target Market**: Insurance agencies with $1M-$5M annual revenue
- **Service Pricing**: $2,497/month Local SEO Domination Package
- **Geographic Focus**: New York (primary), expanding to CT/NJ/PA/FL/NV/AZ
- **Guarantee**: 6-month money-back guarantee with 50% discount after month 3

## Content Guidelines

When working with content:
- Maintain professional, authoritative tone
- Focus on professional liability insurance (not general insurance)
- Include local geographic references where appropriate
- Emphasize the money-back guarantee and track record
- Use insurance industry terminology correctly
- Ensure all content supports the $1M-$5M revenue agency target market

## CRITICAL RULE: Menu Consistency

**THE MENUS MUST MATCH ACROSS ALL TEMPLATES! ALWAYS!**

### Standard Navigation Menu Structure
```html
<nav class="nav" id="navigation">
    <a href="index.html" class="nav-link">Home</a>
    <div class="nav-dropdown">
        <a href="professional-liability-seo.html" class="nav-link">Services</a>
        <div class="dropdown-menu">
            <a href="professional-liability-seo.html" class="dropdown-link">Professional Liability SEO</a>
            <a href="new-york-professional-liability-seo.html" class="dropdown-link">New York SEO</a>
            <a href="legal-malpractice-insurance-seo.html" class="dropdown-link">Legal Malpractice SEO</a>
        </div>
    </div>
    <a href="about.html" class="nav-link">About</a>
    <a href="contact.html" class="nav-link">Contact</a>
    <a href="#demo" class="cta-button">Get Started</a>
</nav>
```

### Menu Consistency Rules:
1. **NEVER** use generic insurance terms like "Insurance Agent SEO" or "Lead Generation"
2. **ALWAYS** focus on professional liability insurance specifically
3. **NEVER** include "Cyber Insurance" in the main navigation dropdown
4. **ALWAYS** use the exact three dropdown links shown above
5. **ALWAYS** use the same CTA button styling and positioning
6. **VERIFY** menu consistency before deploying any template changes

### Template Types and Their Menu Requirements:
- All template files (`*-template.html`) must use the standard menu
- All generated pages must inherit this exact menu structure
- Any deviations from this standard menu are considered bugs and must be fixed immediately

  # CRITICAL DESIGN CONSISTENCY RULES

  ## Header & Footer Requirements
  **ABSOLUTELY CRITICAL**: ALL pages must use the EXACT same header and footer as index.html

  ### Header Consistency Rule
  - Copy the entire `<header class="header">` section from index.html to ALL templates
  - NEVER modify the navigation structure, styling, or links
  - The header includes:
    - Logo with correct src="logo.png"
    - Menu toggle button for mobile
    - Navigation with exact dropdown structure:
      - Home → index.html
      - Services dropdown → professional-liability-seo.html
        - Professional Liability SEO → professional-liability-seo.html
        - New York SEO → new-york-professional-liability-seo.html
        - Legal Malpractice SEO → legal-malpractice-insurance-seo.html
      - About → about.html
      - Contact → contact.html
      - Get Started CTA button → #demo

  ### Footer Consistency Rule
  - Copy the entire `<footer class="footer">` section from index.html to ALL templates
  - Must include:
    - Footer links (Privacy Policy, Terms of Service, Contact)
    - Legal disclaimer with exact wording
    - Copyright notice: "© 2025 Broker Lead Engine LLC. All rights reserved."

  ### Button & CTA Consistency
  - ALL buttons must use the site-wide CSS variables:
    - `--accent-gradient` for background
    - `--white` for text color
    - 100px border-radius (fully rounded)
    - Proper hover effects with translateY(-3px) and enhanced shadows
    - Arrow animation (→) that slides on hover

  ### CSS Variables (NEVER change these)
  ```css
  :root {
      --primary: #3b82f6;
      --primary-dark: #2563eb;
      --primary-light: #60a5fa;
      --accent: #10b981;
      --accent-light: #34d399;
      --white: #ffffff;
      --accent-gradient: linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%);
  }

  Design Verification Checklist

  Before completing ANY template work:
  1. ✅ Header exactly matches index.html
  2. ✅ Footer exactly matches index.html
  3. ✅ All buttons use consistent styling
  4. ✅ Navigation dropdown has correct 3 links
  5. ✅ CTA buttons use --accent-gradient
  6. ✅ Proper spacing from header (120px margin-top minimum)

  **FAILURE TO FOLLOW THESE RULES RESULTS IN BROKEN DESIGN CONSISTENCY**

## ABSOLUTE CRITICAL RULE: COPY-PASTE ONLY

**NEVER RECREATE HEADERS OR FOOTERS FROM SCRATCH**

### The ONLY Acceptable Method:
1. Open index.html
2. Find the EXACT header section from `<!-- Header (Fixed at top) -->` to `</header>`
3. COPY the entire section (including all comments and spacing)
4. PASTE it exactly into the template
5. Do NOT modify spacing, comments, or structure

### What Causes Sizing Issues:
- Retyping the header manually
- Missing comments like `<!-- Header (Fixed at top) -->`
- Different spacing or indentation
- Any modifications to the original structure

### Template Header Replacement Process:
```bash
# ALWAYS follow this exact process:
1. cp index.html temp.html
2. Extract header section from temp.html
3. Replace target template header with EXACT copy
4. Verify spacing matches pixel-perfect
```

### Emergency Fix Protocol:
If headers don't match:
1. STOP immediately
2. Re-copy header from index.html
3. Replace entire header section in template
4. Test that sizing matches exactly

**NEVER TRUST MEMORY - ALWAYS COPY FROM SOURCE**
- memory
- memory
- memory