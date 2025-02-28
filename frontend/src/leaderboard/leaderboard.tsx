import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Leaderboard() {
  let [game, gameTime] = [false, 0];
  const path = useLocation().pathname.split("/");
  if (useLocation().pathname.includes("result")) {
    game = true;
    gameTime = parseInt(path.pop() || "0");
  } else {
    game = false;
  }

  console.log("aparams", path);
  const [leaderboard, setLeaderboard] = useState(
    Array(10).fill({ name: "Not Taken", score: 0 })
  );

  useEffect(() => {
    fetch(`http://localhost:3000/api/leaderboard`)
      .then((response) => response.json())
      .then((data) => {
        setLeaderboard(data);
        console.log("DATA", data);
      });
  }, []);

  return (
    <div className="leaderboardMain h-screen w-screen flex flex-col items-center p-4 md:p-8 gap-4 md:gap-8 bg-stone-700 overflow-hidden">
      <div className="leaderboardHeader flex justify-between items-center w-full">
        <a href="/">
          <button className="w-15 md:w-30 py-2 text-lg md:text-2xl bg-white text-black font-bold flex justify-center items-center al rounded-lg shadow-md hover:bg-amber-300 transition-all duration-300 hover:cursor-pointer">
            Home
          </button>
        </a>
        <h1 className="leaderBoardTitle font-extrabold text-2xl md:text-6xl text-white  p-2 w-full text-center">
          Leaderboard
        </h1>
        <div className="empty w-40"></div>
      </div>
      <div className="gameResults font-extrabold text-2xl text-white">
        {game ? `Your time was: ${gameTime} seconds` : ""}
      </div>
      <div className="boardBody w-full md:w-2/3  bg-amber-200 rounded-lg shadow-md overflow-auto">
        <ul className="leaderboardList w-full flex flex-col ">
          {leaderboard.map((entry, index) => {
            return (
              <li
                key={index}
                className="leaderboardEntry w-full h-15 flex gap-2 items-center px-2  border-b-1 border-black bg-amber-200 shadow-md "
              >
                <p className="leaderboardRank text-black text-2xl font-extrabold flex justify-baseline py-2 w-12 border-r-1 ">
                  {index + 1}
                </p>
                <p className="leaderboardName text-black w-full text-xl font-bold text-start overflow-hidden py-2 flex align-middle ">
                  {entry.username}
                </p>
                <p className="leaderboardScore overflow-hidden font-bold text-black flex justify-end py-2 w-20">
                  {entry.score}s
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
