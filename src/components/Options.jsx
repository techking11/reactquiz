/* eslint-disable react/prop-types */
function Option({ question, answer, dispatch }) {
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={index}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswer ? (index === question.correctOption ? "correct" : "wrong") : ""}`}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnswer}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;
