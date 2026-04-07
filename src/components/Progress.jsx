/* eslint-disable react/prop-types */
const Progress = ({ numOfQuestions, index, totalPoints, numofPoints }) => {
  return (
    <div>
      <input
        type="range"
        name="progress"
        id="progress"
        min={10}
        max={280}
        className="indicator"
      />
      <div className="progress">
        <span>
          Question: {index + 1}/{numOfQuestions}
        </span>
        <span>
          {numofPoints}/{totalPoints} points
        </span>
      </div>
    </div>
  );
};

export default Progress;
