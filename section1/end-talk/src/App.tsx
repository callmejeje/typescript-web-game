import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  let bool: any;
  const [word, setWord] = useState("바다");
  const [answer, setAnswer] = useState("");
  const [correct, setCorrect] = useState(bool);

  const onChangeAnswer = (e: any) => {
    setAnswer(e.target.value);
  };

  const onClickCorrect = (e: any) => {
    if (answer[0] === word[word.length - 1]) {
      setCorrect(true);
      setWord(answer);
    } else {
      setCorrect(false);
    }
  };
  return (
    <div className="App">
      <div>{word}</div>
      <input onChange={onChangeAnswer}></input>
      <button onClick={onClickCorrect}>입력</button>
      <div>{correct ? "성공" : correct === undefined ? "" : "실패"}</div>
    </div>
  );
}

export default App;
