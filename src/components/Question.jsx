/* eslint-disable react/prop-types */
import Option from "./Option";
import Progress from "./Progress";

const Question = ({ question }) => {
  return (
    <>
      <Progress />
      <h4>{question.question}</h4>
      {question.options.map((option, index) => (
        <Option key={index} option={option} />
      ))}
      <button className="btn btn-ui">Next</button>
      <span className="timer">00:15</span>
    </>
  );
};

export default Question;
