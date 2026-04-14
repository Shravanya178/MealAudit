
# MealAudit

**AI-powered metabolic audit for real-time food decisions**

MealAudit is an intelligent system that helps users understand what their food actually does to their body — and how to improve it instantly. Instead of tracking calories or following rigid diet plans, MealAudit focuses on the most critical moment: **making the right food decision in real time**.

---

## Problem Statement

People often make poor dietary choices not due to lack of awareness, but due to **misleading health perceptions (“health halo”) and lack of context-aware guidance**.

Existing solutions:

* Track food **after consumption**
* Provide **generic recommendations**
* Ignore **individual conditions and real-world constraints**

MealAudit addresses this gap by providing **instant, explainable, and actionable insights before consumption**.

---

## Solution

MealAudit performs a **real-time metabolic audit** using AI to:

* Identify the gap between **perceived healthiness and actual biological impact**
* Predict **short-term effects** (energy crash, sugar spike, etc.)
* Suggest a **minimal, realistic fix** instead of replacing the entire meal
* Provide **clinical reasoning** behind each recommendation

---

## Key Features

### Health Halo Detection

Reveals why a food seems healthy vs what actually happens in the body.

### Immediate Impact Prediction

Predicts short-term effects such as:

* Energy crash
* Brain fog
* Sugar spikes

### Least-Damage Pivot

Suggests **small, practical changes** to improve the same meal.

### Explainable AI Reasoning

Provides clear biological reasoning (e.g., glycemic buffering, insulin response).

### Condition-Aware Analysis

Supports context like:

* Diabetes
* PCOS
* Weight management

### Smart Micro-Suggestions

Lightweight, context-aware behavioral nudges based on inferred eating patterns.

### Multimodal Input (Gemini Vision)

Users can:

* Upload meal images
* Or describe food via text

---

## Architecture

```
User Input (Text/Image)
        ↓
Gemini Vision (Food Identification)
        ↓
Gemini Reasoning Engine
        ↓
Structured Output:
[Perception]
[Biological Reality]
[Immediate Impact]
[Fix]
[Why It Works]
[Smart Micro-Suggestion]
        ↓
UI Rendering (React SPA)
```

---

## AI & Technology Stack

* **Frontend:** React + Tailwind CSS + Vite
* **AI Engine:** Google Gemini (Text + Vision)
* **Optional Storage:** Supabase (lightweight session storage)
* **Architecture:** Modular, agent-based design

---

## Engineering Considerations

* **Performance:** < 2s perceived latency
* **Accessibility:** WCAG AA compliant UI
* **Security:** API keys managed via `.env`, no client-side exposure
* **Testing:** Input validation, API parsing, UI responsiveness
* **Design Philosophy:** Minimal, fast, and reasoning-first

---

## How It Works

1. User inputs meal (text or image)
2. Gemini Vision identifies food components
3. Gemini reasoning engine evaluates:

   * Nutritional composition
   * User condition/context
   * Predicted biological impact
4. System generates:

   * Insight
   * Prediction
   * Fix
   * Explanation

---

## What Makes MealAudit Different

| Traditional Apps    | MealAudit               |
| ------------------- | ----------------------- |
| Track past behavior | Predict future impact   |
| Generic advice      | Context-aware reasoning |
| Replace meals       | Improve existing meals  |
| Static rules        | AI-driven insights      |
