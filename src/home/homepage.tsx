import "./home.css";

export default function Home() {
  return (
    <div className="homeMain w-screen h-screen flex flex-col items-center justify-center gap-4 md:gap-8 bg-stone-700">
      <div className="homeHeader">
        <h1 className="homeTitle text-center text-2xl md:text-6xl font-extrabold drop-shadow-md">
          <span className="text-amber-300">F</span>inding{" "}
          <span className="text-amber-300">F</span>iasco
        </h1>
        <h2 className="homeSubTitle text-center font-bold">
          Test your finding skills with this game!
        </h2>
      </div>
      <div className="homeBody flex flex-col items-center gap-4 md:gap-8 w-full">
        <a href="/rules" className="homeButton w-full">
          <button className="navButton ">Start Game</button>
        </a>
        <a href="/leaderboard" className="homeButton w-full">
          <button className="navButton ">Leaderboard</button>
        </a>
      </div>
    </div>
  );
}
