import easy from "/easyImg.png";
import medium from "/medImg.png";
import hard from "/hardImg.png";
import "./selector.css";
import { useEffect, useState } from "react";

export default function Selector({
  foundArray,
  widthSetting,
  heightSetting,
  rightSide,
  bottom,
  smaller,
}: {
  foundArray: boolean[];
  widthSetting: number;
  heightSetting: number;
  rightSide: boolean;
  bottom: boolean;
  smaller: boolean;
}) {
  const [left, setLeft] = useState(smaller ? 46 : 96);
  const [top, setTop] = useState(-4);

  useEffect(() => {
    console.log("rightSide", rightSide, "bottom", bottom, "smaller", smaller);
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

  return (
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
            <div className={`${foundArray[0] ? "overlay" : "hoverLay"}`}></div>
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
            <div className={`${foundArray[1] ? "overlay" : "hoverLay"}`}></div>
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
            <div className={`${foundArray[2] ? "overlay" : "hoverLay"}`}></div>
          </div>
        </li>
      </ul>
    </div>
  );
}
