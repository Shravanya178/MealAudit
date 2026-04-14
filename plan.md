# MealAudit: Implementation Plan

## 1. Architecture
- **Frontend Framework:** Vite with Vanilla JS to keep it lightweight and precise. (Will use React if further complex state is needed, but Vanilla aligns with the strict HTML/Tailwind provided).
- **Styling:** Tailwind CSS + Vanilla CSS (as defined in `code.html`).
- **AI Integration:** Google Gemini API (Text + Vision) via a secure backend proxy or serverless function to protect API keys.
- **State Management:** Vanilla JS event listeners and DOM manipulation to handle loading, success, and error states.

## 2. Flow
1. **Input Phase:** User inputs text into the textarea. Optional: Selects a condition persona (General, Diabetes, PCOS, Weight Loss).
2. **Processing Phase:** User clicks "RUN METABOLIC AUDIT". UI enters an explicit minimal loading state ("Analyzing metabolic impact...").
3. **AI Execution:** Request sent to Gemini API with a strictly engineered prompt enforcing the clinical structure.
4. **Output Phase:** Render the response mapping to the UI:
   - [PERCEPTION]
   - [BIOLOGICAL REALITY]
   - [IMMEDIATE IMPACT]
   - [FIX: LEAST-DAMAGE PIVOT]
   - [WHY IT WORKS]
5. **Error Handling:** Graceful fallbacks for API errors ("Unable to complete audit. Please retry.").

## 3. Component Breakdown
- **TopAppBar:** Header with "MealAudit" branding and Gemini AI badge.
- **InputSection:** Textarea for input, condition filter chips, and primary action button.
- **LoadingOverlay:** Minimal clinical loading text/spinner ("Analyzing metabolic impact...").
- **OutputBento (Modular Grid):**
  - `Perception Card`: Displays reference image and initial recognition text.
  - `BiologicalReality Card`: Displays sugar load, insulin response (CRITICAL HI), and liver stress.
  - `ImmediateImpact Card`: Displays predicted physiological crash/brain fog.
  - `PivotFix Card`: Displays the required minimal tweak and "Why it works" logic.
- **Footer:** Bottom Gemini attribution.
