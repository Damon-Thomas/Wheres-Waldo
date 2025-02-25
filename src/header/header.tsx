import { useState } from "react";
import "./header.css";
import easy from "/easyImg.png";
import medium from "/medImg.png";
import hard from "/hardImg.png";

export default function Header({
  timer,
  smaller,
  foundArray,
}: {
  timer: number;
  smaller: boolean;
  foundArray: boolean[];
}) {
  console.log("Header smaller:", smaller);
  const [open, setOpen] = useState(true);

  return (
    <div
      className="headerBar sticky bg-zinc-700 h-8 w-full top-0 grid items-stretch z-10 rounded-b-md shadow-md "
      style={{
        gridTemplateColumns: smaller ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
      }}
    >
      {!smaller ? (
        <div className="title flex justify-center items-center headerSection">
          <p className="text-black">Finding Fiasco</p>
        </div>
      ) : (
        ""
      )}
      <p className="timer flex justify-center items-center text-black border-x-[1px] border-black headerSection ">
        {timer}
      </p>
      <div
        className="characterDropDown relative h-full w-full flex justify-center items-center headerSection cursor-pointer hover:bg-zinc-500"
        onClick={() => setOpen(!open)}
      >
        <div className="trigger">
          <p className="text-black ">Characters</p>
        </div>
        <div
          className={`menu absolute bg-zinc-500  z-50 h-32 top-8 right-0 transition-transform duration-500 ease-in-out rounded-b-lg shadow-[0px_2px_4px_black] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ width: "auto" }}
        >
          <ul className="grid grid-cols-3 gap-4 min-w-max align-middle justify-center p-4 ">
            <li className="character easy w-24 h-24">
              <div
                className="characterImage"
                style={{ backgroundImage: `url(${easy})` }}
              >
                {" "}
                {foundArray[0] ? "X" : ""}
              </div>
            </li>
            <li className="character medium w-24 h-24">
              <div
                className="characterImage"
                style={{ backgroundImage: `url(${medium})` }}
              >
                {foundArray[1] ? "X" : ""}
              </div>{" "}
            </li>
            <li className="character hard w-24 h-24">
              <div
                className="characterImage"
                style={{ backgroundImage: `url(${hard})` }}
              >
                {" "}
                {foundArray[2] ? "X" : ""}
              </div>{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
