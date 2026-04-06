const Progress = () => {
  return (
    <div>
      <input type="range" name="progress" id="progress" />
      <div className="progress">
        <span>Question: 1/15</span>
        <span>10/280 points</span>
      </div>
    </div>
  );
};

export default Progress;
