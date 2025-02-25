import { useState } from "react";
import "./header.css";
import easy from "/easyImg.png";
import medium from "/medImg.png";
import hard from "/hardImg.png";
import Timer from "../timer/timer";

export default function Header({
  timer,
  smaller,
  foundArray,
}: {
  timer: number;
  smaller: boolean;
  foundArray: boolean[];
}) {
  const [open, setOpen] = useState(true);

  return (
    <div
      className="headerBar sticky bg-zinc-700 h-8 w-full top-0 grid items-stretch z-10 rounded-b-md shadow-md "
      style={{
        gridTemplateColumns: smaller ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
      }}
    >
      {!smaller ? (
        <div className="title flex justify-center items-center headerSection ">
          <p className="text-amber-300 text-xl font-bold">Finding Fiasco</p>
        </div>
      ) : (
        ""
      )}
      <p className="timer flex justify-center items-center text-amber-300 border-x-[1px] border-black headerSection ">
        <Timer />
      </p>
      <div
        className="characterDropDown relative h-full w-full flex justify-center items-center headerSection cursor-pointer hover:bg-zinc-500"
        onClick={() => setOpen(!open)}
      >
        <div className="trigger">
          <p className="text-amber-300 text-xl font-bold">Characters</p>
        </div>
        <div
          className={`menu absolute bg-zinc-500  z-50 h-32 top-8 right-0 transition-transform duration-500 ease-in-out rounded-b-lg shadow-[0px_2px_4px_black] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ width: "auto" }}
        >
          <ul className="grid grid-cols-3 gap-4 min-w-max align-middle justify-center p-4 ">
            <li className={`character easy w-24 h-24 `}>
              <div
                className={`characterImage relative`}
                style={{ backgroundImage: `url(${easy})` }}
              >
                <div className="xText"> {foundArray[0] ? "X" : ""}</div>
                <div className={`${foundArray[0] ? "overlay" : ""}`}></div>
              </div>
            </li>
            <li className="character medium w-24 h-24 ">
              <div
                className={`characterImage relative`}
                style={{ backgroundImage: `url(${medium})` }}
              >
                <div className="xText"> {foundArray[1] ? "X" : ""}</div>
                <div className={`${foundArray[1] ? "overlay" : ""}`}></div>
              </div>
            </li>
            <li className="character hard w-24 h-24">
              <div
                className={`characterImage relative`}
                style={{ backgroundImage: `url(${hard})` }}
              >
                <div className="xText"> {foundArray[2] ? "X" : ""}</div>
                <div className={`${foundArray[2] ? "overlay" : ""}`}></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
