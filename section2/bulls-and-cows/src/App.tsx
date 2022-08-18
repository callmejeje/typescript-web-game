import "./App.css";
import { useState } from "react";

function App() {
  const makeNums = () => {
    let nums = [Math.floor(Math.random() * 10)];
    let ranNum;
    while (nums.length < 3) {
      ranNum = Math.floor(Math.random() * 10);
      if (!nums.includes(ranNum)) {
        nums.push(ranNum);
      }
    }
    return nums;
  };

  const [answer, setAnswer] = useState(makeNums());
  const [input, setInput] = useState<string[]>([]); //input 배열
  const [history, setHistory] = useState<string[]>([]); //history 배열
  const [tries, setTries] = useState(0);

  const onChangeInput = (e: any) => {
    setInput(e.target.value.split("")); //배열로 input 설정
  };

  const isValidInput = () => {
    // 숫자가 아니면 false
    // 3자리 숫자가 아니면 false
    // 중복되는 숫자 있으면 false

    // if (isNaN(input.join(""))) {
    //   console.log("isNaN");
    //   return false;
    // }
    if (input.length !== 3) {
      console.log("length !== 3");
      return false;
    }
    let duplicate = false;
    for (let i = 0; i < input.length; i++) {
      for (let j = i + 1; j < input.length; j++) {
        if (Number(input[i]) === Number(input[j])) {
          duplicate = true;
        }
      }
    }
    if (duplicate) {
      console.log("duplicate");
      return false;
    }
    return true;
  };

  const feedback = () => {
    let strikes = 0,
      balls = 0;
    if (!isValidInput()) {
      setHistory([
        ...history,
        `${input.join("")} : 중복되지 않는 3자리 숫자를 입력해주세요.`,
      ]);
      return;
    }
    if (answer.join("") === input.join("")) {
      // setHistory([...history, "정답입니다!"]);
      alert("정답입니다!");
      setAnswer(makeNums());
      setHistory([]);
      setTries(0);
      return;
    }
    for (let i = 0; i < answer.length; i++) {
      if (Number(input[i]) === Number(answer[i])) {
        strikes++;
      }
      if (
        answer.includes(Number(input[i])) &&
        Number(input[i]) !== Number(answer[i])
      ) {
        balls++;
      }
    }
    setHistory([
      ...history,
      `${input.join("")} : ${strikes} 스트라이크 ${balls} 볼입니다.`,
    ]);
    setTries(tries + 1);
  };

  return (
    <div className="App">
      <h1>숫자 야구</h1>
      {/* <div>(for test) answer : {answer}</div> */}
      <div>숫자 3개를 맞혀보세요</div>
      <input onChange={onChangeInput}></input>
      <button onClick={feedback}>입력</button>
      <div>시도 : {tries}</div>
      <ul>
        {history.map((el) => {
          return (
            <div key={el + history.indexOf(el)}>
              <li>{el}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
