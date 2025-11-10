# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for JayaShankar Mangina, built as a static site and hosted on GitHub Pages. The site is a single-page application with smooth scrolling navigation between sections showcasing skills, projects, experience, education, and contact information.

**Tech Stack:**
- Vanilla HTML5, CSS3, and JavaScript (no build tools or frameworks)
- Font Awesome for icons
- Google Fonts (Inter, Roboto, Fira Code)
- GitHub Pages for hosting

**Live Site:** https://jyshnkr.github.io

## Development Commands

Since this is a static site with no build process, development is straightforward:

**Local Development:**
```bash
# Open index.html directly in browser, or use a simple HTTP server:
python -m http.server 8000
# or
npx http-server
```

**Deployment:**
```bash
# Simply push to main branch - GitHub Pages auto-deploys
git add .
git commit -m "Your message"
git push origin main
```

## Architecture and Code Structure

### File Organization

```
.
├── index.html           # Single-page application with all sections
├── css/
│   ├── styles.css       # Main stylesheet with CSS variables
│   └── placeholders.css # Placeholder styles for images
├── js/
│   └── main.js          # All JavaScript functionality
└── assets/
    └── JayaShankarMangina_Resume.pdf
```

### CSS Architecture (styles.css)

The stylesheet uses a **CSS custom properties** (variables) system defined in `:root` for maintainability:

**Color System:**
- `--primary`: #0366D6 (GitHub blue - used for primary CTAs)
- `--secondary`: #28A745 (Success green for highlights)
- `--accent`: #F9826C (Coral for attention points)
- `--background`: #F6F8FA (Light gray main background)
- `--dark-bg`: #24292E (Dark sections like footer)
- `--text`: #24292E (Primary text color)
- `--light-text`: #FFFFFF (Text on dark backgrounds)
- `--muted-text`: #586069 (Secondary information)

**Typography:**
- Headings: `--heading-font` (Inter)
- Body text: `--body-font` (Roboto)
- Code snippets: `--code-font` (Fira Code)

**Responsive Design:**
- Mobile-first approach
- Breakpoints at 640px (tablet) and 1024px (desktop)
- Mobile navigation uses hamburger menu (`.nav-toggle`)

### JavaScript Functionality (main.js)

All interactivity is in `main.js` with the following key features:

1. **Mobile Navigation Toggle** (lines 3-21)
   - Hamburger menu for mobile screens
   - Closes menu when navigation link clicked

2. **Active Navigation Highlighting** (lines 23-42)
   - Updates active nav link based on scroll position
   - Uses 100px offset for better UX

3. **Project Filtering** (lines 44-67)
   - Filter buttons with `data-filter` attribute
   - Project cards with `data-category` attribute
   - Shows/hides projects based on selected filter

4. **Skill Bar Animation** (lines 69-90)
   - Animates skill bars on scroll into view
   - Triggered at 80% viewport height
   - Uses `data-percent` attribute on `.skill-level` elements

5. **Contact Form Handling** (lines 92-114)
   - Prevents default form submission
   - Currently shows alert (no backend integration)
   - Form data logged to console for debugging

6. **Smooth Scrolling** (lines 126-145)
   - Smooth scroll to section on nav link click
   - Closes mobile menu after navigation

### HTML Structure (index.html)

The site follows a **semantic section-based layout**:

1. `<header>` with fixed navigation bar
2. `#home` - Hero section with CTA buttons
3. `#about` - About me with profile placeholder
4. `#skills` - Technical skills with animated bars (uses `data-percent` attribute)
5. `#projects` - Project showcase with filter buttons (uses `data-category` and `data-filter`)
6. `#experience` - Work experience timeline
7. `#education` - Academic background
8. `#contact` - Contact form with social links
9. `<footer>` - Copyright and back-to-top

**Key Patterns:**
- Sections use `.container` for consistent max-width
- All sections have unique `id` attributes for navigation
- Skill levels use inline `style="width: 0;"` initially, animated via JS
- Project cards use `data-category` for filtering
- Filter buttons use `data-filter` to specify category

## Design System

Refer to `design_notes.md` for detailed design specifications including:
- Component layouts and structure
- Complete color palette with hex codes
- Typography hierarchy
- Responsive design breakpoints
- Animation and interaction patterns

## Important Implementation Details

**Skill Bars:**
- Each `.skill-level` element requires a `data-percent` attribute (e.g., `data-percent="95"`)
- Initial inline style should be `style="width: 0;"`
- JavaScript animates width on scroll using the `data-percent` value

**Project Filtering:**
- Filter buttons need `data-filter` attribute (e.g., `data-filter="web"`)
- Project cards need matching `data-category` attribute
- Use `data-filter="all"` to show all projects

**Navigation:**
- Navigation links must have `href="#section-id"` matching section IDs
- Active class is automatically managed by scroll position
- Mobile menu uses `.active` class for visibility

**Resume Download:**
- Resume file should be at `assets/JayaShankarMangina_Resume.pdf`
- Link uses `download` attribute for direct download

## Content Updates

When updating content:
1. **Projects:** Add new `.project-card` divs in the `#projects` section with appropriate `data-category`
2. **Skills:** Add new `.skill-item` divs with `data-percent` attribute
3. **Experience/Education:** Follow the existing timeline HTML structure
4. **Resume:** Replace PDF in `assets/` folder (note: current filename has underscore in "JayaShankar_SWE_Resume.pdf" but index.html references different filename)

## Known Issues

- Resume filename mismatch: index.html:48 links to "JayaShankar_SWE_Resume.pdf" but actual file is "JayaShankarMangina_Resume.pdf"
- Contact form has no backend integration (currently shows alert only)
- Profile image uses placeholder (see `placeholders.css`)
