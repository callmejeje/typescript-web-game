import "./App.css";
import { useState, useEffect, useRef } from "react";

function useInterval(callback: any, delay: number) {
  const savedCallback = useRef(() => {}); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.

  useEffect(() => {
    savedCallback.current = callback; // callback이 바뀔 때마다 ref를 업데이트 해준다.
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current(); // tick이 실행되면 callback 함수를 실행시킨다.
    }
    if (delay !== null) {
      // 만약 delay가 null이 아니라면
      let id = setInterval(tick, delay); // delay에 맞추어 interval을 새로 실행시킨다.
      return () => clearInterval(id); // unmount될 때 clearInterval을 해준다.
    }
  }, [delay]); // delay가 바뀔 때마다 새로 실행된다.
}

function App() {
  const rockPaperScissors = ["가위", "바위", "보"];

  const [myhand, setMyhand] = useState("");
  const [yourhand, setYourhand] = useState("");
  const [score, setScore] = useState(0);
  const [beat, setBeat] = useState(-100);
  // const [stop, setStop] = useState(false);

  const battle = (e: any) => {
    setMyhand(e.target.value);
    if (myhand === yourhand) {
      // 비김
      setBeat(0);
    } else if (
      (myhand === "가위" && yourhand === "보") ||
      (myhand === "바위" && yourhand === "가위") ||
      (myhand === "보" && yourhand === "바위")
    ) {
      setScore(score + 1); // 이김
      setBeat(1);
    } else {
      setScore(score - 1); // 짐
      setBeat(-1);
    }
    // setStop(1);
    // setTimeout(() => {
    //   setStop(false);
    // }, 3000);
  };

  // useInterval(
  //   () => {
  //     setYourhand(rockPaperScissors[Math.floor(Math.random() * 3)]);
  //   },
  //   !stop ? 500 : 0
  // );

  useInterval(() => {
    setYourhand(rockPaperScissors[Math.floor(Math.random() * 3)]);
  }, 500);

  return (
    <div className="App">
      <h1>가위 바위 보</h1>
      <div>{yourhand}</div>
      {/* <div>{showYourhand}</div> */}

      <button value={"가위"} onClick={battle}>
        가위
      </button>
      <button value={"바위"} onClick={battle}>
        바위
      </button>
      <button value={"보"} onClick={battle}>
        보
      </button>
      <div>나의 선택 : {myhand}</div>
      <div>
        {beat === 1
          ? "이겼어요!"
          : beat === 0
          ? "비겼어요."
          : beat === -100
          ? ""
          : "졌어요..."}
      </div>
      <div>현재 점수 : {score}점</div>
    </div>
  );
}

export default App;
