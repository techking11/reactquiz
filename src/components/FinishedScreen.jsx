/* eslint-disable react/prop-types */
function FinishedScreen({ maxPossiblePoints, points, highscore }) {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  else if (percentage >= 80 && percentage < 100) emoji = "🎉";
  else if (percentage >= 50 && percentage < 80) emoji = "😎";
  else if (percentage > 0 && percentage < 50) emoji = "😊";
  else emoji = "🤯";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> Your score is <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} points ({Math.ceil(percentage)}%)
      </p>

      <p className="highscore">(Highscore: {highscore} points)</p>
    </>
  );
}

export default FinishedScreen;
