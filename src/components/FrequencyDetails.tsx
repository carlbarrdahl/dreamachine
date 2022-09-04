import { memo } from "react";

type Props = { hz: number; frequency?: { name: string; symbol: string } };

const FrequencyDetails = memo(({ hz, frequency }: Props) => (
  <>
    {" "}
    <div
      style={{
        padding: 20,
        fontSize: 24,
        textAlign: "center",
        opacity: 0.5,
      }}
    >
      <h3>{frequency?.name} Waves</h3>
      {hz.toFixed(2)} Hz
    </div>
    <div style={{ fontSize: 300, textAlign: "center", opacity: 0.1 }}>
      {frequency?.symbol}
    </div>
  </>
));

export default FrequencyDetails;
