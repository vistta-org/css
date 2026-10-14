import {
  createContext,
  createElement,
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useInsertionEffect,
  useMemo,
  useRef,
} from "react";
import { STYLE_REF_ATTRIBUTE, VirtualStyleSheet } from "../index.js";

const SheetContext = createContext(/** @type {VirtualStyleSheet | null} */ (null));
/** @type {readonly import("../index.js").StyleDefinition[]} */
const emptyStyles = [];
const elements = new Map();

/**
 * @param {import("./index.js").StyleSheetProviderProps} props
 */
export function StyleSheetProvider({ styles = emptyStyles, children }) {
  const sheet = useMemo(() => {
    if (typeof CSSStyleSheet === "undefined") {
      throw new Error("@vistta/css-loader/react requires a client browser with constructable stylesheets.");
    }
    const value = new VirtualStyleSheet();
    for (const style of styles) value.add(style);
    return value;
  }, [styles]);

  useInsertionEffect(() => {
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet.content];
    return () => {
      document.adoptedStyleSheets = document.adoptedStyleSheets.filter((content) => content !== sheet.content);
    };
  }, [sheet]);

  return createElement(SheetContext.Provider, { value: sheet }, children);
}

/**
 * @param {import("react").ElementType} type
 * @returns {import("react").ElementType}
 */
export function getStyledType(type) {
  if (typeof type !== "string") return type;
  if (elements.has(type)) return elements.get(type);

  const StyledElement = forwardRef(
    /**
     * @param {Omit<import("react").HTMLAttributes<Element>, "style"> & {style?: import("./index.js").ReactStyle}} props
     * @param {import("react").ForwardedRef<Element>} ref
     */
    function StyledElement({ style, ...props }, ref) {
      const sheet = useContext(SheetContext);
      /** @type {import("react").MutableRefObject<Element | null>} */
      const node = useRef(null);
      /** @type {import("react").MutableRefObject<import("../index.js").ResolvedStyle>} */
      const resolved = useRef("");
      if (style != null && style !== false && !sheet) {
        throw new Error("Wrap styled React elements in @vistta/css-loader/react's StyleSheetProvider.");
      }

      useInsertionEffect(() => {
        const value = style && typeof style === "object" && !Array.isArray(style) ? { ...style } : style;
        resolved.current = sheet ? sheet.resolve(value) : "";
        if (node.current) applyStyle(node.current, resolved.current);
      });

      const attach = useCallback(
        /** @param {Element | null} element */ (element) => {
          node.current = element;
          if (element) applyStyle(element, resolved.current);
        },
        [],
      );

      useImperativeHandle(ref, () => {
        if (!node.current) throw new Error("The styled React element's DOM ref is not attached.");
        return node.current;
      }, []);

      return createElement(type, { ...props, ref: attach });
    },
  );
  StyledElement.displayName = `Styled(${type})`;
  elements.set(type, StyledElement);
  return StyledElement;
}

/**
 * @param {Element} node
 * @param {import("../index.js").ResolvedStyle} resolved
 */
function applyStyle(node, resolved) {
  if (resolved === "") node.removeAttribute(STYLE_REF_ATTRIBUTE);
  else node.setAttribute(STYLE_REF_ATTRIBUTE, String(resolved[0]));
}
