/* eslint-disable react/prop-types */
import Option from "./Option";
import Progress from "./Progress";
import { useEffect, useState } from "react";

const Question = ({
  question,
  dispatch,
  numOfQuestions,
  index,
  totalPoints,
  numofPoints,
}) => {
  function handleNextQuestion() {
    index < numOfQuestions - 1 && dispatch({ type: "nextQuestion" });
  }
  const [showTimer, setShowTimer] = useState("15:00");
  const [selected, setSelected] = useState(null);

  function timer() {
    let time = 15 * 60;

    const countDown = setInterval(() => {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      setShowTimer(minutes + ":" + seconds);

      if (time <= 0) clearInterval(countDown);
      else time--;
    }, 1000);
  }

  useEffect(() => {
    timer();
  }, []);

  return (
    <>
      <Progress
        numOfQuestions={numOfQuestions}
        index={index}
        totalPoints={totalPoints}
        numofPoints={numofPoints}
      />
      <h4>{question.question}</h4>
      {question.options.map((option, index) => (
        <Option
          key={index}
          option={option}
          answer={question.options[question.correctOption]}
          points={question.points}
          dispatch={dispatch}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
      <button
        className="btn btn-ui"
        onClick={handleNextQuestion}
        disabled={index === numOfQuestions - 1}
      >
        Next
      </button>
      <span className="timer">{showTimer ?? "15:00"}</span>
    </>
  );
};

export default Question;

// const [selected, setSelected] = useState(null);

// const Option = ({ option, answer, selected, setSelected, dispatch }) => {
//   const isSelected = selected !== null; // false

//   const handleClick = () => {
//     setSelected(option); // React // selected
//   };

//   let classes = "";
//   if (isSelected) {
//     classes = option === answer ? "correct" : "wrong";
//   }

//   return (
//     <div className="options">
//       <button
//         className={`btn btn-option ${isSelected ? "answer" : ""} ${classes}`}
//         onClick={handleClick}
//         disabled={isSelected}
//       >
//         {option}
//       </button>
//     </div>
//   );
// };
