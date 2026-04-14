# Design System Strategy: Clinical Precision

## 1. Overview & Creative North Star
**Creative North Star: The Forensic Monolith**

This design system is built for the high-stakes environment of a hackathon MVP where speed and diagnostic clarity are paramount. We are moving away from the "friendly SaaS" aesthetic toward a **Clinical Editorial** style. It is characterized by high-contrast legibility, aggressive whitespace, and a "Monolith" layout—where data feels etched into the interface rather than floating on it. 

To break the "template" look, we utilize **Intentional Asymmetry**. Key data points are often offset, and headers use dramatic scale shifts to guide the eye. We reject the "boxed" layout in favor of an open-flow architecture that feels like a professional medical or financial terminal.

---

## 2. Colors & Surface Architecture

The palette is rooted in a "True Charcoal" foundation, providing a canvas where information is the only protagonist.

### Surface Hierarchy & Nesting
We do not use borders. Hierarchy is achieved through **Tonal Layering**. Imagine the UI as sheets of obsidian stacked in a dark room; light only catches the edges of the most important elements.

*   **Foundation:** `surface` (#131313) is the base.
*   **The Inset:** Use `surface_container_lowest` (#0E0E0E) for large background sections to create a sense of infinite depth.
*   **The Focus:** Use `surface_container_high` (#2A2A2A) for interactive cards or modules that need to "step forward" toward the user.

### Key Rules
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined solely by shifting from `surface` to `surface_container_low`.
*   **The Glass & Gradient Rule:** For floating modals or "Solution" overlays, use `primary_container` (#00F5A0) at 10% opacity with a `backdrop-blur` of 20px. This creates a "Clinical Glow" rather than a heavy, opaque block.
*   **Signature Textures:** Main CTAs should use a subtle vertical gradient from `primary_fixed_dim` (#00E293) to `primary_container` (#00F5A0) to provide a "lit-from-within" liquid-metal effect.

---

## 3. Typography: Authority Through Scale

We use **Inter** exclusively. The brand identity is conveyed through extreme contrast between `display` and `label` sizes.

*   **Display & Headlines:** Use `display-lg` (3.5rem) for primary audit scores. It should feel massive and indisputable.
*   **Monospaced Utility:** While the system is Sans-serif, numerical data should utilize tabular lining (Inter's `tnum` feature) to ensure clinical alignment in tables.
*   **Labels:** Use `label-sm` (0.6875rem) with 5% letter spacing for metadata. This "shrunken" text against large background voids creates a high-end, premium feel.
*   **Hierarchy:** `headline-sm` is reserved for section headers, always paired with a `surface_tint` accent bar (2px wide, vertical) to its left.

---

## 4. Elevation & Depth

Standard shadows are too "soft" for a clinical tool. We use **Ambient Occlusion** logic.

*   **The Layering Principle:** Place a `surface_container_highest` (#353534) element inside a `surface` section to create immediate visual priority without a single shadow.
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge (e.g., an input field), use `outline_variant` at 15% opacity. It should be felt, not seen.
*   **Glassmorphism:** Use semi-transparent `surface_bright` for navigation bars fixed at the top, allowing the content to blur underneath as it scrolls, maintaining a sense of spatial awareness.

---

## 5. Components

### Buttons
*   **Primary (Solution):** Background: `primary_container` (#00F5A0), Text: `on_primary` (#003921). Radius: `md` (0.375rem). No shadow.
*   **Secondary (Audit):** Background: Transparent, Border: `outline` at 20%, Text: `on_background`.
*   **Warning:** Background: `secondary_container` (#EE671C), Text: `on_secondary`. Reserved strictly for destructive actions or critical meal errors.

### Cards & Lists
*   **The Divider Forfeit:** Dividers are banned. Separate list items using 16px of vertical `body-sm` whitespace or a subtle background shift to `surface_container_low`.
*   **Audit Cards:** Use `surface_container` with a `lg` (0.5rem) corner radius. Elements inside should be "breathable"—minimum 24px internal padding.

### Input Fields
*   **Style:** Minimalist underline or "Ghost Border." Focus state: The underline shifts to `primary` (#CDFFDE) with a subtle outer glow (4px blur, `primary` at 20%).

### Signature Component: The "Audit Pulse"
For the MealAudit MVP, use a "Pulse" chip for live scanning. A `label-md` text element sitting on a `primary_container` background with a 1px `primary` pulse animation to indicate high-performance backend processing.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use `secondary` (#FFB595) sparingly for "Warning" states to ensure they stand out against the mint/charcoal base.
*   **Do** lean into asymmetry. Align text to the left but place primary actions or scores in the far right to create a professional "Dashboard" tension.
*   **Do** prioritize `on_surface_variant` (#B9CBBD) for secondary text to maintain the dark-mode's low-strain clinical feel.

### Don't
*   **Don't** use pure black (#000000). It kills the depth transitions between our charcoal tiers.
*   **Don't** use standard 4px rounded corners for everything. Mix `none` for structural containers and `full` for interactive chips to create a "Technical" vs "Tactile" distinction.
*   **Don't** add icons unless they are essential. Let the typography and color tokens do the heavy lifting.