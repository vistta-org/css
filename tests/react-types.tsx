import { StyleSheetProvider } from "@vistta/css/react";
import { createRef, type CSSProperties } from "react";

const ref = createRef<HTMLButtonElement>();
const nativeStyle: CSSProperties = { color: "red", padding: "8px" };

export const example = (
  <StyleSheetProvider styles={[{ vars: { accent: "rebeccapurple" } }]}>
    <button ref={ref} style="color: $accent; :hover:(opacity: 0.8)" onClick={(event) => event.currentTarget.focus()} />
    <div style={{ ":hover": { opacity: 0.8 }, color: "$accent" }} />
    <span style={["color: red", { ":initial": { opacity: 0 } }]} />
    <div style={nativeStyle} />
    <svg>
      <circle style={{ fill: "red" }} cx={10} cy={10} r={5} />
    </svg>
  </StyleSheetProvider>
);

// @ts-expect-error Intrinsic event props must retain React's types.
export const invalidEvent = <button onClick="click" />;
// @ts-expect-error Intrinsic refs must retain their native element types.
export const invalidRef = <input ref={ref} />;
