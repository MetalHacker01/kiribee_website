# FIXES

## 2026-09-23 · v1 hero layout shift on mobile (CLS 0.09 to 0.11)

**Problem:** Lighthouse CLS 0.109 on the v1 homepage (mobile); the hero image jumped down after load.
**Root cause:** font swap (fallback to Inter/Bodoni) made the two hero CTAs too wide for one row, so the row wrapped (+64px); the h1 could also rewrap.
**Fix:** components/home/home.module.css `.line` (nowrap, one block per word group) and `.ctaRow` column stack under 520px; HomePage.tsx h1 split into `.line` spans.
**Verified by:** Lighthouse CLS 0 on 3 runs; fonts-blocked vs loaded measurement identical; user approved the redesign.
**Never regress to:** free-wrapping hero h1 or `flex-wrap` CTA row on phones.

## 2026-09-23 · CountUp hydration mismatch in Albanian

**Problem:** React hydration error on /sq, which also left `<html lang>` unset.
**Root cause:** `Intl.NumberFormat("sq-AL")` gives different output in Node and in the browser (ICU data differs).
**Fix:** components/home/CountUp.tsx, manual thousands separator (nbsp for sq, comma for en).
**Verified by:** no console errors, lang="sq" set; user approved.
**Never regress to:** Intl locale formatting of server-rendered text in a client component.

## 2026-09-23 · Scroll-driven animations silently did nothing

**Problem:** drips, honey fill, step dots and reveals sat at their end state.
**Root cause:** `animation: name auto linear both` is invalid in Chrome, so the whole declaration was dropped.
**Fix:** home.module.css, shorthand without `auto` (`animation: name linear both;` then `animation-timeline`).
**Verified by:** computed transforms change with scroll (Playwright probe); user approved.
**Never regress to:** `auto` duration inside the `animation` shorthand.

## 2026-09-23 · CSS Modules build error on hover selector

**Problem:** 500 on the v1 homepage: "Selector is not pure".
**Root cause:** every selector in a CSS Module list needs a local class; `button:hover > svg` had none.
**Fix:** home.module.css `a:hover > .arrow, button:hover > .arrow`.
**Verified by:** page compiles; user approved.
**Never regress to:** bare element selectors (no local class) in *.module.css.

## 2026-09-24 · v1 mobile TBT from WebGL flame and HTML size

**Problem:** mobile Performance dropped to 80 to 88 (TBT up to 350ms) after adding the hero flame.
**Root cause:** shader compiled on idle right after load; 198 kB HTML from 12 inline bee SVGs and a duplicated 2-col + 3-col gallery.
**Fix:** HeroCandle.tsx starts WebGL on first pointermove/scroll/touch/key; Bee.tsx `<symbol>` + `<use>` (BeeSprite once in HomePage); single masonry DOM, phones reflow with CSS `columns` + `display: contents`.
**Verified by:** HTML 162 kB, TBT 40 to 60ms, mobile 91 to 93; user approved.
**Never regress to:** compiling the shader on load/idle; inlining BeeShape per bee; rendering the gallery twice.

## 2026-09-24 · Display font too heavy for mobile LCP

**Problem:** LCP 3.4s on mobile; Lighthouse waited on 98 kB of Bodoni variable fonts.
**Root cause:** next/font/google Bodoni_Moda ships the full wght + opsz variable files.
**Fix:** app/fonts/BodoniModa-450(-Italic).woff2, static instance wght 450 / opsz 24, subset Latin + Albanian (28 kB); app/layout.tsx loads them with next/font/local (replaced Fraunces).
**Verified by:** LCP 3.0s, mobile 91 to 93, hairlines visible; user approved.
**Never regress to:** `Bodoni_Moda` from next/font/google with axes: ["opsz"].

## 2026-09-24 · Honeycomb cells cut off on phones

**Problem:** Ana's fact hexagons overflowed the right edge at 390px.
**Root cause:** `--w: min(64vw, ...)` makes the 1.75w zigzag wider than the viewport.
**Fix:** home.module.css `.comb` / `.hexFacts` `--w: min(calc((100vw - 2rem - var(--gap)) / 1.75), ...)`.
**Verified by:** 390px screenshots; user approved.
**Never regress to:** a vw-only width for the honeycomb cells.

## 2026-09-23 · reCAPTCHA must not load with the page

**Problem:** spam on the contact form; Google's script is heavy for Lighthouse.
**Root cause:** n/a (new feature); a page-load script tag would cost TBT and third-party cookies.
**Fix:** components/forms/Recaptcha.tsx loads api.js on first focus/pointerdown inside the form; app/api/contact/route.ts verifies tokens when RECAPTCHA_SECRET_KEY is set.
**Verified by:** 0 recaptcha requests before interaction; API returns 400 captcha_required / captcha_failed; user approved.
**Never regress to:** `<Script src="https://www.google.com/recaptcha/api.js">` in a layout or on page load.
