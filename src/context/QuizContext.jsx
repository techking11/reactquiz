/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  index: 0,
  status: "loading", // loading, error, ready, active, finished
  answer: null,
  points: 0,
  highscore: 0,
  secondRemaining: null,
};

const PER_QUESTION_SECONDS = 30;

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * PER_QUESTION_SECONDS,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "Restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining--,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown action type");
  }
};

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    index,
    status,
    answer,
    points,
    highscore,
    secondRemaining,
  } = state;

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch(() => {
        dispatch({ type: "dataFailed" });
      });
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        index,
        status,
        answer,
        points,
        highscore,
        secondRemaining,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("QuizContext use within of the QuizProvider");
  }
  return context;
}

export { QuizProvider, useQuiz };
