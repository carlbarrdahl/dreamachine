import { CSSProperties, memo, useMemo, useState } from "react";
import { useHarmonicIntervalFn } from "react-use";

type Props = { hz: number; background: string; isRunning: boolean };

const Strobe = memo(({ hz, background, isRunning }: Props) => {
  const [pulse, setPulse] = useState(false);

  useHarmonicIntervalFn(() => {
    isRunning && setPulse((a) => !a);
  }, 1000 / hz);

  const style: CSSProperties = useMemo(
    () => ({
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      height: "100vh",
      background: pulse && isRunning ? background : "transparent",
    }),
    [pulse, isRunning, background]
  );

  return <div style={style}></div>;
});
export default Strobe;
