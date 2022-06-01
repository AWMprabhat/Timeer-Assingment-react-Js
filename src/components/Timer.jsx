import React, { useState, useEffect, useRef } from "react";

function seconds2time(seconds) {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds - hours * 3600) / 60);
  var seconds = seconds - hours * 3600 - minutes * 60;
  var time = "";

  if (hours != 0) {
    time = hours + ":";
  }
  if (minutes != 0 || time !== "") {
    minutes = minutes < 10 && time !== "" ? "0" + minutes : String(minutes);
    time += minutes + ":";
  }
  if (time === "") {
    time = seconds + "s";
  } else {
    time += seconds < 10 ? "0" + seconds : String(seconds) + "s";
  }
  return time;
}
let count = 0;
let value = 0;

const Timer = () => {
  const [timer, setTimer] = useState(value);
  const timerId = useRef(null);

  const handleValue = (e) => {
    setTimer(e.target.value);
    value = e.target.value;
  };

  const play = () => {
    if (!timerId.current) {
      const id = setInterval(() => {
        if (timer <= count) {
          // console.log(timer);
          clearInterval(timerId.current);
        } else {
          count++;
          setTimer((timer) => timer - 1);
        }
      }, 1000);
      timerId.current = id;
      count = 0;
    }

    return () => {
      clearInterval(timerId.current);
    };
  };
  const pause = () => {
    clearInterval(timerId.current);
    timerId.current = null;
  };
  const reset = () => {
    clearInterval(timerId.current);
    setTimer(value);
    timerId.current = null;
  };

  return (
    <div>
      <input
        onChange={handleValue}
        placeholder="Enter Seconds Here"
        className="secondInput"
      />
      <h1>{seconds2time(timer)}</h1>
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
  );
};

export default Timer;
