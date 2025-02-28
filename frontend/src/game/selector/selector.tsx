import easy from "/easyImg.png";
import medium from "/medImg.png";
import hard from "/hardImg.png";
import "./selector.css";
import { useEffect, useState } from "react";

export default function Selector({
  foundArray = [false, false, false],
  setFoundArray,
  widthSetting,
  heightSetting,
  rightSide,
  bottom,
  smaller,
  selecter,
  setFailureOverlay,
}: {
  foundArray: boolean[];
  setFoundArray: React.Dispatch<React.SetStateAction<boolean[]>>;
  widthSetting: number;
  heightSetting: number;
  rightSide: boolean;
  bottom: boolean;
  smaller: boolean;
  selecter: { x: number; y: number; active: boolean };
  setFailureOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [left, setLeft] = useState(smaller ? 46 : 96);
  const [top, setTop] = useState(-4);

  useEffect(() => {
    if (rightSide) {
      setLeft(smaller ? 46 : 96);
    } else {
      setLeft(smaller ? -54 : -96);
    }
    if (bottom) {
      setTop(-4);
    } else {
      setTop(smaller ? -96 : -166);
    }
  }, [rightSide, bottom, smaller]);

  async function imageClickHandler(
    event: React.MouseEvent<HTMLDivElement>,
    character: number
  ) {
    console.log("submit", selecter, character, "smaller", smaller);
    const time = location.pathname.split("/")[2];
    console.log("time", time);
    const result = await fetch(`http://localhost:3000/api/game/coord/${time}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        x: selecter.x,
        y: selecter.y,
        character,
        time,
        smaller,
      }),
    });
    const data = await result.json();
    console.log("fetched Data", data);
    if (result.status === 200 && data.complete === true) {
      console.log("complete", data);
      window.location.href = `http://localhost:5173/game/result/${data.score}`;
    } else if (result.status === 200 && data.found === true) {
      console.log("found", data.foundArrayOnly);
      setFoundArray(data.foundArrayOnly);
      console.log("data", data);
    } else if (result.status === 200 && data.found === false) {
      console.log("not found", data.foundArrayOnly);
      // setFoundArray(data.foundArrayOnly);
      setFailureOverlay(true);
      console.log("data", data);
    }
  }

  return (
    <>
      <div
        className="selector absolute bg-amber-300 border-2 border-black flex flex-col p-1   justify-center items-center rounded-lg"
        style={{ left: left, top: top }}
      >
        <ul className="selectorWrapper flex flex-col gap-1  justify-around items-center h-full w-full">
          <li className={`selectorCharacter w-full h-full`}>
            <div
              className="selectorCharacterImage relative w-full h-full"
              style={{
                backgroundImage: `url(${easy})`,
                width: widthSetting,
                height: heightSetting,
              }}
            >
              <div className="xText2"> {foundArray[0] ? "X" : ""}</div>
              <div
                className={`${foundArray[0] ? "overlay" : "hoverLay"}`}
                onClick={
                  foundArray[0]
                    ? undefined
                    : (event) => imageClickHandler(event, 0)
                }
              ></div>
            </div>
          </li>
          <li className="selectorCharacter">
            <div
              className="selectorCharacterImage relative"
              style={{
                backgroundImage: `url(${medium})`,
                width: widthSetting,
                height: heightSetting,
              }}
            >
              <div className="xText2"> {foundArray[1] ? "X" : ""}</div>
              <div
                className={`${foundArray[1] ? "overlay" : "hoverLay"}`}
                onClick={
                  foundArray[1]
                    ? undefined
                    : (event) => imageClickHandler(event, 1)
                }
              ></div>
            </div>
          </li>
          <li className="selectorCharacter">
            <div
              className="selectorCharacterImage relative"
              style={{
                backgroundImage: `url(${hard})`,
                width: widthSetting,
                height: heightSetting,
              }}
            >
              <div className="xText2"> {foundArray[2] ? "X" : ""}</div>
              <div
                className={`${foundArray[2] ? "overlay" : "hoverLay"}`}
                onClick={
                  foundArray[2]
                    ? undefined
                    : (event) => imageClickHandler(event, 2)
                }
              ></div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
