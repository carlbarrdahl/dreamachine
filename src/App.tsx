import { PropsWithChildren, useRef, useState } from "react";
import { useSlider } from "react-use";
import * as Tone from "tone";
import Binaural from "./components/Binaural";
import FrequencyDetails from "./components/FrequencyDetails";
import Marker from "./components/Marker";
import Strobe from "./components/Strobe";

const frequencies = [
  {
    name: "Delta",
    symbol: "δ",
    freq: [0, 4],
  },
  {
    name: "Theta",
    symbol: "θ",
    freq: [4, 8],
  },
  {
    name: "Alpha",
    symbol: "α",
    freq: [8, 12],
  },
  {
    name: "Beta",
    symbol: "β",
    freq: [12, 30],
  },
];

const maxFreq = frequencies[frequencies.length - 1].freq[1];

function rainbow(n: number) {
  return `hsl(${n * 255},100%,90%)`;
}

function App() {
  const [isRunning, setRunning] = useState(false);
  const ref = useRef(null);
  const x = useSlider(ref);
  const y = useSlider(ref, { vertical: true, reverse: false });
  function start() {
    setRunning((s) => !s);
  }

  const hz = +(x.value * maxFreq).toFixed(1);
  const frequency = frequencies.find((f) => hz >= f.freq[0] && hz <= f.freq[1]);
  const background = rainbow(y.value);

  return (
    <main style={{ overflow: "hidden" }}>
      <div
        ref={ref}
        style={{
          color: "#fff",
          background: "#000",
          height: window.innerHeight,
          position: "relative",
        }}
        onClick={() => Tone.Transport.start()}
      >
        <Strobe hz={hz} background={background} isRunning={isRunning} />
        <Binaural hz={hz} isRunning={isRunning} />
        <FrequencyDetails frequency={frequency} hz={hz} />
        <Marker x={x.value} y={y.value} isActive={x.isSliding}>
          {hz}
        </Marker>
      </div>

      <StartButton onClick={start}>{isRunning ? "Stop" : "Start"}</StartButton>
    </main>
  );
}

const StartButton = (props: PropsWithChildren & { onClick: () => void }) => (
  <button
    style={{
      width: "100%",
      position: "absolute",
      bottom: 0,
      height: 40,
      background: "rgba(0,0,0,.4)",
    }}
    {...props}
  />
);

export default App;
