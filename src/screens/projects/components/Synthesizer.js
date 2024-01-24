import { React, useEffect, useState, useCallback, useMemo } from "react";
import "./Synthesizer.css";

const Synthesizer = () => {
  // Screen size monitoring because we can't render for screens too small
  const [isMobileWidth, setIsMobileWidth] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      const screenWidthInPixels = window.innerWidth;
      console.log(screenWidthInPixels);

      if (screenWidthInPixels <= 1320) {
        setIsMobileWidth(true);
      } else {
        setIsMobileWidth(false);
      }
    };
    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const [audioContext, setAudioContext] = useState(null);
  const [oscillators, setOscillators] = useState({});
  const [octave, setOctave] = useState(4);
  const [volume, setVolume] = useState(0);
  const [attack, setAttack] = useState(0.3);
  const [decay, setDecay] = useState(0.7);
  const [detune, setDetune] = useState(0.0);
  const [isFocused, setIsFocused] = useState(false);
  const [pianoKeyElements, setPianoKeyElements] = useState([]);
  const [waveIdx, setWaveIdx] = useState(0);

  const waveTypes = useMemo(() => {
    return ["triangle", "sine", "square", "sawtooth"];
  }, []);

  const keyboardKeyFrequencyMap = useMemo(() => {
    return {
      A1: 32.7,
      W1: 34.65,
      S1: 36.71,
      E1: 38.89,
      D1: 41.2,
      F1: 43.65,
      T1: 46.25,
      G1: 49.0,
      Y1: 51.91,
      H1: 55.0,
      U1: 58.27,
      J1: 61.74,
      K1: 65.41,
      A2: 65.41,
      O1: 69.3,
      W2: 69.3,
      L1: 73.42,
      S2: 73.42,
      P1: 77.78,
      E2: 77.78,
      ";1": 82.41,
      D2: 82.41,
      F2: 87.31,
      "'1": 87.31,
      T2: 92.5,
      G2: 98.0,
      Y2: 103.83,
      H2: 110.0,
      U2: 116.54,
      J2: 123.47,
      K2: 130.81,
      A3: 130.81,
      O2: 138.59,
      W3: 138.59,
      L2: 146.83,
      S3: 146.83,
      P2: 155.56,
      E3: 155.56,
      ";2": 164.81,
      D3: 164.81,
      F3: 174.61,
      "'2": 174.61,
      T3: 185.0,
      G3: 196.0,
      Y3: 207.65,
      H3: 220.0,
      U3: 233.08,
      J3: 246.94,
      K3: 261.63,
      A4: 261.63,
      O3: 277.18,
      W4: 277.18,
      L3: 293.66,
      S4: 293.66,
      P3: 311.13,
      E4: 311.13,
      ";3": 329.63,
      D4: 329.63,
      F4: 349.23,
      "'3": 349.23,
      T4: 369.99,
      G4: 392.0,
      Y4: 415.3,
      H4: 440.0,
      U4: 466.16,
      J4: 493.88,
      K4: 523.25,
      A5: 523.25,
      O4: 554.37,
      W5: 554.37,
      L4: 587.33,
      S5: 587.33,
      P4: 622.25,
      E5: 622.25,
      ";4": 659.25,
      D5: 659.25,
      F5: 698.46,
      "'4": 698.46,
      T5: 739.99,
      G5: 783.99,
      Y5: 830.61,
      H5: 880.0,
      U5: 932.33,
      J5: 987.77,
      K5: 1046.5,
      A6: 1046.5,
      O5: 1108.73,
      W6: 1108.73,
      L5: 1174.66,
      S6: 1174.66,
      P5: 1244.51,
      E6: 1244.51,
      ";5": 1318.51,
      D6: 1318.51,
      F6: 1396.91,
      "'5": 1396.91,
      T6: 1479.98,
      G6: 1567.98,
      Y6: 1661.22,
      H6: 1760.0,
      U6: 1864.66,
      J6: 1975.53,
      K6: 2093.0,
      O6: 2217.46,
      L6: 2349.32,
      P6: 2489.02,
      ";6": 2637.02,
      "'6": 2793.83,
    };
  }, []);

  const keyboardKeyToNote = useMemo(() => {
    return {
      A: "C0",
      W: "C#0",
      S: "D0",
      E: "D#0",
      D: "E0",
      F: "F0",
      T: "F#0",
      G: "G0",
      Y: "G#0",
      H: "A0",
      U: "A#0",
      J: "B0",
      K: "C1",
      O: "C#1",
      L: "D1",
      P: "D#1",
      ";": "E1",
      "'": "F1",
    };
  }, []);

  const playNote = useCallback(
    (key) => {
      if (!audioContext) return;

      const keyboardKeyArray = Object.keys(keyboardKeyToNote);
      const keyIdx = keyboardKeyArray.indexOf(key);
      const frequency = keyboardKeyFrequencyMap[key + "" + octave];
      if (!frequency) return;

      // Detune
      var nextFrequency = frequency;
      var nextIdx = keyIdx;
      var nextOctave = octave;

      if (detune > 0) {
        nextIdx = keyIdx + 2; //Whole step
        if (nextIdx >= keyboardKeyArray.length) {
          let over = nextIdx - (keyboardKeyArray.length - 1);
          nextIdx = 6 + over; //F# + half steps or idxs
          nextOctave += 1;
        }
      } else if (detune < 0) {
        nextIdx = keyIdx - 2; //Whole step
        if (nextIdx < 0) {
          let under = Math.abs(nextIdx);
          nextIdx = 12 - under;
          nextOctave -= 1;
        }
      }

      nextFrequency =
        keyboardKeyFrequencyMap[keyboardKeyArray[nextIdx] + "" + nextOctave] ||
        frequency;

      const playFrequency = parseFloat(
        (frequency + (nextFrequency - frequency) * Math.abs(detune)).toFixed(2)
      );

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = waveTypes[waveIdx];
      oscillator.frequency.setValueAtTime(
        playFrequency,
        audioContext.currentTime
      );

      // Attack
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        volume,
        audioContext.currentTime + attack
      );

      // Decay
      const releaseEndTime = audioContext.currentTime + attack + decay;
      gainNode.gain.linearRampToValueAtTime(0, releaseEndTime);

      gainNode.connect(audioContext.destination);
      oscillator.connect(gainNode);

      if (detune !== 0) {
        const oscillator2 = audioContext.createOscillator();
        oscillator2.type = waveTypes[waveIdx];
        oscillator2.frequency.setValueAtTime(
          frequency,
          audioContext.currentTime
        );
        oscillator2.connect(gainNode);
        oscillator2.start();
      }

      oscillator.start();

      setOscillators((prevOscillators) => ({
        ...prevOscillators,
        [key]: oscillator,
      }));
    },
    [
      attack,
      audioContext,
      detune,
      keyboardKeyFrequencyMap,
      keyboardKeyToNote,
      octave,
      decay,
      volume,
      waveTypes,
      waveIdx,
    ]
  );

  const handleKeyDown = useCallback(
    (event) => {
      const key = event.key.toUpperCase();
      const frequency = keyboardKeyToNote[key];
      if (frequency) {
        let note = keyboardKeyToNote[key].match(/[A-Z]#?/g)[0];
        let octaveAddition = parseInt(keyboardKeyToNote[key].match(/\d/g)[0]);

        var pianoKeyElement = document.getElementById(
          note + "" + (octave + octaveAddition)
        );

        if (pianoKeyElement) {
          pianoKeyElement.classList.add(["key-pressed"]);
        }

        if (!oscillators[key]) {
          playNote(key);
        }
      }

      if (key === "Z") setOctave(octave > 1 ? octave - 1 : 1);
      if (key === "X") setOctave(octave < 6 ? octave + 1 : 6);
    },
    [keyboardKeyToNote, octave, oscillators, playNote]
  );

  const handleKeyUp = useCallback(
    (event) => {
      const key = event.key.toUpperCase();
      const frequency = oscillators[key];

      if (frequency) {
        const updatedOscillators = { ...oscillators };
        delete updatedOscillators[key];
        setOscillators(updatedOscillators);

        let note = keyboardKeyToNote[key].match(/[A-Z]#?/g)[0];
        let octaveAddition = parseInt(keyboardKeyToNote[key].match(/\d/g)[0]);

        var pianoKeyElement = document.getElementById(
          note + "" + (octave + octaveAddition)
        );

        if (pianoKeyElement) {
          pianoKeyElement.classList.remove(["key-pressed"]);
        }
      }
    },
    [keyboardKeyToNote, octave, oscillators]
  );

  const handleFocus = useCallback(() => {
    let focusedElement = document.activeElement;
    let synthElement = document.getElementById("synth");

    if (focusedElement && synthElement) {
      if (
        focusedElement === synthElement ||
        synthElement.contains(focusedElement)
      ) {
        setIsFocused(true);
      } else {
        setIsFocused(false);
      }
    } else {
      setIsFocused(false);
    }
  }, []);

  useEffect(() => {
    let synthElement = document.getElementById("synth");

    if (synthElement) {
      synthElement.addEventListener("keydown", handleKeyDown);
      synthElement.addEventListener("keyup", handleKeyUp);
      synthElement.addEventListener("focus", handleFocus);
      synthElement.addEventListener("blur", handleFocus);

      return () => {
        synthElement.removeEventListener("keydown", handleKeyDown);
        synthElement.removeEventListener("keyup", handleKeyUp);
        synthElement.removeEventListener("focus", handleFocus);
        synthElement.removeEventListener("blur", handleFocus);
      };
    }
  }, [oscillators, handleKeyUp, handleKeyDown, handleFocus]);

  const generateKeys = useCallback(() => {
    const renderedMusicKeys = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B",
    ];
    const renderedLowerKeyboardKeys = [
      "A",
      "W",
      "S",
      "E",
      "D",
      "F",
      "T",
      "G",
      "Y",
      "H",
      "U",
      "J",
    ];

    const renederedUpperMusicKeys = ["C", "C#", "D", "D#", "E", "F"];
    const renderedUpperKeyboardKeys = ["K", "O", "L", "P", ";", "'"];
    setPianoKeyElements([]);
    let pianoKeys = [];

    renderedMusicKeys.forEach((note, index) => {
      const key = `${note}${octave}`;
      pianoKeys.push(
        <div
          key={key}
          className={`key ${note.includes("#") ? "black-key" : "white-key"}`}
          id={key}
        >
          {key}
          <br />({renderedLowerKeyboardKeys[index]})
        </div>
      );
    });

    renederedUpperMusicKeys.forEach((note, index) => {
      const key = `${note}${octave + 1}`;
      pianoKeys.push(
        <div
          key={key}
          className={`key ${note.includes("#") ? "black-key" : "white-key"}`}
          id={key}
        >
          {key}
          <br />({renderedUpperKeyboardKeys[index]})
        </div>
      );
    });

    setPianoKeyElements(pianoKeys);
  }, [octave]);

  useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);
    generateKeys();

    return () => {
      context.close();
    };
  }, [generateKeys]);

  useEffect(() => {
    generateKeys();
  }, [octave, oscillators, generateKeys]);

  const handleVolumeChange = (e) => {
    document.getElementById("synth").focus();
    setVolume(parseFloat(e.target.value));
  };

  const handleDetuneChange = (e) => {
    document.getElementById("synth").focus();
    setDetune(parseFloat(e.target.value));
  };

  const handleWaveChange = (e) => {
    document.getElementById("synth").focus();
    setWaveIdx(parseInt(e.target.value));
  };

  const handleAttackChange = (e) => {
    document.getElementById("synth").focus();
    setAttack(parseFloat(e.target.value));
  };

  const handleDecayChange = (e) => {
    document.getElementById("synth").focus();
    setDecay(parseFloat(e.target.value));
  };

  return (
    <div className="project-slide synthCont" id="synth" tabIndex="0">
      <p
        style={{
          opacity: isFocused ? 0 : 1,
          color: isFocused ? "green" : "red",
          display: isMobileWidth ? "none" : "block",
        }}
        className="clickToPlay"
      >
        Power: {isFocused ? "ON" : "OFF [CLICK TO PLAY]"}
      </p>
      <div
        className="synthControlsHolder"
        style={{ display: isMobileWidth ? "none" : "grid" }}
      >
        <div className="synthTitleHolder">Jynthesizer</div>
        <div className="controls">
          <div className="c1">
            <div className="volume">
              <p>Volume: {Math.floor((volume / 0.4) * 100)}%</p>
              <input
                type="range"
                min="0.01"
                max="0.4"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                onFocus={handleVolumeChange}
                tabIndex="1"
              />
            </div>
            <div className="volume">
              <p>
                Detune {detune >= 0 ? "+" : "-"}
                {Math.floor((Math.abs(detune) / 0.25) * 100)}%
              </p>
              <input
                type="range"
                min="-0.25"
                max="0.25"
                step="0.01"
                value={detune}
                onChange={handleDetuneChange}
                onFocus={handleDetuneChange}
                tabIndex="1"
              />
            </div>
            <div className="volume">
              <p>Wave: {waveTypes[waveIdx].toUpperCase()}</p>
              <input
                type="range"
                min="0"
                max="3"
                step="1"
                value={waveIdx}
                onChange={handleWaveChange}
                onFocus={handleWaveChange}
                tabIndex="1"
              />
            </div>
          </div>
          <div className="c2">
            <div className="volume">
              <p>Attack: {Math.floor(attack * 100)}%</p>
              <input
                type="range"
                min="0.01"
                max="1"
                step="0.01"
                value={attack}
                onChange={handleAttackChange}
                onFocus={handleAttackChange}
                tabIndex="1"
              />
            </div>
            <div className="volume">
              <p>Decay: {Math.floor(decay * 100)}%</p>
              <input
                type="range"
                min="0.01"
                max="1"
                step="0.01"
                value={decay}
                onChange={handleDecayChange}
                onFocus={handleDecayChange}
                tabIndex="1"
              />
            </div>
          </div>
          <div className="c3"></div>
        </div>
        <div className="piano-roll">{pianoKeyElements}</div>
      </div>
      <h2 style={{ display: isMobileWidth ? "block" : "none" }}>
        Jynthesizer Cannot be used at your screen width.
      </h2>
    </div>
  );
};

export default Synthesizer;
