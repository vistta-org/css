import { STYLE_REF_ATTRIBUTE, Style, VirtualStyleSheet } from "@vistta/css";
import { Style as FrameworkStyle } from "@vistta/js";

function css(sheet) {
  return Array.from(sheet.rules, (rule) => rule.cssText).join(" ");
}

suite("CSS", () => {
  test("preserves VISTTA JS's public Style export", () => {
    const merged = FrameworkStyle.assign({}, "color: red", { padding: "8px" });
    expect(merged.color).toEqual("red");
    expect(merged.padding).toEqual("8px");
    expect(FrameworkStyle.ensureObject("color: blue").color).toEqual("blue");
    expect(typeof FrameworkStyle.waitForExit).toEqual("function");
    expect(typeof FrameworkStyle.stopExit).toEqual("function");
  });

  test("exposes a native sheet and preserves bound methods", () => {
    const sheet = new VirtualStyleSheet();
    expect(sheet.content instanceof CSSStyleSheet).toEqual(true);
    expect(sheet.rules === sheet.content.cssRules).toEqual(true);
    const { add, resolve } = sheet;
    add({ ".button": { fontSize: "16px" } });
    expect(css(sheet)).toMatch(/\.button \{ font-size:\s*16px;/);
    const resolved = resolve("color: red");
    if (resolved === "") throw new Error("Expected a style ref");
    expect(typeof resolved[0]).toEqual("string");
    expect(Object.keys(resolved[1]).length).toEqual(0);
  });

  test("resolves strings, objects, and arrays and reuses identical groups", () => {
    const sheet = new VirtualStyleSheet();
    const result = sheet.resolve({ color: "red", fontSize: "16px" });
    if (result === "") throw new Error("Expected a style ref");
    expect(Object.keys(result[1]).length).toEqual(0);
    expect(sheet.resolve("color: red; font-size: 16px") === result).toEqual(true);
    expect(sheet.resolve(["color: red", "font-size: 16px"]) === result).toEqual(true);
    expect(sheet.rules.length).toEqual(1);
    expect(css(sheet)).toInclude(`[${STYLE_REF_ATTRIBUTE}="${result[0]}"]`);
    const blue = sheet.resolve({ color: "blue" });
    if (blue === "") throw new Error("Expected a style ref");
    expect(blue[0] !== result[0]).toEqual(true);
    expect(Object.keys(blue[1]).length).toEqual(0);
    for (const value of ["", {}, [], null, undefined, false]) {
      expect(sheet.resolve(value)).toEqual("");
    }
  });

  test("supports variables, important values, nested selectors, and lifecycle flags", () => {
    const sheet = new VirtualStyleSheet();
    const result = sheet.resolve({
      backgroundColor: "$accent!",
      ":hover": { color: "red" },
      ":before": { content: "" },
      ":initial": { opacity: 0 },
      ":exit": { opacity: 0 },
    });
    if (result === "") throw new Error("Expected a style ref");
    expect(result[1]["exiting-style"]).toEqual(true);
    expect(css(sheet)).toMatch(/background-color:\s*var\(--accent\) !important;/);
    expect(css(sheet)).toMatch(/&:hover/);
    expect(css(sheet)).toMatch(/&::before \{ content:\s*"";/);
    expect(css(sheet)).toMatch(/@starting-style/);
    expect(css(sheet)).toMatch(/&\[exiting-style\]/);
  });

  test("registers reusable properties, queries, functions, variables, fonts, and keyframes", () => {
    const sheet = new VirtualStyleSheet();
    sheet.add({
      properties: {
        rounded: { default: { borderRadius: "0.5rem" } },
        space: { "*": "padding: ${}" },
      },
      queries: { narrow: "(max-width: 600px)" },
      functions: { double: "calc(${1} * 2)" },
      vars: { accent: "rebeccapurple" },
      fonts: { Demo: "url(demo.woff2)" },
      animations: { fade: { from: { opacity: 0 }, to: { opacity: 1 } } },
      root: { color: "$accent" },
    });
    sheet.resolve({
      rounded: true,
      space: "1rem",
      width: "double(10px)",
      narrow: { width: "100%" },
    });
    const content = css(sheet);
    for (const pattern of [
      /@property --accent/,
      /@font-face/,
      /@keyframes fade/,
      /:root \{ color:\s*var\(--accent\);/,
      /border-radius:\s*0.5rem;/,
      /padding:\s*1rem;/,
      /width:\s*calc\(20px\);/,
      /@media \(max-width:\s*600px\)/,
    ]) {
      expect(content).toMatch(pattern);
    }
  });

  test("deduplicates inline animation keyframes", () => {
    const sheet = new VirtualStyleSheet();
    const value = "duration:1s; from { opacity:0; } to { opacity:1; }";
    expect(sheet.createAnimation(value)).toEqual(sheet.createAnimation(value));
    expect(sheet.rules.length).toEqual(1);
    expect(sheet.createAnimation(value)).toMatch(/animation-duration: 1s;/);
  });

  test("converts styles and assigns sources into an object target", () => {
    const source = { color: "red" };
    const parsed = Style.ensureObject("color: red; :hover:(opacity: 0.8)");
    expect(parsed.color).toEqual("red");
    const hover = parsed[":hover"];
    if (!hover || typeof hover !== "object" || Array.isArray(hover)) {
      throw new Error("Expected a nested hover style");
    }
    expect(hover.opacity).toEqual("0.8");
    const assigned = Style.assign(source, ["color: blue", { padding: "1rem" }]);
    expect(assigned === source).toEqual(true);
    expect(source.color).toEqual("blue");
    expect(assigned.padding).toEqual("1rem");
  });

  test("exposes exit lifecycle helpers without a framework", async () => {
    const node = document.createElement("div");
    await Style.waitForExit(node);
    expect(node.getAttribute("exiting-style")).toEqual("");
    Style.stopExit(node);
    expect(node.hasAttribute("exiting-style")).toEqual(false);
  });

  test("propagates native CSS insertion errors", () => {
    const sheet = new VirtualStyleSheet();
    sheet.content.insertRule = () => {
      throw new SyntaxError("Invalid CSS");
    };
    expect(() => sheet.add({ ".button": { color: "red" } })).toThrow("Invalid CSS");
  });

  test("ignores invalid styles in resolve instead of throwing", () => {
    const sheet = new VirtualStyleSheet();
    const insertRule = sheet.content.insertRule.bind(sheet.content);
    sheet.content.insertRule = () => {
      throw new SyntaxError("Invalid CSS");
    };
    const warn = console.warn;
    console.warn = () => {};
    try {
      expect(sheet.resolve({ color: "red" })).toEqual("");
      expect(sheet.resolve({ animation: "from { opacity: 0; } to { opacity: 1; }" })).toEqual("");
    } finally {
      console.warn = warn;
    }
    sheet.content.insertRule = insertRule;
    const resolved = sheet.resolve({ color: "red" });
    if (resolved === "") throw new Error("Expected a style ref");
    expect(sheet.rules.length).toEqual(1);
  });

  test("drops declarations and selectors that would escape their rule", () => {
    const sheet = new VirtualStyleSheet();
    sheet.add({ properties: { space: { "*": "padding: ${}" } } });
    const resolved = sheet.resolve({
      color: "red; & ~ * { display: none",
      width: "1px } body { margin: 0",
      "& * { display: none } &": { color: "blue" },
      space: "1rem; margin: 0",
      background: 'url("a;b{c}.png")',
      content: '";"',
      height: "1px",
    });
    if (resolved === "") throw new Error("Expected a style ref");
    const content = css(sheet);
    expect(content).not.toMatch(/display|margin|blue|padding/);
    expect(content).toMatch(/height:\s*1px;/);
    expect(content).toInclude("a;b{c}.png");
    expect(sheet.resolve({ color: "red }" })).toEqual("");
  });

  test("generates distinct IDs and animation names for independent sheets", () => {
    const first = new VirtualStyleSheet();
    const second = new VirtualStyleSheet();
    const a = first.resolve({ color: "red" });
    const b = second.resolve({ color: "red" });
    if (a === "" || b === "") throw new Error("Expected style refs");
    expect(a[0] !== b[0]).toEqual(true);
    const value = "from { opacity: 0; } to { opacity: 1; }";
    expect(first.createAnimation(value) !== second.createAnimation(value)).toEqual(true);
  });

  test("applies native styles and preserves unrelated sheets on cleanup", () => {
    const original = [...document.adoptedStyleSheets];
    const unrelated = new CSSStyleSheet();
    unrelated.insertRule("body { margin: 13px; }");
    const sheet = new VirtualStyleSheet();
    const node = document.createElement("button");
    try {
      sheet.add({ vars: { accent: "rebeccapurple" } });
      const resolved = sheet.resolve({ color: "$accent", borderRadius: "8px" });
      if (resolved === "") throw new Error("Expected a style ref");
      node.setAttribute(STYLE_REF_ATTRIBUTE, resolved[0]);
      document.adoptedStyleSheets = [...original, unrelated, sheet.content];
      document.body.append(node);
      expect(getComputedStyle(node).color).toEqual("rgb(102, 51, 153)");
      expect(getComputedStyle(node).borderRadius).toEqual("8px");
      expect(getComputedStyle(document.body).margin).toEqual("13px");
      document.adoptedStyleSheets = document.adoptedStyleSheets.filter((content) => content !== sheet.content);
      expect(document.adoptedStyleSheets.includes(unrelated)).toEqual(true);
      expect(document.adoptedStyleSheets.includes(sheet.content)).toEqual(false);
    } finally {
      node.remove();
      document.adoptedStyleSheets = original;
    }
  });
});
