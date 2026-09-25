# WITCHR IMAGE GENERATION WORKFLOW

This document outlines the standard workflow Antigravity must follow whenever planning, generating, or implementing visual assets for any Witchr content page.

---

## Core Workflow Steps

Whenever a new Witchr page is built or an existing page requires imagery, follow these steps sequentially:

### 1. Consult the Style Specification
Before generating or planning visuals for any Witchr page, read and adhere to:
[`/docs/witchr-visual-style.md`](file:///d:/Projects/Witchr/docs/witchr-visual-style.md)

### 2. Determine Page Category & Select Image Template
Identify the content category of the page and select the corresponding template from the style guide:
* `/herbs/*` → **Herb Page Hero** (Botanical focus, recognizable species anatomy)
* `/candles/*` → **Candle Page Hero** (Wax form, flame, ritual focus)
* `/ingredients/*` → **Ingredient / Object / Relic** (Specimen/relic presentation)
* `/symbols/*` → **Symbol Page** (Clean graphic geometry, unmistakable symbol)
* `/correspondences/*` → **Correspondence Collage** (Curated multi-object hierarchy)
* `/rituals/*` → **Ritual Composition** (Atmospheric ritual arrangement)
* Hub / Category pages → **Environment / Category Header** (Monolithic silhouette/architecture)

### 3. Identify the Primary Subject
Pinpoint the exact focal point for the page (e.g., *Rosemary*, *Black Candle*, *Salt*, *Pentagram*). The subject must remain the dominant silhouette in the composition.

### 4. Formulate Subject-Specific Generation Prompt
Construct the generation prompt by combining:
1. The subject-specific description with distinct composition, framing, and supporting elements.
2. The Witchr Master Reusable Style Wrapper:
   > *"...rendered in Witchr's signature visual style: high-contrast strict duotone using vivid electric purple (#8A2BE2) and deep solid black (#000000), raw screenprint and risograph aesthetic, heavy halftone dot textures, 1-bit dithered transitions, distressed photocopy grain, scratched ink overlay, dark brutalist occult-zine mood, sharp readable silhouette, strong focal point, purely visual composition, NO TEXT, no words, no letters, no typography, no watermarks, no photorealism, no 3D render."*

### 5. Guarantee Subject Recognizability
Ensure the primary subject does not disappear into excessive texture, smoke, sigils, or abstract noise. Botanical species must be identifiable by their physical characteristics; ritual objects must be distinct.

### 6. Maintain System Uniformity (No Ad-Hoc Styles)
**Do not change the established Witchr visual style to make individual pages feel "unique."**
* Permitted variation comes from: **subject**, **composition**, **supporting symbols**, and **framing**.
* Prohibited variation: **changing the palette** (no grays, whites, or extra colors), **altering rendering style** (no glossy 3D, no digital fantasy paintings, no photorealism).

### 7. Generate a Page Image Manifest
Before creating or inserting images, compile a structured image manifest:
* **Image Role**: (e.g., `Hero`, `Section Specimen`)
* **Subject**: Primary topic/entity
* **Proposed Filename**: Descriptive kebab-case, web-optimized format (e.g., `rosemary-witchcraft-hero.webp`)
* **Proposed Alt Text**: Concise, descriptive screenprint summary (e.g., `"Purple and black screenprint illustration of rosemary sprigs"`)
* **Generation Prompt**: Complete prompt following Witchr templates
* **Intended Placement**: Specific page location (e.g., `Above article h1 header`, `Header background container`)

### 8. Conditional Generation
* **If authorized and tool available**: If the environment has image-generation capabilities and the active user task explicitly authorizes generation, generate the image artifact.
* **If unauthorized or unavailable**: Do NOT substitute generic stock photos or unstyled placeholders. Instead:
  1. Produce the complete image manifest with finalized prompts.
  2. Leave the image implementation hooks ready for later asset completion.

### 9. Build Stability Guarantee
Never break page builds or rendering because an image asset is absent. Pages must render gracefully with fallback UI containers or clean layout spacing when image files have not yet been placed in `/public`.

### 10. SEO & Performance Standards
* Compress images using modern formats (WebP/AVIF).
* Explicitly define aspect ratios or width/height attributes to prevent Cumulative Layout Shift (CLS).
* Ensure non-spammy, accessible alt text describing the illustration and subject accurately.
