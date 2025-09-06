# DOM Cheat Sheet — The Monstrous Exhaustive Edition

**Generated:** 2025-09-04

> This is a *monster* markdown cheat sheet. It aims to be the ultimate single-file reference for DOM manipulation: selection, traversal, creation, attributes, styling, events (common + obscure + deprecated), keyboard key maps, modern APIs (Pointer Events, Shadow DOM, Custom Elements, MutationObserver), accessibility patterns, performance tips, gotchas, and recommended practices for library authors.

---

## Table of Contents

1. [Quick Rules & Philosophy](#quick-rules--philosophy)
2. [Selectors & Traversal](#selectors--traversal)
3. [Creating, Inserting, Removing Nodes](#creating-inserting-removing-nodes)
4. [Attributes, Properties & dataset](#attributes-properties--dataset)
5. [Classes & Styles](#classes--styles)
6. [Event System — Patterns & Listener Options](#event-system--patterns--listener-options)
7. [Event Catalog (Categorized, includes rare & deprecated)](#event-catalog-categorized-includes-rare--deprecated)
8. [Keyboard: `event.key` map & gotchas](#keyboard-eventkey-map--gotchas)
9. [Pointer, Touch, and Mouse differences](#pointer-touch-and-mouse-differences)
10. [Forms & Inputs (input/change/validation)](#forms--inputs-inputchangevalidation)
11. [Drag & Drop, Clipboard, and Media Events](#drag--drop-clipboard-and-media-events)
12. [Document & Window lifecycle events](#document--window-lifecycle-events)
13. [Shadow DOM & Custom Elements](#shadow-dom--custom-elements)
14. [MutationObserver vs Deprecated Mutation Events](#mutationobserver-vs-deprecated-mutation-events)
15. [Accessibility (ARIA) Patterns & Keyboard nav](#accessibility-aria-patterns--keyboard-nav)
16. [Performance & Rendering Tips](#performance--rendering-tips)
17. \[Security: XSS & innerHTML gotchas]
18. [Deprecated APIs & Legacy Quirks (list)](#deprecated-apis--legacy-quirks-list)
19. [Utilities & Code Snippets (copy / paste)](#utilities--code-snippets-copy--paste)
20. \[Packaging Guidance for Library Authors]

---

## Quick Rules & Philosophy

* **Prefer modern APIs**: `querySelector`/`querySelectorAll`, `addEventListener`, `pointer` events, `MutationObserver`, `CustomEvent`, `classList`.
* **Avoid legacy/shady APIs**: `document.write`, `innerText` (for consistent semantics use `textContent`), `keyCode`/`which`.
* **Accessibility first**: keyboard, ARIA roles, focus management, visible focus styles.
* **Performance-aware**: batch DOM writes vs reads, use `requestAnimationFrame` for visual updates, use passive listeners on `scroll`/`touchmove`.

---

## Selectors & Traversal

### Common selectors

```js
document.querySelector('#id')
document.querySelectorAll('.class') // NodeList (static)
Array.from(document.querySelectorAll('a')) // convert to array
```

### Fast legacy selectors (when necessary)

```js
document.getElementById('id') // fast, specific
document.getElementsByClassName('x') // live HTMLCollection
document.getElementsByTagName('div') // live
```

### Traversal helpers

```js
el.parentElement
el.children // element children
el.childNodes // includes text nodes
el.firstElementChild
el.lastElementChild
el.previousElementSibling
el.nextElementSibling
el.closest('.ancestor-selector') // ascend to nearest match
el.matches('selector') // test
```

**Gotcha:** `getElementsByClassName` and `getElementsByTagName` return *live* collections (update as DOM changes). `querySelectorAll` returns a *static* NodeList in modern browsers.

---

## Creating, Inserting, Removing Nodes

```js
const div = document.createElement('div')
div.textContent = 'hello' // safe (no HTML parsing)
// Insertion
parent.appendChild(div) // simple
parent.append(div, node2) // modern, can append multiple
parent.prepend(node)
referenceNode.before(node)
referenceNode.after(node)
// Replace / remove
oldNode.replaceWith(newNode)
node.remove()
parent.removeChild(child) // older
```

**Text vs HTML**

* `textContent` — best for inserting text safely (no HTML interpreted).
* `innerHTML` — will parse HTML; potential XSS if using untrusted input.
* `insertAdjacentHTML('beforeend', '<b>...')` — fast insertion of HTML.

**Performance tip:** Minimize reflows — build fragments with `DocumentFragment` or construct string markup then `innerHTML` once for large inserts.

---

## Attributes, Properties & dataset

```js
el.setAttribute('role','button')
el.getAttribute('data-id')
el.removeAttribute('hidden')
// dataset mapping
el.dataset.userId = '123'
// properties
el.id = 'myid'
el.value = 'x'
```

**Rule of thumb:** Use DOM *properties* for JS-driven behavior (`el.checked`, `el.value`, `el.disabled`). Use attributes for markup and serialization (`setAttribute` / `getAttribute`). `dataset` is a thin, convenient wrapper for `data-*` attributes.

---

## Classes & Styles

```js
el.classList.add('is-active')
el.classList.remove('is-active')
el.classList.toggle('expanded', shouldBeOpen)
if (el.classList.contains('foo')) {}
// Inline style
el.style.backgroundColor = 'limegreen'
// Read computed style
const s = getComputedStyle(el).marginTop
```

**Gotcha:** `el.style` only reads inline styles. Use `getComputedStyle(el)` to get final computed values.

---

## Event System — Patterns & Listener Options

### Basic usage

```js
function handler(e) {}
el.addEventListener('click', handler)
el.removeEventListener('click', handler)
```

### Options (modern third param)

* `capture: true|false` — use capture phase. Default: `false`.
* `once: true` — automatically removes after first call.
* `passive: true` — the handler will not call `preventDefault()`; browser can optimize (use for `scroll`/`touchmove`).

```js
el.addEventListener('scroll', onScroll, { passive: true })
button.addEventListener('click', h, { once: true })
```

### Event phases

1. Capturing phase (top → target) if `capture: true`.
2. Target phase.
3. Bubbling phase (target → top) where most handlers are attached.

**Delegation pattern** — attach one listener to a parent and check `event.target.matches(selector)`; essential for many dynamically-created elements.

---

## Event Catalog (Categorized, includes rare & deprecated)

This is a **big** list. Use `addEventListener` for these names. I grouped them.

### Mouse & Pointer

`click`, `dblclick`, `contextmenu`, `mousedown`, `mouseup`, `mousemove`, `mouseenter`, `mouseleave`, `mouseover`, `mouseout`, `pointerdown`, `pointerup`, `pointermove`, `pointerenter`, `pointerleave`, `pointercancel`, `wheel` (preferred) — deprecated: `mousewheel`.

### Keyboard

`keydown`, `keyup` (preferred), `keypress` (deprecated).

### Focus

`focus` (doesn't bubble), `blur` (doesn't bubble), `focusin` (bubbles), `focusout` (bubbles).

### Form

`input` (fires on each change), `change` (fires on commit/blur), `submit`, `reset`, `invalid`.

### Clipboard

`copy`, `cut`, `paste`.

### Drag & Drop

`dragstart`, `drag`, `dragend`, `dragenter`, `dragover`, `dragleave`, `drop`.

### Media

`play`, `pause`, `ended`, `timeupdate`, `volumechange`, `canplay`, `canplaythrough`, `waiting`, `error`.

### Document & Window

`DOMContentLoaded`, `load`, `beforeunload`, `unload` (deprecated for many use-cases), `visibilitychange`, `online`, `offline`, `resize`, `scroll`.

### Animation / Transition

`animationstart`, `animationiteration`, `animationend`, `transitionstart`, `transitionend`.

### Misc / Experimental / Rare

`pointerlockchange`, `pointerlockerror`, `gamepadconnected`, `gamepaddisconnected`, `selectionchange`, `wheel`, `copy`, `cut`, `paste`.

### Deprecated / Historical

`DOMSubtreeModified`, `DOMNodeInserted`, `DOMNodeRemoved`, `mousewheel` (prefixed variants) — avoid: use `MutationObserver`, `wheel`.

**Note:** For complete lists consult MDN — but this list covers the practical and many obscure ones.

---

## Keyboard: `event.key` map & gotchas

**Always use `event.key`** (string), not `keyCode`. Key names are case-sensitive for printable characters.

| Purpose        | Typical `event.key` values                        |
| -------------- | ------------------------------------------------- |
| Arrow keys     | `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight` |
| Enter / Escape | `Enter`, `Escape`                                 |
| Space          | ` ` (space char) or `Spacebar` in old browsers    |
| Modifier keys  | `Shift`, `Control`, `Alt`, `Meta`                 |
| Function keys  | `F1` ... `F12`                                    |
| Editing        | `Backspace`, `Delete`, `Insert`                   |
| Navigation     | `Home`, `End`, `PageUp`, `PageDown`               |

**Gotchas:**

* Keyboard layouts differ (QWERTY vs AZERTY) — `event.code` is layout-based (physical key), `event.key` is character-based. For text input use `key`, for shortcut detection prefer `code` if you want the physical key.
* `keypress` is deprecated; use `keydown`/`keyup`.

**Shortcut detection example**

```js
window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    // Ctrl/Cmd+K handler
  }
})
```

---

## Pointer, Touch, and Mouse differences

* **Pointer Events** unify mouse/touch/pen: `pointerdown`, `pointermove`, `pointerup`, `pointercancel`. Use them where possible.
* **Touch Events** (`touchstart`, `touchmove`, `touchend`) are older mobile-specific.
* **Mouse Events** are for traditional desktop.

**PointerEvent properties**: `pointerType` ("mouse" | "pen" | "touch"), `isPrimary`, `pressure`, `tiltX`, `tiltY`.

**Best practice:** Use pointer events, handle `pointercancel`, and for gestures consider `PointerEvent` with gesture libraries.

---

## Forms & Inputs (input/change/validation)

* `input` fires for every change while typing (good for live validation/autocomplete).
* `change` fires on blur or Enter when value committed (good for form-level changes).
* `submit` on form — always `e.preventDefault()` if you handle submission via XHR/Fetch.
* `invalid` fires when form validation fails (use `e.preventDefault()` to suppress native UI in some cases).

**Example: Debounced input handler**

```js
let timer
input.addEventListener('input', (e) => {
  clearTimeout(timer)
  timer = setTimeout(() => doSearch(e.target.value), 250)
})
```

---

## Drag & Drop, Clipboard, and Media Events

**Drag & Drop basics**

```js
el.addEventListener('dragstart', (e) => e.dataTransfer.setData('text/plain','payload'))
dropTarget.addEventListener('dragover', (e) => e.preventDefault())
dropTarget.addEventListener('drop', (e) => {
  const data = e.dataTransfer.getData('text/plain')
})
```

**Clipboard events**: `copy`, `cut`, `paste` — `e.clipboardData` is the interface; need to call `e.preventDefault()` to modify clipboard data in many browsers.

**Media events**: Use `timeupdate` (frequent), throttle if doing expensive work. `canplaythrough` signals buffered enough to play through.

---

## Document & Window lifecycle events

* `DOMContentLoaded` — DOM tree parsed, but subresources may not be loaded. Good for initial JS.
* `load` — all resources loaded (images, iframes).
* `beforeunload` — last chance to warn user (modern browsers show generic message, set `e.returnValue` to string for legacy). Avoid unless necessary.
* `visibilitychange` — handle tab visibility to pause work (animations, video, polling).

**Example: pause animations when tab Hidden**

```js
document.addEventListener('visibilitychange', () => {
  if (document.hidden) pauseGame()
  else resumeGame()
})
```

---

## Shadow DOM & Custom Elements

**Shadow DOM**

```js
const host = document.createElement('div')
const root = host.attachShadow({ mode: 'open' })
root.innerHTML = `<style>p{color:limegreen}</style><p>Shadow text</p>`
document.body.appendChild(host)
```

**Custom Elements**

```js
class MyEl extends HTMLElement{
  constructor(){
    super()
    this.attachShadow({mode:'open'})
    this.shadowRoot.innerHTML = `<p><slot></slot></p>`
  }
}
customElements.define('my-el', MyEl)
```

**Gotchas:**

* Styles in Shadow DOM are encapsulated — you must define component styles inside shadow.
* Use `::slotted()` for styling slotted children (with limitations).

---

## MutationObserver vs Deprecated Mutation Events

**MutationObserver example**

```js
const obs = new MutationObserver((mutations) => {
  for (const m of mutations) console.log(m)
})
obs.observe(targetNode, { childList: true, subtree: true, attributes: true })
```

**Avoid** `DOMSubtreeModified` and similar — they are deprecated, heavy, and fire synchronously during DOM ops.

---

## Accessibility (ARIA) Patterns & Keyboard nav

**Important:** Semantic HTML first — use `<button>`, `<a>`, `<input>` correctly. Add ARIA only when semantics cannot be represented.

**ARIA menu pattern (simplified)**

* Trigger: `button[aria-haspopup="true"][aria-expanded="false"]`
* Menu: `role="menu"` with child `role="menuitem"` elements (tabindex management required)

**Focus management**

* When opening a dialog/menu move focus into first interactive item.
* When closing, return focus to the trigger.

**Keyboard examples**

* Use `Space`/`Enter` to activate controls.
* Use `Escape` to close overlays.
* Use ArrowUp/ArrowDown for list navigation where appropriate.

---

## Performance & Rendering Tips

* **Batch reads and writes**: do all `getComputedStyle`/reads together, then do writes (set styles) to avoid layout thrashing.
* Use `requestAnimationFrame` for DOM updates tied to frame rendering.
* Use `IntersectionObserver` for lazy-loading images and triggering animations when visible.
* Use `passive: true` for `scroll`/`touchmove` listeners to avoid blocking scroll.
* Use virtualization (windowing) for very long lists.

**Example: debounce vs throttle**

* Debounce — wait until events stop. Good for search inputs.
* Throttle — limit frequency. Good for scroll tracking.

---

## Security: XSS & innerHTML gotchas

* Never `innerHTML = userSuppliedString` without sanitizing.
* Prefer `textContent` for inserting user content.
* When you must insert HTML, sanitize or use a templating engine and escape user values.

---

## Deprecated APIs & Legacy Quirks (list)

* `document.write()` — avoid after load.
* `innerText` — inconsistent; prefer `textContent`.
* `event.keyCode` / `which` / `charCode` — deprecated in favor of `event.key`/`code`.
* `attachEvent` (IE) — extinct.
* Mutation events: `DOMAttrModified`, `DOMNodeInserted` — deprecated.
* `unload` — unreliable on modern browsers.
* `mousewheel` — legacy; use `wheel`.

---

## Utilities & Code Snippets (copy / paste)

### Safe element creation with classes and attributes

```js
function create(type, { className, attrs = {}, text } = {}){
  const el = document.createElement(type)
  if (className) el.className = className
  for (const k in attrs) el.setAttribute(k, attrs[k])
  if (text != null) el.textContent = text
  return el
}
```

### Delegate events (useful for libraries)

```js
function delegate(root, selector, event, handler){
  root.addEventListener(event, function(e){
    const target = e.target.closest(selector)
    if (target && root.contains(target)) handler.call(target, e)
  })
}
```

### Debounce helper

```js
function debounce(fn, wait = 200){
  let t
  return (...args) => { clearTimeout(t); t = setTimeout(()=>fn(...args), wait) }
}
```

### Throttle helper

```js
function throttle(fn, limit = 100){
  let inThrottle
  let last
  return function(...args){
    if (!inThrottle){ fn(...args); inThrottle = true; last = Date.now(); setTimeout(()=> inThrottle = false, limit) }
  }
}
```

### Observe intersection (lazy load)

```js
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      // load image or fire animation
      io.unobserve(e.target)
    }
  })
})
io.observe(document.querySelector('img[data-src]'))
```

### Safely parse HTML fragment

```js
function parseHTML(html){
  const template = document.createElement('template')
  template.innerHTML = html
  return template.content
}
```

---

## Packaging Guidance for Library Authors

* **Core design**: implement logic in framework-agnostic vanilla JS (class / factory / functions). Provide wrappers for React/Vue/Svelte.
* **Build outputs**: ship ESM (`module`) and CommonJS (`main`). Provide `"types"` for TypeScript consumers.
* **Small bundle**: avoid heavy deps; use Rollup/Vite to treeshake.
* **Docs & Demos**: Storybook + small demo app. Show accessibility examples.
* **API design**: prefer composable functions and expose lifecycle methods (`mount`, `destroy`, `open`, `close`). Provide sensible defaults and opt-in advanced features.

---

## Final Checklist (Monstrous but practical)

* Use `querySelector` / `closest` / `matches` for selection & traversal.
* Use `append`, `prepend`, `replaceWith`, `remove` for modern node ops.
* Use `classList` for classes and `style` / `getComputedStyle` for styling.
* Use `addEventListener` with `{ passive, once, capture }` to control behavior and performance.
* Prefer `pointer` events over touch/mouse where possible.
* Use `MutationObserver`, `IntersectionObserver`, `requestAnimationFrame` for advanced needs.
* Sanitize HTML inputs, prefer `textContent`.
* Test keyboard and ARIA for accessibility.
* When building an npm package: vanilla core + wrappers + proper build & types.

---

> This file is intentionally huge. If you want, I will now:
>
> * Export this as `DOM-CheatSheet-Monster.md` and provide a downloadable zip, or
> * Convert key sections into a printable 1-page cheat sheet + 10-page reference PDF, or
> * Break this into modular docs (Events.md, Keyboard.md, APIs.md) and create a small repo scaffold.

Tell me the next step — I’ll do it now.

<footer>Generated: 2025-09-04</footer>
