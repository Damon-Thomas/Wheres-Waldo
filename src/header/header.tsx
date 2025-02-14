import { useState } from "react";
import "./header.css";

export default function Header({
  timer,
  smaller,
}: {
  timer: number;
  smaller: boolean;
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
          className={`menu absolute bg-black z-50 h-16 w-full top-8 transition-transform duration-500 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="grid grid-cols-3 items-stretch h-full w-full">
            <li className="character easy">
              <div className="characterImage"></div>
            </li>
            <li className="character medium">
              <div className="characterImage"></div>
            </li>
            <li className="character hard">
              <div className="characterImage"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
