# Brewer Bubbles & Sons

A responsive, accessible landing page for a (fictional) Tulsa sparkling-water company. It started as my freeCodeCamp Product Landing Page project and grew into a small website with real links and JavaScript.

- Live pen (website version): https://codepen.io/bot-dotcom/pen/KwmzorR
- freeCodeCamp version (passes all 16 tests): https://codepen.io/bot-dotcom/pen/xbdVpXV
- Original pen: https://codepen.io/bot-dotcom/pen/jOaNXzQ

## Run it

No build step. Open `index.html` in a browser, or turn on GitHub Pages for this repository (Settings → Pages → Deploy from branch → `main`, `/ (root)`).

## Files

```
index.html      page structure and content
css/style.css   all styling; design tokens (colours, spacing) are at the top
js/script.js    behaviour, written as numbered lessons
```

## What it demonstrates

**Responsive layout**
- Sticky header that never covers the content, whatever its height
- Card grids that go 1 → 2 → 3 columns with no media query: `repeat(auto-fit, minmax(min(100%, 15rem), 1fr))`
- Navigation folds into a Menu button below 960px
- Fluid type and spacing with `clamp()`

**Accessibility**
- Skip link, labelled form field, landmarks (`header`, `nav`, `main`, `footer`)
- Visible keyboard focus on every control
- Buttons that say what they do to screen readers ("Select Lion Water")
- Error and status messages announced to screen readers
- Respects "reduce motion"; text contrast at least 6:1

**JavaScript lessons** (`js/script.js`)
0. Progressive enhancement: the page works without JavaScript
1. Mobile menu button with `aria-expanded`
2. "You are here" nav highlight with `IntersectionObserver`
3. Friendlier form validation using the browser's own `validity`
4. Selecting products and keeping a running total (`aria-pressed`, data attributes)
5. Automatic copyright year
6. Measuring the header with `ResizeObserver`

**Links**: in-page (`#about`), email (`mailto:`), phone (`tel:`) and external links that open safely in a new tab.

## To do

- [ ] Replace the embedded YouTube video: the current one is no longer available
- [ ] Swap the placeholder email address and phone number for real ones
- [ ] Send the sign-up form to a real email service
