import { CSSProperties, memo, PropsWithChildren } from "react";

type Props = {
  isActive: boolean;
  x: number;
  y: number;
} & PropsWithChildren;

const SIZE = 50;
const style: CSSProperties = {
  position: "absolute",
  width: SIZE,
  height: SIZE,
  borderRadius: "50%",
  borderWidth: 4,
  borderStyle: "solid",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
};
const Marker = memo(({ children, isActive, x = 0, y = 0 }: Props) => (
  <div
    style={{
      ...style,
      top: window.innerHeight * y - SIZE / 2,
      left: window.innerWidth * x - SIZE / 2,
      borderColor: isActive ? "#fff" : "#555",
    }}
  >
    {children}
  </div>
));

export default Marker;
