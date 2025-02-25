import easy from "/easyImg.png";
import medium from "/medImg.png";
import hard from "/hardImg.png";
import "./selector.css";

export default function Selector({
  smaller,
  foundArray,
}: {
  smaller: boolean;
  foundArray: boolean[];
}) {
  const widthSetting = smaller ? 40 : 80;
  const heightSetting = smaller ? 40 : 80;

  return (
    <div
      className="selector bg-slate-800 flex flex-col p-2 justify-center items-center rounded-lg"
      // style={{ width: containerWidth, height: containerHeight }}
    >
      <ul className="selectorWrapper flex flex-col gap-2 justify-around items-center h-full w-full">
        <li className="selectorCharacter">
          <div
            className="selectorCharacterImage "
            style={{
              backgroundImage: `url(${easy})`,
              width: widthSetting,
              height: heightSetting,
            }}
          >
            {" "}
            {foundArray[0] ? "X" : ""}
          </div>
        </li>
        <li className="selectorCharacter">
          <div
            className="selectorCharacterImage"
            style={{
              backgroundImage: `url(${medium})`,
              width: widthSetting,
              height: heightSetting,
            }}
          >
            {foundArray[1] ? "X" : ""}
          </div>{" "}
        </li>
        <li className="selectorCharacter">
          <div
            className="selectorCharacterImage"
            style={{
              backgroundImage: `url(${hard})`,
              width: widthSetting,
              height: heightSetting,
            }}
          >
            {" "}
            {foundArray[2] ? "X" : ""}
          </div>{" "}
        </li>
      </ul>
    </div>
  );
}
