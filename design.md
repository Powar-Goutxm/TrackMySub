# Design System: TrackMySub — The Forensic Subscription Ledger

## 1. Visual Theme & Atmosphere
TrackMySub is an architectural, high-clarity personal subscription and recurring expense management platform. It rejects all generic fintech tropes, crypto gamification, and floating 3D credit cards.

The atmosphere is **"Forensic Paper & Dark Obsidian Terminal"** — combining the quiet, focused precision of a developer tool (Linear, Raycast) with the tactile honesty of a physical paper receipt and forensic audit ledger.

- **Visual Density:** Cockpit Balanced (7 / 10). High-density numeric data and tabular subscription rows structured with generous macro-whitespace around major functional zones.
- **Variance:** Offset Asymmetric (7 / 10). A bold animated split-screen diagnostic hero juxtaposed with structured tabular ledger streams and dedicated audit callouts.
- **Motion Philosophy:** Tactile Spring Dynamics (5 / 10). Motion is purposeful and physical: smooth animated counter reveals ("What You Think You Pay" → "What Silently Renews"), tactile spring-physics row expands (`stiffness: 140, damping: 22`), and zero gratuitous loops.

---

## 2. Color Palette & Functional Roles
The palette is built upon deep Obsidian bases, warm Receipt Ivory typographic ink, and an authoritative **Receipt Coral** signature accent, with **Restrained Amber** reserved strictly for verified warnings.

### A. Core Neutral Surfaces (Zero Warm/Cool Mismatch)
- **Ink Obsidian** (`#101318`) — Primary canvas background. Deep, grounded, non-pure-black matte surface.
- **Graphite Surface** (`#191E25`) — Primary container fill for cards, ledger rows, and table shells.
- **Elevated Graphite** (`#222832`) — Hover states, modal drawers, active segmented controls, and dropdown sheets.
- **Recessed Obsidian Inset** (`#0B0D11`) — Inset data wells, search inputs, and timeline horizon tracks.
- **Hairline Divider** (`rgba(242, 238, 231, 0.08)` / `#2A313D`) — 1px razor-sharp structural lines separating table rows and card bezels. Never muddy drop shadows.

### B. Typographic Inks
- **Receipt Ivory** (`#F2EEE7`) — Primary text, subscription titles, total run-rate values, and critical metrics. Tactile warm paper feel.
- **Muted Slate** (`#8E97A4`) — Secondary text, descriptions, billing frequency notes, and renewal countdowns.
- **Graphite Steel** (`#5A6474`) — Inactive labels, table column headers, keyboard shortcut keys, and timestamps.

### C. Signature Brand Accent
- **Receipt Coral** (`#F26B50` / `rgb(242, 107, 80)`) — The sole signature brand accent. Saturation 72%, warmth and forensic punch. Used for primary interactive CTAs, active indicators, and audit highlights.
- **Coral Wash** (`rgba(242, 107, 80, 0.12)`) — Subtle background fill for active filter pills and selected rows.
- *Strict Rule:* Zero AI neon purple/blue button glows. Zero radial neon background blur orbs.

### D. Semantic Status Tokens (Evidence-Based & Desaturated)
- **Restrained Amber** (`#E08A3C` / `rgba(224, 138, 60, 0.12)` fill) — Reserved exclusively for verified billing warnings: approaching renewals (within 48 hours), user-confirmed price hikes, or trial expirations.
- **Verified Pine / Sage** (`#4E9B78` / `rgba(78, 155, 120, 0.12)` fill) — Active healthy subscriptions, cleared payments, and verified IDOR tenant isolation.
- **Dormant Slate** (`#4B5565` / `rgba(75, 85, 101, 0.15)` fill) — Paused services and archived subscriptions.

---

## 3. Typographic Architecture & Font System

The typographic system utilizes a disciplined editorial pairing: **`halyard-display-variable`** for high-impact structural typography, **`Arial`** for technical micro-tactile button labels, and **`JetBrains Mono`** for high-density financial lining numbers.

### Exact Typography Specifications
- **Section Heading:**
  - `font-family: 'halyard-display-variable', sans-serif;`
  - `font-size: 54.4px;` (`3.4rem`)
  - `font-weight: 500;`
  - `line-height: 48.96px;` (`0.9em`)
  - `letter-spacing: normal;`
  - `text-transform: uppercase;`
  - Color: Receipt Ivory (`#F2EEE7`)
- **Label:**
  - `font-family: 'halyard-display-variable', sans-serif;`
  - `font-size: 12.8px;` (`0.8rem`)
  - `font-weight: 500;`
  - `line-height: 13.952px;`
  - `letter-spacing: normal;`
  - `text-transform: uppercase;`
  - Color: Muted Slate (`#8E97A4`) or Receipt Coral (`#F26B50`)
- **Button:**
  - `font-family: Arial, sans-serif;`
  - `font-size: 8px;` (`0.5rem`)
  - `font-weight: 500;`
  - `line-height: normal;`
  - `letter-spacing: normal;`
  - `text-transform: uppercase;`
  - Styling: Micro-tactile pill labels reminiscent of technical hardware instrumentation and Braun/Dieter Rams engineering.
- **Body:**
  - `font-family: 'halyard-display-variable', sans-serif;`
  - `font-size: 14.4px;` (`0.9rem`)
  - `font-weight: 500;`
  - `line-height: 17.28px;` (`1.2em`)
  - `letter-spacing: normal;`
  - `text-transform: none;`
  - Color: Receipt Ivory (`#F2EEE7`)
- **Financial Telemetry (Monospace Tabular Lining):**
  - `font-family: 'JetBrains Mono', monospace;`
  - `font-feature-settings: 'tnum';`
  - Mandatory for all numerical currencies (`$284.50`), countdowns (`in 4d`), dates (`2026-10-14`), and card numbers (`Visa •••• 4012`).

---

## 4. Landing Page Architecture: The 3 Core Pillars

The landing page communicates three things immediately without filler text:
1. **See every subscription** (unfiltered visibility across all payment instruments).
2. **Anticipate renewals** (never get surprised by an auto-charge).
3. **Understand recurring spending** (monthly burn vs annual commitment).

### The Hero Section: Animated "Silent Leaks" Audit Diagnostic
Instead of generic 3D cards, the Hero features a split-screen animated diagnostic:
- **Left Column (6 cols):**
  - Label: `[ AUDIT TERMINAL v1.0 ]` in Receipt Coral.
  - Section Heading: "SEE EVERY SUBSCRIPTION. ANTICIPATE EVERY RENEWAL."
  - Body: High-precision recurring expense tracking with Zero-IDOR Spring Boot isolation.
  - Primary Action: Receipt Coral pill button with 8px uppercase Arial typography ("LAUNCH AUDIT ↗").
- **Right Column (6 cols) — Animated Audit Diagnostic Module:**
  - Double-bezel hardware container displaying an interactive before/after counter:
    - State 1: "What You Think You Pay" → `$148.00/mo` (Streaming + Music).
    - Animated Counter Shift: Numbers climb fluidly to `$382.40/mo` as hidden charges reveal:
      - Cloud compute idle instance (`+$64.20`)
      - Stealth price hike on creative suite (`+$15.00`)
      - Forgotten gym app trial transitioned to annual (`+$12.00/mo eq`)
      - Annual dev tool subscription renews next week (`+$143.20/mo eq`)
    - Result Tag: `+$234.40/MO HIDDEN BURN DETECTED`.

---

## 5. Dashboard Architecture & Screen Separation

To prevent information overload, features are strictly separated into dedicated domains:

### A. Main Dashboard (`/dashboard`)
The main dashboard serves everyday management and immediate financial awareness:
1. **The 30-Day Renewal Horizon (Top Anchor):**
   - Horizontal timeline bar plotting upcoming deductions across the next 30 days.
   - Immediate 72-hour burn callout (`IMPENDING 72H: $84.20`).
   - Clicking any day node filters the ledger below.
2. **The Master Ledger (Center Workhorse):**
   - High-density tabular view with search bar and quick category chips (`ALL`, `DEV & CLOUD`, `PRODUCTIVITY`, `MEDIA`, `UTILITIES`).
   - Per-row data: Brand logo pill (32px), Service Name, Category, Billing Frequency (`1M`, `1Y`), Monthly-Equivalent Cost, Actual Billed Amount, Next Charge Date, Days Remaining pill, Payment Card chip (`Amex •• 1004`), and Quick Status toggle.
3. **The Leak Sentinel Pod (Compact Diagnostic):**
   - Sits unobtrusively alongside the ledger.
   - Highlights subscriptions with **sufficient evidence** (e.g. user-marked idle, or verified price increase).

### B. Dedicated Calendar Page (`/calendar`)
- Full-month calendar heatmap and deduction clustering.
- Displays cashflow spikes against paydays.
- **Rule:** Never competes with the renewal horizon on the main dashboard.

### C. Dedicated Analytics Page (`/analytics`)
- Category spend breakdown (Infrastructure vs Entertainment vs Utilities).
- 12-month trailing spend velocity and projected annual burn trajectory.
- **Rule:** Detailed analytics live here, keeping the main dashboard fast and action-oriented.

---

## 6. Implementation Guardrail: The Honest Leak Sentinel

> [!IMPORTANT]
> TrackMySub never fakes AI omniscience. A subscription is ONLY flagged as an issue under strict evidence criteria:
> 1. **User-Marked:** The user explicitly toggled "Mark as Inactive / Review".
> 2. **Transaction Evidence:** Bank statement or webhook shows an exact price increase (e.g., $15.49 → $19.99).
> 3. **Prolonged Inactivity Signal:** Explicitly linked SSO/API token shows zero usage for > 45 days.
> 
> The system NEVER claims to magically read third-party apps without user-provided data.

---

## 7. Component Stylings (Double-Bezel & Haptic Hardware)

### A. The Double-Bezel Architecture (Doppelrand)
Never place cards flatly on the canvas:
- **Outer Shell:** Wrapper with `p-1.5`, `rounded-2xl` (`16px`), `bg-white/[0.04]`, `border 1px solid rgba(242, 238, 231, 0.08)`.
- **Inner Core:** Nested container with `rounded-[calc(1rem-1.5px)]`, `bg-[#191E25]`, inset highlight `box-shadow: inset 0 1px 0 rgba(242, 238, 231, 0.05)`.

### B. Buttons (Technical Island Architecture)
- **Primary Action Button:** Fully rounded pill (`rounded-full`), padding `px-4 py-2`, solid Receipt Coral fill (`#F26B50`), Receipt Ivory text (`#F2EEE7`).
  - Font: `Arial`, `8px`, `font-weight: 500`, `text-transform: uppercase`.
  - Trailing icon: Arrow (`↗`) nested inside a micro circular enclosure (`w-4 h-4 rounded-full bg-black/20 flex items-center justify-center`).
  - Active state: `-1px` translate down (`active:scale-[0.98]`).
  - Zero outer glow.
- **Secondary Buttons:** Graphite Surface fill (`#191E25`), border `1px solid rgba(242, 238, 231, 0.1)`, text `#8E97A4`, hover text `#F2EEE7`.

### C. Inputs & Form Fields
- Label strictly above the input field (`font-size: 12.8px; font-weight: 500; text-transform: uppercase; color: #8E97A4; margin-bottom: 6px;`).
- Input Container: Recessed Obsidian Inset (`#0B0D11`), border `1px solid #2A313D`, text `#F2EEE7`, font-mono for numeric amounts.
- Focus State: Razor-sharp 1px solid Receipt Coral ring (`#F26B50`), zero blurry glow.

---

## 8. Motion Choreography & Performance Guardrails

- **Custom Cubic-Bezier Transitions:** All easing uses `cubic-bezier(0.32, 0.72, 0, 1)` (spring-damped, weighty feel). No linear transitions.
- **Animated Number Interpolation:** Counter values transition with tabular lining numbers (`font-feature-settings: 'tnum'`) to avoid horizontal layout jitter.
- **GPU-Safe Transforms:** Animate exclusively via `transform` and `opacity`. Never animate `top`, `left`, `width`, or `height`.
- **Blur Discipline:** `backdrop-blur` is applied only to fixed floating navigation islands, never to scrolling content lists.

---

## 9. Anti-Patterns (Strictly Banned)

If any of the following appear, the design fails the agency standard:
1. **NO Generic 3D Credit Cards or Gyroscopes:** Subscriptions are recurring ledger agreements.
2. **NO AI Neon Palettes:** Acid volt, cyan/magenta cyber glows, and purple radial gradients are forbidden.
3. **NO Pure Black (`#000000`):** Use Ink Obsidian (`#101318`) and Graphite Surface (`#191E25`).
4. **NO Generic Unstyled Fonts:** Adhere strictly to `halyard-display-variable`, `Arial` (8px buttons), and `JetBrains Mono`.
5. **NO Emojis Anywhere:** Use crisp monoline SVG icons (1.5px stroke).
6. **NO 3-Column Equal Card Layouts:** Enforce asymmetric bento grids (e.g. 8+4 or 7+5).
7. **NO AI Copywriting Clichés:** Banned words: *"Elevate"*, *"Seamless"*, *"Unleash"*, *"Next-Gen"*, *"Supercharge"*.
8. **NO Fake Omniscience Claims:** Never claim the app "magically scans all your apps" without user evidence.
9. **NO Generic Placeholder Names:** Use realistic subscription services: GitHub Copilot, AWS, Netflix, Spotify, Claude Pro, Figma.

---

## 10. Google Stitch Screen Generation Prompts

Use these prompts when generating screens inside Google Stitch (`labs.google/stitch`):

### Screen 1: "Landing Page Hero — Silent Leaks Diagnostic"
> "Generate a desktop landing page hero for TrackMySub using DESIGN.md. Typography: Section heading using halyard-display-variable (54.4px, weight 500, line-height 48.96px, uppercase), labels using halyard-display-variable (12.8px, uppercase), buttons using Arial (8px, uppercase), and body using halyard-display-variable (14.4px, normal case). Palette: Ink Obsidian (#101318) canvas, Graphite (#191E25) cards, Receipt Ivory (#F2EEE7) text, and Receipt Coral (#F26B50) accents. Left column features the headline 'SEE EVERY SUBSCRIPTION. ANTICIPATE EVERY RENEWAL.' with an 8px Arial uppercase Receipt Coral button. Right column features a double-bezel animated audit diagnostic contrasting 'What You Think You Pay ($148.00/mo)' against 'What Silently Renews ($382.40/mo)' showing itemized hidden charges (AWS compute $64.20, stealth price hikes, and upcoming annual renewals). Strictly adhere to banned anti-patterns: no generic 3D cards, no neon glows."

### Screen 2: "Main Dashboard — Renewal Horizon & Master Ledger"
> "Generate the primary dashboard screen for TrackMySub based on DESIGN.md. Top section displays the 30-Day Renewal Horizon timeline with interactive day nodes plotting impending charges across the month, highlighting a 72-hour burn of $84.20. Main body displays the high-density Master Subscription Ledger in a Double-Bezel Graphite container (#191E25) listing services (AWS $64.20, Netflix $19.99, Claude Pro $20.00, GitHub $10.00) with category pills, billing frequency, monthly cost, and payment card chips (Amex •• 1004). Right side features a compact Leak Sentinel pod for user-confirmed review items. Use Arial 8px uppercase for action buttons, halyard-display-variable for headers and labels, and JetBrains Mono for all monetary values with tabular numbers."

### Screen 3: "Dedicated Calendar Heatmap Page (/calendar)"
> "Generate a dedicated monthly calendar page for TrackMySub using DESIGN.md. Displays an expansive monthly grid for October 2026 showing exact cash deduction clusters, marked paydays, and impending renewal spikes. Uses Ink Obsidian (#101318) and Graphite (#191E25) with Receipt Coral highlights on selected dates. Clean, tactile, zero clutter from analytics. Adheres strictly to typography and color tokens."

### Screen 4: "Dedicated Analytics & Trajectory Page (/analytics)"
> "Generate a dedicated analytics view for TrackMySub using DESIGN.md. Displays spending distribution across Infrastructure, Dev Tools, Media, and Personal Productivity, paired with a 12-month trailing spend trajectory line. Uses Double-Bezel Graphite cards, Receipt Ivory labels, and restrained data visual lines without neon gradients."
