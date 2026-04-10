import { useEffect } from "react";

/* eslint-disable react/prop-types */
function Timer({ secondRemaining, dispatch }) {
  const mins = Math.floor(secondRemaining / 60);
  const seconds = secondRemaining % 60;
  useEffect(
    function () {
      const countDown = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(countDown);
    },
    [dispatch],
  );

  return (
    <p className="timer">
      {mins >= 10 ? mins : "0" + mins}:{seconds >= 10 ? seconds : "0" + seconds}
    </p>
  );
}

export default Timer;
