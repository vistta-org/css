import type * as React from "react";
import type { ReactStyle } from "./index.js";

export { Fragment, jsx, jsxs } from "react/jsx-runtime";

export namespace JSX {
  type ElementType = React.JSX.ElementType;
  type Element = React.JSX.Element;
  type ElementClass = React.JSX.ElementClass;
  type ElementAttributesProperty = React.JSX.ElementAttributesProperty;
  type ElementChildrenAttribute = React.JSX.ElementChildrenAttribute;
  type LibraryManagedAttributes<C, P> = React.JSX.LibraryManagedAttributes<C, P>;
  type IntrinsicAttributes = React.JSX.IntrinsicAttributes;
  type IntrinsicClassAttributes<T> = React.JSX.IntrinsicClassAttributes<T>;
  type IntrinsicElements = {
    [Tag in keyof React.JSX.IntrinsicElements]: Omit<React.JSX.IntrinsicElements[Tag], "style"> & {
      style?: ReactStyle;
    };
  };
}
