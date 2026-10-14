import { StyleSheetProvider } from "@vistta/css-loader/react";
import { jsxDEV } from "@vistta/css-loader/react/jsx-dev-runtime";
import { Fragment, jsx, jsxs } from "@vistta/css-loader/react/jsx-runtime";
import { createRef, forwardRef, StrictMode, Suspense, useLayoutEffect } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";

/**
 * @param {(root: import("react-dom/client").Root, host: HTMLDivElement) => void} callback
 */
function withRoot(callback) {
  const host = document.createElement("div");
  document.body.append(host);
  const root = createRoot(host);
  try {
    callback(root, host);
  } finally {
    flushSync(() => root.unmount());
    host.remove();
  }
}

suite("CSS Loader React", () => {
  test("automatically handles string, object, and array style props", () => {
    withRoot((root, host) => {
      flushSync(() =>
        root.render(
          jsx(StyleSheetProvider, {
            styles: [{ vars: { accent: "rebeccapurple" } }],
            children: jsxs(Fragment, {
              children: [
                jsx("button", { style: "color: $accent", children: "String" }),
                jsx("div", { style: { borderRadius: "8px", ":hover": { opacity: 0.5 } } }),
                jsx("span", { style: ["padding: 12px", "color: blue"] }),
              ],
            }),
          }),
        ),
      );
      const [button, div, span] = host.children;
      expect(getComputedStyle(button).color).toEqual("rgb(102, 51, 153)");
      expect(getComputedStyle(div).borderRadius).toEqual("8px");
      expect(getComputedStyle(span).padding).toEqual("12px");
      expect(getComputedStyle(span).color).toEqual("rgb(0, 0, 255)");
      expect(button.hasAttribute("style")).toEqual(false);
      expect(div.hasAttribute("style-ref")).toEqual(true);
    });
  });

  test("updates and removes styles without replacing the node or losing its ref", () => {
    withRoot((root, host) => {
      const ref = createRef();
      const render = (style) =>
        flushSync(() =>
          root.render(
            jsx(StyleSheetProvider, {
              children: jsx("input", { ref, style, defaultValue: "kept" }),
            }),
          ),
        );
      render({ color: "red" });
      const node = host.firstElementChild;
      expect(ref.current === node).toEqual(true);
      expect(getComputedStyle(node).color).toEqual("rgb(255, 0, 0)");
      render("color: blue");
      expect(host.firstElementChild === node).toEqual(true);
      expect(ref.current === node).toEqual(true);
      expect(getComputedStyle(node).color).toEqual("rgb(0, 0, 255)");
      render(undefined);
      expect(host.firstElementChild === node).toEqual(true);
      expect(node.hasAttribute("style-ref")).toEqual(false);
      expect(ref.current.value).toEqual("kept");
      render({ color: "red" });
      expect(host.firstElementChild === node).toEqual(true);
      expect(getComputedStyle(node).color).toEqual("rgb(255, 0, 0)");
    });
  });

  test("preserves callback refs, events, keys, and custom component props", () => {
    withRoot((root, host) => {
      let attached = 0;
      let detached = 0;
      let clicks = 0;
      const ref = (node) => {
        if (node) attached++;
        else detached++;
      };
      const style = { color: "red" };
      let receivedStyle;
      const Button = forwardRef(function Button(props, ref) {
        receivedStyle = props.style;
        return jsx("button", { ...props, ref });
      });
      const render = (reverse) =>
        flushSync(() =>
          root.render(
            jsx(StyleSheetProvider, {
              children: jsxs("div", {
                children: (reverse ? ["b", "a"] : ["a", "b"]).map((key) =>
                  jsx(Button, { ref, style, onClick: () => clicks++, children: key }, key),
                ),
              }),
            }),
          ),
        );
      render(false);
      expect(receivedStyle === style).toEqual(true);
      const first = host.querySelector("button");
      first.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      expect(clicks).toEqual(1);
      render(true);
      expect(host.querySelectorAll("button")[1] === first).toEqual(true);
      expect(attached).toEqual(2);
      expect(detached).toEqual(0);
      flushSync(() => root.unmount());
      expect(detached).toEqual(2);
    });
  });

  test("adopts before layout effects and cleans up only its sheet in StrictMode", () => {
    const unrelated = new CSSStyleSheet();
    const original = [...document.adoptedStyleSheets];
    document.adoptedStyleSheets = [...original, unrelated];
    try {
      withRoot((root, host) => {
        let measuredColor;
        const ref = createRef();
        function App() {
          useLayoutEffect(() => {
            measuredColor = getComputedStyle(ref.current).color;
          });
          return jsx("div", { ref, style: "color: red" });
        }
        flushSync(() => root.render(jsx(StrictMode, { children: jsx(StyleSheetProvider, { children: jsx(App, {}) }) })));
        expect(measuredColor).toEqual("rgb(255, 0, 0)");
        expect(host.firstElementChild === ref.current).toEqual(true);
        expect(document.adoptedStyleSheets.length).toEqual(original.length + 2);
        flushSync(() => root.unmount());
        expect(document.adoptedStyleSheets.length).toEqual(original.length + 1);
        expect(document.adoptedStyleSheets.includes(unrelated)).toEqual(true);
      });
    } finally {
      document.adoptedStyleSheets = original;
    }
  });

  test("replaces definitions when provider styles change without remounting elements", () => {
    withRoot((root, host) => {
      const render = (color) =>
        flushSync(() =>
          root.render(
            jsx(StyleSheetProvider, {
              styles: [{ vars: { accent: color } }],
              children: jsx("div", { style: "color: $accent" }),
            }),
          ),
        );
      render("red");
      const node = host.firstElementChild;
      const oldSheet = document.adoptedStyleSheets[document.adoptedStyleSheets.length - 1];
      render("blue");
      expect(host.firstElementChild === node).toEqual(true);
      expect(getComputedStyle(node).color).toEqual("rgb(0, 0, 255)");
      expect(document.adoptedStyleSheets.includes(oldSheet)).toEqual(false);
    });
  });

  test("supports the development JSX runtime and SVG styles", () => {
    withRoot((root, host) => {
      flushSync(() =>
        root.render(
          jsxDEV(
            StyleSheetProvider,
            {
              children: jsxDEV(
                "svg",
                {
                  children: jsxDEV("circle", { cx: 10, cy: 10, r: 5, style: "fill: red" }, undefined, false),
                },
                undefined,
                false,
              ),
            },
            undefined,
            false,
          ),
        ),
      );
      const circle = host.querySelector("circle");
      expect(circle.namespaceURI).toEqual("http://www.w3.org/2000/svg");
      expect(getComputedStyle(circle).fill).toEqual("rgb(255, 0, 0)");
    });
  });

  test("does not inject rules for a suspended render", () => {
    withRoot((root, host) => {
      flushSync(() => root.render(jsx(StyleSheetProvider, { children: jsx("div", { style: "color: blue" }) })));
      const sheet = document.adoptedStyleSheets[document.adoptedStyleSheets.length - 1];
      const before = sheet.cssRules.length;
      const pending = new Promise(() => {});
      function Pending() {
        throw pending;
      }
      flushSync(() =>
        root.render(
          jsx(StyleSheetProvider, {
            children: jsx(Suspense, {
              fallback: jsx("span", { children: "Loading" }),
              children: jsx("div", { style: "color: red", children: jsx(Pending, {}) }),
            }),
          }),
        ),
      );
      expect(sheet.cssRules.length).toEqual(before);
      expect(host.textContent).toEqual("Loading");
    });
  });

  test("reports a missing provider rather than silently ignoring styles", () => {
    expect(() => renderToString(jsx("div", { style: "color: red" }))).toThrow("StyleSheetProvider");
  });
});
