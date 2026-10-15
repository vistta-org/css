export type StyleValue = string | number | boolean | null | undefined | StyleValue[] | StyleDefinition;

export interface StyleDefinition {
  [key: string]: StyleValue;
}

export type StyleInput = string | StyleDefinition | StyleInput[];

export type StyleFlags = Record<string, boolean>;
export type ResolvedStyle = [id: string, flags: StyleFlags] | "";

export class VirtualStyleSheet {
  constructor();
  readonly rules: CSSRuleList;
  readonly content: CSSStyleSheet;
  add(style: StyleDefinition): void;
  resolve(value: StyleValue): ResolvedStyle;
  createAnimation(value: string): string;
}

export class Style {
  static assign(target: StyleInput, ...sources: StyleInput[]): StyleDefinition;
  static ensureObject(target: StyleValue): StyleDefinition;
  static waitForExit(node: Element): Promise<void>;
  static stopExit(node: Element): void;
}
