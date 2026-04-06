import { useEffect, useReducer } from "react";
import Error from "./components/Error";
import Header from "./components/Header";
import Main from "./components/Home";
import Question from "./components/Question";
import StartScreen from "./components/StartScreen";
import Loader from "./components/Loader";

const initialState = {
  questions: [],
  index: 0,
  status: "loading", // loading, error, ready, active, finished
};

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
      };
    default:
      throw new Error("Unknown action type");
  }
};

export default function App() {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const numOfQuestions = questions.length;

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
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && <Question question={questions[index]} />}
      </Main>
    </div>
  );
}
