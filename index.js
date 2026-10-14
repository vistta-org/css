import { BoundClass, join } from "@vistta/utils";
/**
 * Style definition object.
 * @typedef {Object<string, any>} StyleDefinition
 */

/**
 * A stylesheet definition, which can be a file or an object mapping style rules to CSS style declarations.
 * @typedef {string|StyleDefinition} Stylesheet
 */

/**
 * @typedef {Object} StyleFormatOptions
 * @property {any} [properties]
 * @property {any} [queries]
 * @property {any} [functions]
 * @property {Object<string, boolean>} [flags]
 * @property {boolean} [selector]
 * @property {(value: string) => string} [createAnimation]
 */

export class VirtualStyleSheet extends BoundClass {
  #instance;
  #styleGroups = {};
  #count = 0;
  #animations = {};
  #properties = {};
  #queries = {};
  #functions = [];

  get rules() {
    return this.#instance.cssRules;
  }

  get content() {
    return this.#instance;
  }

  constructor() {
    super();
    this.#instance = new CSSStyleSheet();
  }

  add(style) {
    const { properties = {}, queries = {}, functions = {}, vars = {}, fonts = {}, animations = {}, ...selectors } = style;
    let keys = Object.keys(properties);
    for (let i = 0, len = keys.length; i < len; i++) {
      if (typeof properties[keys[i]] !== "object") continue;
      const values = Object.keys(properties[keys[i]]);
      const styleValues = {};
      for (let j = 0, vlen = values.length; j < vlen; j++) {
        const value = properties[keys[i]][values[j]];
        const typeofValue = typeof value;
        if (typeofValue === "string") {
          const flags = /** @type {Object<string, boolean>} */ ({});
          styleValues[values[j]] = {
            value: stringToStyle(value, { flags, createAnimation: (value) => this.createAnimation(value) }),
            flags,
          };
        } else if (typeofValue === "object") {
          if (Array.isArray(value)) {
            const flags = /** @type {Object<string, boolean>} */ ({});
            styleValues[values[j]] = {
              value: stringToStyle(join(value, "; "), {
                flags,
                createAnimation: (value) => this.createAnimation(value),
              }),
              flags,
            };
          } else {
            const flags = /** @type {Object<string, boolean>} */ ({});
            styleValues[values[j]] = {
              value: objectToStyle(value, {
                flags,
                createAnimation: (value) => this.createAnimation(value),
              }),
              flags,
            };
          }
        }
      }
      this.#properties[keys[i]] = (value) => {
        if (styleValues[value]) return styleValues[value];
        if (styleValues["*"])
          return {
            value: styleValues["*"].value.replace(/\$\{\}/g, formatValue(value)),
            flags: styleValues["*"].flags,
          };
        return { value: "", flags: {} };
      };
    }

    keys = Object.keys(queries);
    for (let i = 0, len = keys.length; i < len; i++) {
      if (typeof queries[keys[i]] !== "string") continue;
      this.#queries[keys[i]] = queries[keys[i]];
    }

    keys = Object.keys(functions);
    for (let i = 0, len = keys.length; i < len; i++) {
      if (typeof functions[keys[i]] !== "string") continue;
      this.#functions.push({ regex: new RegExp(keys[i] + "\\(", "g"), template: functions[keys[i]] });
    }

    keys = Object.keys(vars);
    for (let i = 0, len = keys.length; i < len; i++) {
      const value = vars[keys[i]];
      const typeofValue = typeof value;
      if (typeofValue === "string" || typeofValue === "number")
        this.#insertRule(`@property --${keys[i]} { initial-value: ${formatValue(value)}; inherits: true; syntax: '*'; }`);
      else if (typeofValue === "object") {
        if (Array.isArray(value))
          this.#insertRule(
            `@property --${keys[i]} { initial-value: ${formatValue(join(value, " "))}; inherits: true; syntax: '*'; }`,
          );
        else
          this.#insertRule(
            `@property --${keys[i]} { initial-value: ${formatValue(value.value || value["initial-value"])}; inherits: ${
              value.inherits ?? "true"
            }; syntax: '${value.syntax ?? "*"}'; }`,
          );
      }
    }

    keys = Object.keys(fonts);
    for (let i = 0, len = keys.length; i < len; i++) {
      const font = keys[i];
      const value = fonts[font];
      const typeofValue = typeof value;
      if (typeofValue === "string")
        this.#insertRule(`@font-face { font-family: '${font}'; src: ${value}; font-display: 'auto'; }`);
      else if (typeofValue === "object") {
        if (Array.isArray(value))
          this.#insertRule(`@font-face { font-family: '${font}'; src: ${join(value, " ")}; font-display: 'auto'; }`);
        else
          this.#insertRule(
            `@font-face { font-family: '${font}'; src: ${value.src}; font-display: '${value.display || "auto"}'; }`,
          );
      }
    }

    keys = Object.keys(animations);
    for (let i = 0, len = keys.length; i < len; i++) {
      const animation = keys[i];
      const value = animations[animation];
      if (typeof value !== "object" || Array.isArray(value)) continue;
      this.#insertRule(
        `@keyframes ${animation} { ${objectToStyle(value, {
          properties: this.#properties,
          queries: this.#queries,
          functions: this.#functions,
        })} }`,
      );
    }

    keys = Object.keys(selectors);
    for (let i = 0, len = keys.length; i < len; i++) {
      const value = selectors[keys[i]];
      const typeofValue = typeof value;
      if (keys[i] === "root") keys[i] = ":root";
      else if (/[{}]/.test(keys[i])) continue;
      if (typeofValue === "string" || typeofValue === "number")
        this.#insertRule(
          `${keys[i]} { ${stringToStyle(value, {
            properties: this.#properties,
            queries: this.#queries,
            functions: this.#functions,
            createAnimation: (value) => this.createAnimation(value),
          })} }`,
        );
      else if (typeofValue === "object") {
        if (Array.isArray(value))
          this.#insertRule(
            `${keys[i]} { ${stringToStyle(join(value, "; "), {
              properties: this.#properties,
              queries: this.#queries,
              functions: this.#functions,
              createAnimation: (value) => this.createAnimation(value),
            })} }`,
          );
        else
          this.#insertRule(
            `${keys[i]} { ${objectToStyle(value, {
              properties: this.#properties,
              queries: this.#queries,
              functions: this.#functions,
              createAnimation: (value) => this.createAnimation(value),
            })} }`,
          );
      }
    }
  }

  resolve(value) {
    let style;
    const typeofValue = typeof value;
    const flags = /** @type {Object<string, boolean>} */ ({});
    if (typeofValue === "string")
      style = stringToStyle(value, {
        properties: this.#properties,
        queries: this.#queries,
        functions: this.#functions,
        flags,
        createAnimation: (value) => this.createAnimation(value),
      });
    else if (typeofValue === "object") {
      if (Array.isArray(value))
        style = stringToStyle(join(value, "; "), {
          properties: this.#properties,
          queries: this.#queries,
          functions: this.#functions,
          flags,
          createAnimation: (value) => this.createAnimation(value),
        });
      else if (value)
        style = objectToStyle(value, {
          properties: this.#properties,
          queries: this.#queries,
          functions: this.#functions,
          flags,
          createAnimation: (value) => this.createAnimation(value),
        });
    } else return "";
    if (!style) return "";
    if (this.#styleGroups[style]) return this.#styleGroups[style];
    const id = this.#count++;
    this.#insertRule(`[style-group="${id}"] { ${style}}`);
    return (this.#styleGroups[style] = [id, flags]);
  }

  createAnimation(value) {
    const matches = {
      "animation-composition": value.match(/composition:([^;]+);/),
      "animation-delay": value.match(/delay:([^;]+);/),
      "animation-direction": value.match(/direction:([^;]+);/),
      "animation-duration": value.match(/duration:([^;]+);/),
      "animation-iteration-count": value.match(/iteration-count:([^;]+);/),
      "animation-fill-mode": value.match(/fill-mode:([^;]+);/),
      "animation-play-state": value.match(/play-state:([^;]+);/),
      "animation-range": value.match(/range:([^;]+);/),
      "animation-range-end": value.match(/range-end:([^;]+);/),
      "animation-range-start": value.match(/range-start:([^;]+);/),
      "animation-timeline": value.match(/timeline:([^;]+);/),
      "animation-timing-function": value.match(/timing-function:([^;]+);/),
    };
    let style = "";
    const keys = Object.keys(matches);
    for (let i = 0, len = keys.length; i < len; i++) {
      if (!matches[keys[i]]) continue;
      value = value.replace(matches[keys[i]][0], "");
      style += `${keys[i]}: ${matches[keys[i]][1].trim()}; `;
    }
    value = value.trim();
    if (!this.#animations[value]) {
      const name = "custom-animation-" + Object.keys(this.#animations).length;
      this.#animations[value] = name;
      this.#insertRule(`@keyframes ${name} { ${value}}`);
    }
    return `animation-name: ${this.#animations[value]}; ${style}`;
  }

  #insertRule(rule) {
    this.#instance.insertRule(rule, this.#instance.cssRules.length);
  }
}

function stringToStyle(value, options = /** @type {StyleFormatOptions} */ ({})) {
  let style = "";
  let [key, val, rest] = extractKeyValueFromString(value);
  while (key) {
    if (val?.startsWith("(") && val?.endsWith(")"))
      style += format(key, stringToStyle(val.slice(1, -1), options), { ...options, selector: true }) + " ";
    else style += format(key, val ?? "default", { ...options, selector: false }) + " ";
    [key, val, rest] = extractKeyValueFromString(rest);
  }
  return style;
}

function objectToStyle(value, options = /** @type {StyleFormatOptions} */ ({})) {
  const { properties, queries, functions, flags, createAnimation } = options;
  let style = "";
  const keys = Object.keys(value || {});
  for (let i = 0, len = keys.length; i < len; i++) {
    let key = keys[i];
    let cur = value[key];
    const typeofValue = typeof cur;
    if (typeofValue === "string" || typeofValue === "number")
      style += format(key, cur, { properties, queries, functions, flags, selector: false, createAnimation }) + " ";
    else if (typeofValue === "boolean" && cur === true)
      style += format(key, "default", { properties, queries, functions, flags, selector: false, createAnimation }) + " ";
    else if (typeofValue === "object") {
      if (Array.isArray(cur))
        style +=
          format(key, join(cur, " "), { properties, queries, functions, flags, selector: false, createAnimation }) + " ";
      else
        style +=
          format(key, objectToStyle(cur, { properties, queries, functions, flags, createAnimation }), {
            properties,
            queries,
            functions,
            flags,
            selector: true,
            createAnimation,
          }) + " ";
    }
  }
  return style;
}

function format(key, value, options = /** @type {StyleFormatOptions} */ ({})) {
  const {
    properties = {},
    queries = {},
    functions = [],
    flags = /** @type {Object<string, boolean>} */ ({}),
    selector,
    createAnimation,
  } = options;
  key = camelToKebab(key);
  if (!selector) {
    if (properties[key]) {
      const property = properties[key](formatValue(value, false, functions));
      Object.assign(flags, property.flags);
      return property.value;
    }
    value = formatValue(value, false, functions);

    return `${key.startsWith("$") ? "--" + key.slice(1) : key}:${key === "content" && value === "" ? `""` : value};`;
  }
  if (key === "animation") return createAnimation ? createAnimation(value) : "";
  if (queries[key]) return `@media ${queries[key]} { ${value.trim()} }`;
  if (key === ":initial") return `@starting-style { ${value}}`;
  if (key === ":exit") return ((flags["exiting-style"] = true), `&[exiting-style] { ${value}}`);
  const atRule = key.match(/^:(media|supports|container|layer)\((.+)\)$/);
  if (atRule)
    return atRule[1] === "layer"
      ? `@layer ${atRule[2].trim()} { ${value}}`
      : `@${atRule[1]} (${atRule[2].trim()}) { ${value}}`;
  key = key.replace(
    /:(:)?(before|after|first-line|first-letter|selection|placeholder|marker|backdrop|file-selector-button|cue|target-text|spelling-error|grammar-error|part|slotted|highlight|view-transition)(?![a-z0-9-])/g,
    (match, double, name) => {
      if (double) return match;
      return `::${name}`;
    },
  );
  if (key.startsWith(":")) return `&${key} { ${value} } `;
  return `${key} { ${value}}`;
}

function replaceFunction(value, regex, template) {
  let result = "";
  let i = 0;
  regex.lastIndex = 0;
  let match;
  while ((match = regex.exec(value)) !== null) {
    const idx = match.index;
    if (idx > 0 && /[a-zA-Z0-9_-]/.test(value[idx - 1])) continue;
    result += value.slice(i, idx);
    const start = idx + match[0].length;
    let depth = 1;
    let end = start;
    while (end < value.length && depth > 0) {
      if (value[end] === "(") depth++;
      else if (value[end] === ")") depth--;
      end++;
    }
    if (depth !== 0) {
      result += value.slice(idx, end);
      i = end;
      continue;
    }
    const argsStr = value.slice(start, end - 1);
    const parts = splitFunctionArgs(argsStr);
    const replacement = template.replace(/\$\{(\d+)(?::([^}]*))?\}/g, (_, n, def) => parts[n - 1]?.trim() ?? def ?? "");
    result += replacement;
    i = end;
    regex.lastIndex = end;
  }
  result += value.slice(i);
  return result;
}

function splitFunctionArgs(str) {
  const parts = [];
  let depth = 0;
  let current = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") {
      depth++;
      current += str[i];
    } else if (str[i] === ")") {
      depth--;
      current += str[i];
    } else if (str[i] === "," && depth === 0) {
      parts.push(current);
      current = "";
    } else {
      current += str[i];
    }
  }
  if (current) parts.push(current);
  return parts;
}

function formatValue(value, important = false, functions = []) {
  value = value?.toString()?.trim() || "";
  if (value.endsWith("!")) ((important = true), (value = value.slice(0, -1)));
  for (let i = 0, len = functions.length; i < len; i++) {
    const { regex, template } = functions[i];
    value = replaceFunction(value, regex, template);
  }
  value = value.replaceAll(/\$[^,){}\s]+/g, (match) => `var(--${match.slice(1)})`);
  return important ? value + " !important" : value;
}

function extractKeyValueFromString(str) {
  if (!str) return [];
  let ignore = 0;
  let quote = null;
  let split = null;
  for (let i = 0, len = str.length; i < len; i++) {
    if (quote) {
      if (str[i] === quote && str[i - 1] !== "\\") quote = null;
      continue;
    }
    if (str[i] === '"' || str[i] === "'") {
      quote = str[i];
      continue;
    }
    if (str[i] === ")" && ignore > 0) ignore--;
    else if (str[i] === "(") ignore++;
    else if (ignore > 0) continue;
    else if (str[i] === ":") split = i;
    else if (str[i] === ";") {
      if (!split) return [str.slice(0, i).trim(), null, str.slice(i + 1).trim()];
      return [str.slice(0, split).trim(), str.slice(split + 1, i).trim(), str.slice(i + 1).trim()];
    }
  }
  if (!split) return [str.trim()];
  return [str.slice(0, split).trim(), str.slice(split + 1).trim()];
}

// Utility

export class Style {
  /**
   * Assigns a style to a target, which can be an object or a string of space-separated objects.
   * If the target is a function, it will be called with the value.
   * If the target is an object, the value will be assigned to its `node` property.
   * @param {object | string | string[]} target
   * @param  {...(object | string | string[])} sources
   * @returns {object}
   */
  static assign(target, ...sources) {
    return Object.assign(ensureObject(target), ...sources.map(ensureObject));
  }

  /**
   * Ensures that the target is an object. If it's a string, it will be converted to an object style.
   * @param {object | string | string[]} target
   * @returns {object}
   */
  static ensureObject(target) {
    return ensureObject(target);
  }

  /**
   * Waits for the exit animation of a node to finish before resolving.
   * @param {object | string | string[]} node
   * @returns {Promise<void>}
   */
  static waitForExit(node) {
    return new Promise((resolve) => {
      const before = node.getAnimations().length;
      node.setAttribute("exiting-style", "");
      const animations = node.getAnimations();
      if (animations.length <= before) return resolve();
      const animation = animations[animations.length - 1];
      if (!animation) return resolve();
      let iterations = 0;
      node.interval = setInterval(() => {
        if (animation.playState !== "running" || iterations > 50) {
          clearInterval(node.interval);
          resolve();
        } else iterations++;
      }, 100);
    });
  }

  static stopExit(node) {
    node.removeAttribute("exiting-style");
    clearInterval(node.interval);
  }
}

function stringStyleToObjectStyle(value) {
  const obj = {};
  let [key, val, rest] = extractKeyValueFromString(value);
  while (key) {
    if (val?.startsWith("(") && val?.endsWith(")")) obj[key] = stringStyleToObjectStyle(val.slice(1, -1));
    else if (val !== false) obj[key] = val ?? true;
    [key, val, rest] = extractKeyValueFromString(rest);
  }
  return obj;
}

function ensureObject(value) {
  const typeofValue = typeof value;
  if (typeofValue === "object") {
    if (!Array.isArray(value)) return value;
    return Object.assign({}, ...value.map(ensureObject));
  } else if (typeofValue === "string") return stringStyleToObjectStyle(value);
  return {};
}

function camelToKebab(str) {
  return str.replace(/[A-Z]+/g, (match, offset) => (offset ? "-" : "") + match.toLowerCase());
}
