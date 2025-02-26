export default function Rules() {
  function handleClick() {
    const time = Date.now();
    const game = fetch(`http://localhost:3000/api/game/${time}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId: time }),
    });
    game.then((res) => {
      if (res.status === 200) {
        window.location.href = `/game/${time}`;
      }
    });
  }

  return (
    <div className="rulesMain w-screen h-screen flex flex-col items-center justify-center gap-4 md:gap-8 bg-stone-700">
      <div className="homeHeader">
        <h1 className="homeTitle text-center text-2xl md:text-6xl font-extrabold drop-shadow-md">
          <span className="text-amber-300">F</span>inding{" "}
          <span className="text-amber-300">F</span>iasco
        </h1>
      </div>
      <div className="homeBody flex flex-col items-center gap-4 md:gap-8 w-full">
        <div className="ruleContent flex flex-col gap-2 md:gap-4 justify-center items-center">
          <a className="homeButton w-full" onClick={handleClick}>
            <button className="navButton ">Play Game</button>
          </a>
          <div className="instructionContent flex flex-col items-center justify-start gap-2 md:gap-4 w-2/3 md:w-1/2">
            <h3 className="insTitle text-2xl font-bold pt-2 md:pt-6">
              Instructions
            </h3>
            <p className="insBody font-bold">
              As soon as you click the play game button your timer will start.
              Your task is to find the three images located at the top right
              within the gamespace as fast as you can.
            </p>
            <p className="insBody font-bold">
              When you click anywhere in the image a target square will pop up
              where you clicked, and the 3 images will appear beside your
              target. If one of the targets is within your selection box, choose
              that target from the list. After choosing what character you think
              you have found, the game will let you know if you found the right
              target by placing an X over any targets you find.{" "}
            </p>
            <p className="insBody font-bold">
              Once you find all 3 targets, you will be brought to the
              leaderboard where you can add your name onto the leaderboard if
              you were fast enough, or see how your time stacks up against the
              top scores.
            </p>
            <a href="/">
              <button className="p-4 bg-amber-300 font-bold text-lg md:text-2xl text-black rounded-lg shadow-md hover:bg-amber-100 hover:cursor-pointer">
                Return Home
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
