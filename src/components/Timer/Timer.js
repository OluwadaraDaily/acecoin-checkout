import "./Timer.scss"

import React, { useEffect, useState } from 'react'

function Timer({ reset }) {
  const [secondsTimer, setSecondsTimer] = useState("00")
  const [minutesTimer, setMinutesTimer] = useState("00")

  // const startTimer = () => {
  // }

  useEffect(() => {
    let seconds = 0
    let minutes = 0

    const interval = setInterval(function () {
      seconds++;
  
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }

      const minutesCount = (minutes < 10 ? "0" + minutes : minutes);
      const secondsCount = (seconds < 10 ? "0" + seconds : seconds);

      setMinutesTimer(minutesCount)
      setSecondsTimer(secondsCount)
    }, 1000);

    // Clean-up function
    return () => {
      clearInterval(interval);
    };
  }, [reset])
  return (
    <div className="timer-div">
      <div className="minutes-blocks">
        {minutesTimer.toString().split('').map((item, index) => (
          <div className="time-block" key={index}>{ item }</div>
        ))}
      </div>
      <div className="time-separator">:</div>
      <div className="seconds-blocks">
        {secondsTimer.toString().split('').map((item, index) => (
          <div className="time-block" key={index}>{ item }</div>
        ))}
      </div>
    </div>
  )
}

export default Timer