import { jsx as reactJsx, jsxs as reactJsxs } from "react/jsx-runtime";
import { getStyledType } from "./index.js";

export { Fragment } from "react/jsx-runtime";

/** @type {typeof reactJsx} */
export function jsx(type, props, key) {
  return reactJsx(getStyledType(type), props, key);
}

/** @type {typeof reactJsxs} */
export function jsxs(type, props, key) {
  return reactJsxs(getStyledType(type), props, key);
}
