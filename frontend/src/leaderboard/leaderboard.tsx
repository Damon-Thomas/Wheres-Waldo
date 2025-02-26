import { useEffect, useState } from "react";

export default function Leaderboard(game = false, gameTime = 0) {
  const [leaderboard, setLeaderboard] = useState(
    Array(10).fill({ name: "Not Taken", score: 0 })
  );

  useEffect(() => {
    fetch("https://api.example.com/leaderboard")
      .then((response) => response.json())
      .then((data) => {
        setLeaderboard(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="leaderboardMain h-screen w-screen flex flex-col items-center p-4 md:p-8 gap-4 md:gap-8 bg-stone-700 overflow-hidden">
      <div className="leaderboardHeader flex justify-between items-center w-full">
        <a href="/">
          <button className="w-30 py-2 text-2xl bg-white text-black font-bold flex justify-center items-center al rounded-lg shadow-md hover:bg-amber-300 transition-all duration-300 hover:cursor-pointer">
            Home
          </button>
        </a>
        <h1 className="leaderBoardTitle font-extrabold text-2xl md:text-6xl text-white  p-2 w-full text-center">
          Leaderboard
        </h1>
        <div className="empty w-40"></div>
      </div>
      <div className="gameResults font-extrabold text-2xl text-white">
        {!game ? `Your time was: ${gameTime}` : ""}
      </div>
      <div className="boardBody w-full md:w-2/3 h-full bg-zinc-500 rounded-lg shadow-md overflow-auto">
        <ul className="leaderboardList w-full">
          {leaderboard.map((entry, index) => {
            return (
              <li
                key={index}
                className="leaderboardEntry w-full flex justify-between items-center p-4 md:p-8 border-b-1 border-amber-50 bg-amber-200 shadow-md"
              >
                <p className="leaderboardRank text-black text-2xl font-extrabold">
                  {index + 1}
                </p>
                <p className="leaderboardName text-black w-full text-xl font-bold text-center overflow-hidden">
                  {entry.name}
                </p>
                <p className="leaderboardScore overflow-hidden font-bold text-black">
                  {entry.score}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
