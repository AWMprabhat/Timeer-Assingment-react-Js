import React, { useRef } from "react";
import { useState } from "react";

function msToTime(duration) {
  var milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
}
//   console.log(msToTime(300000))

const Stopwatch = () => {
  const [watch, setWatch] = useState(0);
  // const [timerId, setTimerId] = useState(null);
  const timerId = useRef(null);

  const play = () => {
    if (!timerId.current) {
      let id = setInterval(() => {
        setWatch((prev) => prev + 100);
      }, 100);
      timerId.current = id;
    }
    return () => {
      clearInterval(timerId.current);
    };
    // setTimerId(true)
  };
  const pause = () => {
    clearInterval(timerId.current);
    timerId.current = null;
  };
  const reset = () => {
    clearInterval(timerId.current);
    setWatch(0);
    timerId.current = null;
  };

  return (
    <div>
      <h1>{msToTime(watch)}</h1>
      <div>
        <div className="btnDiv">
          <button onClick={play} className="play">
            Play
          </button>
          <button onClick={pause} className="pause">
            Pause
          </button>
          <button onClick={reset} className="reset">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

// export default Stopwatch;
