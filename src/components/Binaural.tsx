import { memo, useEffect, useState } from "react";
import * as Tone from "tone";

const Binaural = memo(
  ({
    baseHz,
    hz,
    vol = -24,
    isRunning,
  }: {
    baseHz: number;
    hz: number;
    vol: number;
    isRunning: boolean;
  }) => {
    const [oscs] = useState(() => {
      const panLeft = new Tone.PanVol(-1, vol).toDestination();
      const panRight = new Tone.PanVol(1, vol).toDestination();
      return {
        left: new Tone.Oscillator(baseHz, "sine").connect(panLeft),
        right: new Tone.Oscillator(baseHz + hz, "sine").connect(panRight),
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

export default Binaural;
