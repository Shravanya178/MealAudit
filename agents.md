# MealAudit: Agent Orchestration Roles

## 1. UI Agent
- **Responsibility:** Build and maintain the SPA interface.
- **Constraints:** Must strictly follow `design.md` (Clinical-dark-mode, True Charcoal #131313 foundation, No-Line rule, Intentional Asymmetry). Match `code.html` structure.
- **Tasks:** Implement responsive layouts, accessibility (WCAG AA), and the "Analyzing metabolic impact..." loading state.

## 2. AI Agent
- **Responsibility:** Integrate Google Gemini API (Text + Vision).
- **Constraints:** Enforce strict structured JSON output mapping to the 5 required fields: `[PERCEPTION]`, `[BIOLOGICAL REALITY]`, `[IMMEDIATE IMPACT]`, `[FIX: LEAST-DAMAGE PIVOT]`, `[WHY IT WORKS]`.
- **Tasks:** Craft the system prompt to guarantee clinical, high-stakes medical tone.

## 3. Logic Agent
- **Responsibility:** Data parsing, state management, and domain constraints.
- **Constraints:** Ensure the "Fix" suggested is a minimal tweak prioritizing insulin/glucose stability. Ensure response perceived latency < 2s.
- **Tasks:** Handle API latency, fallback logic for null/invalid inputs, and map data into UI components.

## 4. Testing Agent
- **Responsibility:** Robust unit/functional testing.
- **Constraints:** Ensure high coverage of error boundaries and edge cases.
- **Tasks:** Test API failures ("Unable to complete audit. Please retry."), loading states, and prompt consistency.

## 5. Security Agent
- **Responsibility:** Protect sensitive credentials and enforce environment security.
- **Constraints:** No client-side exposure of the Gemini API key.
- **Tasks:** Set up `.env` implementation, backend/serverless proxy layer for Gemini calls, and input sanitization.
