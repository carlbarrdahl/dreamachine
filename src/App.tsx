import { memo, useEffect, useRef, useState } from "react";
import { useHarmonicIntervalFn, useSlider } from "react-use";
import * as Tone from "tone";

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

const Strobe = memo(
  ({
    hz,
    background,
    isRunning,
  }: {
    hz: number;
    background: string;
    isRunning: boolean;
  }) => {
    const [isActive, setActive] = useState(false);
    useHarmonicIntervalFn(() => {
      isRunning && setActive((a) => !a);
    }, hz);

    return (
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          height: "100vh",
          background: isActive && isRunning ? background : "transparent",
        }}
      ></div>
    );
  }
);

const defaultFreq = 3;
const maxFreq = frequencies[frequencies.length - 1].freq[1];

function rainbow(n: number) {
  n = n * 255;
  return "hsl(" + n + ",100%,50%)";
}

function App() {
  const [isRunning, setRunning] = useState(false);
  const ref = useRef(null);
  const x = useSlider(ref);
  const y = useSlider(ref, { vertical: true, reverse: false });
  function start() {
    setRunning((s) => {
      return !s;
    });
  }

  const hz = +(x.value * maxFreq).toFixed(1);
  const wave = frequencies.find((f) => hz >= f.freq[0] && hz <= f.freq[1]);
  const background = rainbow(y.value);
  return (
    <main style={{ overflow: "hidden" }}>
      <div
        ref={ref}
        style={{
          color: "#fff",
          background: "#000",
          height: "100vh",
          position: "relative",
        }}
        onClick={() => Tone.Transport.start()}
      >
        <Strobe hz={hz} background={background} isRunning={isRunning} />
        <Binaural hz={hz} isRunning={isRunning} />
        <div style={{ padding: 20, fontSize: 24, textAlign: "center" }}>
          {wave?.name} ({hz} Hz)
        </div>
        <div style={{ fontSize: 300, textAlign: "center", opacity: 0.6 }}>
          {wave?.symbol}
        </div>
        <div
          style={{
            position: "absolute",
            top: window.innerHeight * y.value - 25,
            left: window.innerWidth * x.value - 25,
            width: 50,
            height: 50,
            borderRadius: "50%",
            borderWidth: 4,
            borderStyle: "solid",
            borderColor: x.isSliding ? "#fff" : "#555",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          {hz}
        </div>
      </div>

      <button
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          height: 40,
          background: "rgba(0,0,0,.4)",
        }}
        onClick={start}
      >
        {isRunning ? "Stop" : "Start"}
      </button>
    </main>
  );
}

const Binaural = memo(
  ({ hz, isRunning }: { hz: number; isRunning: boolean }) => {
    const baseHz = 100;
    const [oscs] = useState(() => {
      const panLeft = new Tone.PanVol(-1, -36).toDestination();
      const panRight = new Tone.PanVol(1, -36).toDestination();
      return {
        left: new Tone.Oscillator(100, "sine").connect(panLeft),
        right: new Tone.Oscillator(110, "sine").connect(panRight),
      };
    });
    useEffect(() => {
      oscs.left.frequency.value = baseHz;
      oscs.right.frequency.value = baseHz + hz;
    }, [hz]);

    useEffect(() => {
      if (isRunning) {
        oscs.left.start();
        oscs.right.start();
      } else {
        oscs.left.stop();
        oscs.right.stop();
      }
    }, [isRunning]);

    return null;
  }
);

export default App;
