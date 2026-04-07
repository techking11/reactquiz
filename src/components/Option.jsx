import { useState } from "react";

/* eslint-disable react/prop-types */
const Option = (props) => {
  const { option, answer, points, dispatch, selected, setSelected } = props;
  const isSelected = selected !== null;
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setSelected(option);
    setCount(1);
    dispatch({ type: "totalScore", payload: points });
  };

  let classes = "";

  if (isSelected) {
    classes = option === answer ? "correct" : "wrong";
  }
  console.log(isSelected);
  return (
    <div className="options">
      <button
        className={`btn btn-option ${count ? "answer" : ""} ${classes}`}
        onClick={handleClick}
        disabled={isSelected}
      >
        {option}
      </button>
    </div>
  );
};

export default Option;
