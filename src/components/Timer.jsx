import React, { useState, useEffect } from "react";

const Timer = ({ startTime, endTime }) => {
  const [timer, setTimer] = useState(startTime);

  useEffect(() => {
    let id = setInterval(() => {
      if (timer < endTime) {
        setTimer(timer+1);
      } else {
        clearInterval(id);
      }
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [timer]);
  return (
    <div>
      <h1>Running Timer : {timer} </h1>
      <h2>Start Time : {startTime} </h2>
      <h2>End Time : {endTime} </h2>
      <button onClick={()=> setTimer(1)}>Restart Timer with {startTime} </button>
    </div>
  );
};

export default Timer;
