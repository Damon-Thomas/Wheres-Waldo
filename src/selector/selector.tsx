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
    <div className="selector bg-slate-800 flex flex-col p-2 justify-center items-center rounded-lg">
      <ul className="selectorWrapper flex flex-col gap-2 justify-around items-center h-full w-full">
        <li className={`selectorCharacter `}>
          <div
            className="selectorCharacterImage z-10 relative"
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
