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
if (resolved !== "") button.setAttribute("style-group", String(resolved[0]));
document.body.append(button);

// On application teardown, remove only this application's stylesheet.
document.adoptedStyleSheets = document.adoptedStyleSheets.filter((content) => content !== sheet.content);
```

Use one shared `VirtualStyleSheet` per document or shadow root: generated
`style-group` IDs are local to a sheet. Multiple independent sheets in the same
root can generate matching IDs. A shadow root can adopt `sheet.content` through
its own `adoptedStyleSheets` property.

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
  `[id, flags]`, or `""` when there is no style. Apply the ID using the
  `style-group` attribute, not the DOM `style` attribute or React's `style` prop.
  Identical generated declarations reuse their ID.
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
Use one provider per document, because generated group IDs are local to a sheet.
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
2. When a style prop changes, call `resolve()`. Set `style-group` to the returned
   ID, or remove the attribute when the result is `""`.
3. Keep the returned flags with your element's renderer metadata. If
   `flags["exiting-style"]` is true, defer removal until `Style.waitForExit(node)`
   completes. Call `Style.stopExit(node)` if that removal is cancelled.
4. On teardown, unadopt only this sheet. New definitions and resolved rules are
   reflected automatically in the adopted native stylesheet.

## Development

```sh
npx vistta test
```

Run from this package directory in the development workspace. The VISTTA browser
test runner checks native CSS parsing, computed styles, caching, and lifecycle
helpers in Chromium.
