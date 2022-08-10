import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  let bool: any = undefined;
  const [answer, setAnswer] = useState(undefined);
  const [correct, setCorrect] = useState(bool);

  const [nums, setNums] = useState([
    Math.ceil(Math.random() * 9),
    Math.ceil(Math.random() * 9),
  ]);

  const onChangeAnswer = (e: any) => {
    setAnswer(e.target.value);
  };

  const onClickCorrect = () => {
    if (Number(nums[0]) * Number(nums[1]) === Number(answer)) {
      setCorrect(true);
      setNums([Math.ceil(Math.random() * 9), Math.ceil(Math.random() * 9)]);
    } else {
      setCorrect(false);
    }
  };

  return (
    <div className="App">
      <div>{`${nums[0]} 곱하기 ${nums[1]}는?`}</div>
      <input type="number" onChange={onChangeAnswer}></input>
      <button
        onClick={() => {
          onClickCorrect();
        }}
      >
        입력
      </button>
      <div>{correct ? "성공!" : correct !== undefined ? "실패..." : ""}</div>
    </div>
  );
}

export default App;
