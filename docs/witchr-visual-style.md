# WITCHR VISUAL STYLE SYSTEM

## Core Identity

Witchr imagery should feel like a dark occult editorial zine rendered through raw analog print techniques.

The overall visual identity should feel:

* mysterious
* occult
* severe
* graphic
* underground
* editorial
* raw rather than polished
* dark brutalist rather than fantasy illustration

The goal is a recognizable Witchr visual language that stays consistent across herbs, candles, ingredients, symbols, rituals, correspondence pages, tools, and future content categories.

---

## Palette

Strict duotone only.

Primary colors:

* vivid electric purple: `#8A2BE2`
* deep solid black: `#000000`

Do not introduce:

* gray
* white as a dominant visual color
* additional hues
* gradients containing other colors
* full-color artwork

Purple and black should define the Witchr visual identity.

---

## Rendering / Medium

Use visual characteristics inspired by:

* screenprint
* risograph printing
* heavy halftone dot matrices
* 1-bit dithered shading
* photocopy grain
* scratched ink
* distressed print texture
* worn edges
* high-contrast analog reproduction
* underground zine artwork

The image should feel physically printed, copied, distressed, and imperfect rather than digitally polished.

---

## Composition Rules

Every generated image must have:

* one clear visual focal point
* a readable silhouette
* strong contrast
* an immediately recognizable primary subject
* clear visual hierarchy
* restrained supporting detail

The main subject must not disappear into excessive texture, occult symbols, smoke, noise, or decorative elements.

Avoid chaotic compositions that make the page topic difficult to identify.

Supporting occult motifs should enhance the page subject rather than overpower it.

---

## Subject Priority Rules

The page topic determines the visual hierarchy.

### Herb pages

The herb is the primary subject.

Leaves, stems, flowers, berries, bark, or recognizable botanical characteristics should be accurate enough that the plant can be visually identified.

Supporting elements may include:

* subtle sigils
* lunar forms
* thorns
* smoke
* distressed botanical framing
* ritual objects

But the herb remains dominant.

### Candle pages

The candle is the primary subject.

The candle shape, flame, wax, and ritual presence should be immediately clear.

Supporting elements may include:

* smoke
* simple sigils
* lunar forms
* ritual framing
* subtle altar elements

### Ingredient pages

The ingredient itself is the primary subject.

Use a specimen-like, relic-like, or editorial presentation depending on the subject.

### Symbol pages

The symbol is the unmistakable focal point.

Do not bury the symbol under excessive atmospheric detail.

### Correspondence pages

A curated multi-object editorial collage is appropriate.

Use one central visual concept supported by several recognizable related objects.

The composition should still have a hierarchy rather than appearing like a random pile of occult objects.

### Ritual pages

Depict an atmospheric ritual arrangement or symbolic action related to the page intention.

Avoid depicting dangerous acts, misleading supernatural claims, or instructions embedded inside the image.

### Hub/category pages

More complex editorial compositions, environments, architecture, botanical collages, and atmospheric scenes are allowed.

---

## Negative Directives

All Witchr images must follow these restrictions:

* **NO TEXT**
* no words
* no letters
* no typography
* no labels
* no watermarks
* no logos embedded in artwork
* no photorealism
* no glossy fantasy painting
* no cinematic 3D render
* no polished videogame-concept-art appearance
* no soft pastel aesthetic
* no generic AI fantasy artwork
* no modern interface elements inside the art

Important page information must remain HTML text on the website and must never be baked into the image.

---

# MASTER REUSABLE STYLE WRAPPER

Use this language as the base style layer when creating Witchr image-generation prompts:

> "[SUBJECT], rendered in Witchr's signature visual style: high-contrast strict duotone using vivid electric purple (#8A2BE2) and deep solid black (#000000), raw screenprint and risograph aesthetic, heavy halftone dot textures, 1-bit dithered transitions, distressed photocopy grain, scratched ink overlay, dark brutalist occult-zine mood, sharp readable silhouette, strong focal point, purely visual composition, NO TEXT, no words, no letters, no typography, no watermarks, no photorealism, no 3D render."

The subject-specific description should come **BEFORE** this style layer.

---

# IMAGE TYPE TEMPLATES

## A. HERB PAGE HERO

**Template:**

> "A dramatic editorial composition featuring [HERB] as the dominant subject. The plant must be immediately recognizable through its characteristic leaves, stems, flowers, berries, or botanical form. Surround it with restrained occult supporting elements such as subtle sigils, thorny botanical framing, lunar texture, or ritual smoke without overpowering the plant. Rendered in Witchr's signature strict purple-and-black duotone, raw screenprint aesthetic, heavy halftone texture, 1-bit dithering, distressed photocopy grain, dark brutalist occult-zine style, strong focal point, NO TEXT."

---

## B. CANDLE PAGE HERO

**Template:**

> "A high-contrast graphic composition featuring a single [CANDLE DESCRIPTION] candle as the dominant subject, with flame, wax form, and ritual presence clearly visible. Supporting occult motifs may include smoke, subtle sigils, lunar shapes, or restrained altar-like framing, but the candle remains the unmistakable focal point. Strict purple-and-black duotone, raw screenprint texture, halftone shading, 1-bit dithered grain, distressed photocopy finish, occult editorial mood, NO TEXT."

---

## C. INGREDIENT / OBJECT / RELIC

**Template:**

> "A centered editorial specimen composition featuring [OBJECT] as the unmistakable focal point against a deep black environment. Sharp silhouette, controlled negative space, subtle occult framing where appropriate. Strict electric-purple-and-black duotone, high contrast, worn screenprint edges, halftone shading, 1-bit dither texture, gritty risograph and photocopy finish, underground occult-zine presentation, NO TEXT."

---

## D. CORRESPONDENCE COLLAGE

**Template:**

> "A symbolic editorial collage representing [INTENTION OR TOPIC], composed of several clearly readable objects associated with the subject. Establish one dominant central visual element with supporting objects arranged deliberately around it. The result should feel curated rather than chaotic. Strict vivid-purple-and-black duotone, raw screenprint style, heavy halftone dot texture, 1-bit dithering, distressed photocopy grain, dark brutalist occult-zine aesthetic, strong visual hierarchy, NO TEXT."

---

## E. SYMBOL PAGE

**Template:**

> "A dramatic graphic representation of [SYMBOL] as the central unmistakable focal point. Strong negative space, sharp readable geometry or silhouette, restrained distressed framing, no competing major objects. Strict electric-purple-and-black duotone, screenprint texture, heavy halftone shading, 1-bit dither, scratched photocopy grain, dark occult-zine aesthetic, NO TEXT."

---

## F. ENVIRONMENT / CATEGORY HEADER

**Template:**

> "A dark atmospheric editorial scene centered on [ENVIRONMENT OR STRUCTURE], with strong monolithic silhouettes and restrained occult environmental details. Strict purple-and-black duotone, heavy halftone texture, 1-bit dithering, raw screenprint and photocopy distress, brutalist composition, underground occult-zine atmosphere, NO TEXT."

---

# IMAGE SELECTION RULES

For future Witchr pages, choose the visual type based on page content:

* `/herbs/*` → Herb Page Hero
* `/candles/*` → Candle Page Hero
* `/ingredients/*` → Ingredient / Object / Relic
* `/symbols/*` → Symbol Page
* `/correspondences/*` → Correspondence Collage
* `/rituals/*` → Ritual-oriented editorial composition using the closest applicable template
* major category/hub pages → Environment / Category Header or editorial collage

Do not randomly change art direction between categories.

---

# IMAGE QUANTITY RULES

Do not automatically flood every article with artwork.

**Default for a normal informational page:**
1 hero image.

Optionally add one additional meaningful image only when it genuinely improves the article.

Large guides or hub pages may justify additional visuals.

Avoid decorative image spam that slows the page or interrupts reading.

---

# IMAGE SEO / PERFORMANCE RULES

When actual images are generated and added to the site:

* Use descriptive file names
* Prefer modern compressed web formats such as WebP or AVIF where supported
* Size images appropriately for their rendered dimensions
* Do not upload unnecessarily huge originals
* Lazy-load below-the-fold imagery
* Reserve image dimensions to avoid layout shift
* Provide accurate alt text for meaningful images
* Use empty/decorative alt handling (`alt=""`) for purely decorative imagery where appropriate
* Do not keyword-stuff alt text
* Do not place important SEO copy exclusively inside imagery
* Preserve strong Core Web Vitals

**Example filename:**
`rosemary-witchcraft-hero.webp`

**Example useful alt text:**
`"Purple and black screenprint illustration of rosemary sprigs"`

**Do NOT write alt text like:**
`"Rosemary witchcraft magical properties spiritual meaning herb witchcraft rosemary uses"`
