# VISTTA CSS Loader

`@vistta/css-loader` is the framework-independent runtime stylesheet engine used
by VISTTA JS. Use the same style definitions in React, vanilla JavaScript, or your
own renderer without depending on `@vistta/js`. The base engine does not depend
on React; the optional React adapter uses React 18 or 19.

This is not webpack's `css-loader` and does not load or parse `.css` files.
VISTTA JS's CLI provides its separate build-time `.css` import loader.

## Install

```sh
npm install @vistta/css-loader
```

## Standalone usage

```js
import { VirtualStyleSheet, Style } from "@vistta/css-loader";

const sheet = new VirtualStyleSheet();
sheet.add({
  vars: { accent: "rebeccapurple" },
  root: { fontFamily: "sans-serif" },
  ".button": { padding: "0.5rem 1rem" },
});

document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet.content];

const button = document.createElement("button");
button.textContent = "Save";
const resolved = sheet.resolve(Style.assign("color: $accent", { ":hover": { opacity: 0.8 } }));
if (resolved !== "") button.setAttribute("style-ref", resolved[0]);
document.body.append(button);

// On application teardown, remove only this application's stylesheet.
document.adoptedStyleSheets = document.adoptedStyleSheets.filter((content) => content !== sheet.content);
```

Use one shared `VirtualStyleSheet` per document or shadow root so identical
styles share a rule. Each sheet prefixes its generated `style-ref` IDs and
inline keyframe names, so independent sheets in the same root do not collide.
A shadow root can adopt `sheet.content` through its own `adoptedStyleSheets`
property.

Construction requires a browser with constructable `CSSStyleSheet` and
`adoptedStyleSheets` support. Nested selectors, `@starting-style`, and exit
animations also depend on the corresponding browser CSS APIs. Importing the
package does not construct a stylesheet; create instances only on the client.
The package does not provide a Node.js SSR implementation.

## API

Named exports include `VirtualStyleSheet` and `Style`, with TypeScript declarations.

### `VirtualStyleSheet`

- `new VirtualStyleSheet()` creates an empty native stylesheet.
- `content` exposes the native `CSSStyleSheet` for adoption.
- `rules` exposes its live `CSSRuleList`.
- `add(definition)` registers selector rules and optional `properties`, `queries`,
  `functions`, `vars`, `fonts`, and `animations` definitions. Calls are additive.
- `resolve(value)` accepts a declaration string, object, or array. It returns
  `[id, flags]`, where `id` is a string, or `""` when there is no style. Apply the
  ID using the `style-ref` attribute, not the DOM `style` attribute or React's
  `style` prop. Identical generated declarations reuse their ID. Declarations or
  nested selectors containing `{`, `}`, or a top-level `;` (outside strings and
  parentheses) are dropped. If the browser rejects the generated rule,
  `resolve()` logs a warning and returns `""` instead of throwing; `add()`
  still throws.
- `createAnimation(value)` registers and deduplicates inline keyframes, returning
  their animation declarations.

Declarations support camelCase property names, `$name` references to CSS
variables, and a trailing `!` for `!important`. Nested objects or parenthesized
string blocks describe nested selectors. `:initial` becomes `@starting-style`;
`:exit` becomes `&[exiting-style]`.

```js
sheet.add({
  properties: {
    rounded: { default: { borderRadius: "0.5rem" } },
    space: { "*": "padding: ${}" },
  },
  queries: { narrow: "(max-width: 600px)" },
  functions: { double: "calc(${1} * 2)" },
});

sheet.resolve({
  rounded: true,
  space: "1rem",
  width: "double(10px)",
  narrow: { width: "100%" },
  ":hover": { color: "$accent" },
});
```

#### Definition options

These six keys configure the engine; other keys passed to `add()` are CSS
selectors. For example, `root` becomes `:root`, while `.button` registers a
normal class selector.

| Option | Purpose |
| --- | --- |
| `properties` | Custom declaration aliases and value-based style presets. |
| `functions` | Custom function-like aliases inside CSS values. |
| `queries` | Named media-query aliases for nested style blocks. |
| `vars` | CSS custom-property registrations and initial values. |
| `fonts` | Named font-family registrations. |
| `animations` | Named keyframe animations. |

Register definitions before using them in selectors or `resolve()`. They belong
to that `VirtualStyleSheet` instance. Updating definitions does not rewrite CSS
rules already inserted into the sheet.

##### `properties`: declaration aliases and presets

`properties` is customizable: each name defines a style alias, and each value
selects a declaration template. Templates can be declaration strings, objects,
or arrays of declaration strings; they can also contain nested styles.

```js
sheet.add({
  properties: {
    rounded: {
      default: { borderRadius: "0.5rem" },
      small: { borderRadius: "0.25rem" },
      large: { borderRadius: "1rem" },
    },
    space: { "*": "padding: ${}" },
    interactive: {
      default: {
        cursor: "pointer",
        ":hover": { opacity: 0.8 },
      },
    },
  },
});

sheet.resolve({ rounded: true, space: "1rem", interactive: true });
sheet.resolve("rounded: small; space: 8px");
```

- `true` in an object, or a bare alias such as `"rounded"` in a string, selects
  the `default` template.
- A named value such as `"small"` selects that exact template.
- `"*"` is a fallback for other values; `${}` is replaced with the supplied
  value. Here, `space: "1rem"` produces `padding: 1rem`.
- An exact value match takes precedence over `"*"`. Without either match, the
  alias produces no declarations.

Aliases can expand into several declarations rather than just rename one CSS
property. They are declaration templates, not JavaScript callbacks. Keep alias
names in kebab-case, because declaration keys are normalized from camelCase
before lookup.

##### `functions`: aliases inside values

`functions` is also customizable, but it operates inside a declaration's value,
not on its property name. Each entry maps a function name to a CSS text template.

```js
sheet.add({
  functions: {
    double: "calc(${1} * 2)",
    inset: "inset(${1} ${2:0px})",
  },
});

sheet.resolve({
  width: "double(10px)",
  clipPath: "inset(8px)",
});
```

This generates `width: calc(10px * 2)` and `clip-path: inset(8px 0px)`.
`${1}`, `${2}`, and so on refer to comma-separated arguments, starting at one.
`${2:0px}` supplies a fallback for a missing second argument. Argument splitting
respects nested parentheses, so arguments can contain CSS function calls.

These aliases substitute text; they do not execute JavaScript functions.
The resulting value is interpreted by the browser as CSS.

##### `queries`: named media queries

`queries` maps your own names to media-query conditions. Use a query name with a
nested style object or a parenthesized declaration block:

```js
sheet.add({
  queries: {
    narrow: "(max-width: 600px)",
    reduced: "(prefers-reduced-motion: reduce)",
  },
});

sheet.resolve({
  narrow: { width: "100%" },
  reduced: { transition: "none" },
});
```

The nested styles become `@media` blocks under the current selector. This is
different from a scalar declaration such as `narrow: "100%"`, which is not a
query block. For explicit at-rules without aliases, nested keys such as
`:media(max-width: 600px)` and `:supports(display: grid)` are also supported.

##### `vars`: CSS custom properties

`vars` registers custom properties using CSS `@property`. This is separate from
the declaration aliases in `properties`: it defines CSS variables rather than
custom style-property names.

```js
sheet.add({
  vars: {
    spacing: "1rem",
    accent: {
      value: "rebeccapurple",
      syntax: "<color>",
      inherits: true,
    },
  },
});

sheet.resolve({ color: "$accent", padding: "$spacing" });
```

Use names without `--` in the definitions. `$accent` becomes `var(--accent)`.
A string, number, or array supplies the initial value; array items are joined
with spaces. An object accepts `value` (or `"initial-value"`), `syntax`, and
`inherits`. The defaults are `syntax: "*"` and `inherits: true`. Values must
satisfy the browser's `@property` rules.

To assign a different value on an element or selector, use a declaration such
as `{ "$accent": "tomato" }`, which generates `--accent: tomato`.
Registrations are not isolated by `style-ref`; normal custom-property
inheritance applies.

##### `fonts`: named font families

`fonts` creates `@font-face` rules. Each key is the font-family name, and the
value supplies its source, either as a string or an object with `src`.

```js
sheet.add({
  fonts: {
    Interface: "url('/fonts/interface.woff2') format('woff2')",
    Display: { src: "url('/fonts/display.woff2') format('woff2')" },
  },
});

sheet.resolve({ fontFamily: "Interface, sans-serif" });
```

Registering a font does not apply it automatically; select the family through a
`font-family` declaration. Font-family names are not scoped by `style-ref`.

##### `animations`: named keyframes

`animations` maps names to keyframe objects, using `from`, `to`, or percentage
steps. Each step contains its CSS declarations.

```js
sheet.add({
  animations: {
    fade: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
  },
});

sheet.resolve({ animation: "fade 200ms ease-out" });
```

This creates `@keyframes fade`; reference it using ordinary animation
declarations. Named keyframes are distinct from the inline keyframes generated
by `createAnimation()`, and their names are not scoped by `style-ref`.

#### `style-ref`: scoped and nested styles

`style-ref` anchors the CSS generated by `resolve()` to the element carrying
that attribute. Unlike an inline `style` attribute, it allows pseudo-classes,
pseudo-elements, descendant selectors, and conditional blocks to remain nested
under the element's generated selector.

For example:

```js
const resolved = sheet.resolve({
  color: "red",
  ":hover": { color: "blue" },
  button: { fontWeight: 600 },
});
if (resolved !== "") element.setAttribute("style-ref", resolved[0]);
```

For a generated ID of `k3x9z-0`, the rule is equivalent to:

```css
[style-ref="k3x9z-0"] {
  color: red;
  &:hover {
    color: blue;
  }
  button {
    font-weight: 600;
  }
}
```

The hover rule targets the matching element itself; the `button` rule targets
its descendant buttons, not unrelated buttons elsewhere in the document.
Elements resolving to identical generated declarations reuse the same
`style-ref` ID and rule.

This is selector scoping, not Shadow DOM isolation: the normal CSS cascade and
inheritance still apply. IDs are prefixed per sheet, so independent sheets in
the same root do not collide. Explicit selectors registered through `add()`, such
as `.button` or `root`, are not automatically scoped to a `style-ref` rule.

### `Style`

- `Style.assign(target, ...sources)` merges string, object, or array styles into
  an object, with later properties overwriting earlier ones. An object target
  is mutated and returned, matching `Object.assign`; use `{}` as the first
  argument when you need a new object.
- `Style.ensureObject(value)` converts a string or array style to an object.
- `Style.waitForExit(node)` sets `exiting-style` and waits for the exit animation
  to finish before your renderer removes the node.
- `Style.stopExit(node)` removes `exiting-style` and stops its polling timer, for
  example when your renderer reuses a node that was leaving.

Invalid CSS insertion errors are propagated by the native stylesheet.

## React: use the ordinary `style` prop

No component-level hooks, manual `resolve()` calls, or stylesheet props are
needed. Configure the automatic JSX runtime once and wrap your application in a
`StyleSheetProvider`.

```sh
npm install @vistta/css-loader react react-dom
```

For TypeScript, set these compiler options:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@vistta/css-loader/react"
  }
}
```

The development mode `"jsx": "react-jsxdev"` is also supported. Your JSX compiler
must use this import source too: for Babel's React preset, use
`{ "runtime": "automatic", "importSource": "@vistta/css-loader/react" }`; for
Vite's React plugin, use `react({ jsxImportSource: "@vistta/css-loader/react" })`.
Alternatively, opt in per file with
`/** @jsxImportSource @vistta/css-loader/react */` when your compiler supports it.
The classic `React.createElement` transform does not use this adapter.

```jsx
import { StyleSheetProvider } from "@vistta/css-loader/react";

const styles = [
  {
    vars: { accent: "rebeccapurple" },
    root: { fontFamily: "sans-serif" },
  },
];

function App() {
  return (
    <>
      <button style="color: $accent; :hover:(opacity: 0.8)">Save</button>
      <div style={{ padding: "1rem", ":initial": { opacity: 0 } }}>Object styles</div>
      <span style={["color: $accent", { fontWeight: 600 }]}>Array styles</span>
    </>
  );
}

// Render this from your existing React root.
export default function Root() {
  return (
    <StyleSheetProvider styles={styles}>
      <App />
    </StyleSheetProvider>
  );
}
```

`StyleSheetProvider` accepts an optional `styles` array, like VISTTA JS's
`config.styles`. Use a stable array when definitions do not change. Replacing it
creates a fresh sheet and updates existing elements without remounting them.
Use one provider per document so identical styles share a rule.
This adapter currently targets the document, not shadow roots.

The runtime intercepts `style` on intrinsic DOM and SVG elements. Custom
components still receive their original props and can forward `style` to their
rendered elements. Refs, event handlers, keys, and children retain React behavior;
changing or clearing `style` does not replace the DOM node.

Styles use the VISTTA engine's declaration semantics, not React inline-style
conversion. Include units explicitly where CSS requires them (`padding: "8px"`,
not `padding: 8`). The adapter installs rules during React's commit phase before
layout effects, preserves unrelated adopted sheets, and cleans up on unmount.
Suspended renders do not insert rules. Rules are cached for the provider's
lifetime, so avoid an unbounded number of unique values.

This is a client-only adapter. It requires constructable stylesheets and does not
provide Node.js server rendering or hydration support. Only JSX compiled with
the configured import source is intercepted; third-party components compiled
with React's default runtime are unchanged.

React removes unmounted elements immediately. To use `:exit`, retain the DOM
element until `Style.waitForExit(node)` resolves, then update your component state
to remove it. The engine does not intercept React's unmount lifecycle.

## Custom renderer integration

1. Create one sheet for your render root, register definitions with `add()`, and
   adopt `content` without replacing unrelated sheets.
2. When a style prop changes, call `resolve()`. Set `style-ref` to the returned
   ID, or remove the attribute when the result is `""`.
3. Keep the returned flags with your element's renderer metadata. If
   `flags["exiting-style"]` is true, defer removal until `Style.waitForExit(node)`
   completes. Call `Style.stopExit(node)` if that removal is cancelled.
4. On teardown, unadopt only this sheet. New definitions and resolved rules are
   reflected automatically in the adopted native stylesheet.

## Development

```sh
npm test
# Equivalent:
npx vistta test --environment=browser
```

Run from this package directory after installing the workspace development
dependencies. Its `jsconfig.json` extends `@vistta/js/config`, selecting the
VISTTA JS test command; the test script explicitly selects Chromium with
`--environment=browser`. The test tools are development dependencies only and
are not required by applications consuming the stylesheet engine.

Both suites require a real browser: they check native CSS parsing, computed
styles, stylesheet adoption, DOM lifecycle helpers, and React rendering. Keep
the existing top-level imports and suite declarations; do not run these tests
with the Node-only CLI command or the SSR DOM adapter.
