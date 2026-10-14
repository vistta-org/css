import type { CSSProperties, ElementType, ReactElement, ReactNode } from "react";
import type { StyleDefinition, StyleValue } from "../index.js";

export type ReactStyle = CSSProperties | StyleValue;

export interface StyleSheetProviderProps {
  styles?: readonly StyleDefinition[];
  children?: ReactNode;
}

export function StyleSheetProvider(props: StyleSheetProviderProps): ReactElement;

/** @internal */
export function getStyledType(type: ElementType): ElementType;
