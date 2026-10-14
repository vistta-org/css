import { jsxDEV as reactJsxDEV } from "react/jsx-dev-runtime";
import { getStyledType } from "./index.js";

export { Fragment } from "react/jsx-dev-runtime";

/** @type {typeof reactJsxDEV} */
export function jsxDEV(type, props, key, isStaticChildren, source, self) {
  return reactJsxDEV(getStyledType(type), props, key, isStaticChildren, source, self);
}
