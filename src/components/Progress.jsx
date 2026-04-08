/* eslint-disable react/prop-types */
function Progress(props) {
  const { numOfQuestions, maxPossiblePoints, index, points, answer } = props;
  return (
    <header className="progress">
      <progress max={numOfQuestions} value={index + Number(answer !== null)} />

      <p>
        <strong>{index + 1}</strong> / <strong>{numOfQuestions}</strong>{" "}
        Questions
      </p>

      <p>
        <strong>{points}</strong> / <strong>{maxPossiblePoints}</strong> Points
      </p>
    </header>
  );
}

export default Progress;
