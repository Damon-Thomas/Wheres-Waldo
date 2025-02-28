import { useRef } from "react";

export default function Rules() {
  const usernameRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    const username = usernameRef.current?.value;
    if (!username) {
      alert("Please enter a username before you try and play the game!");
      return;
    }

    const time = Date.now();

    const game = fetch(`http://localhost:3000/api/game/${time}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId: time, username }),
    });
    game.then((res) => {
      if (res.status === 200) {
        window.location.href = `/game/${time}`;
      }
    });
  }

  return (
    <div className="rulesMain w-screen h-screen flex justify-center p-4 md:p-6  bg-stone-700 overflow-hidden">
      <div className="content h-full w-full lg:w-1/2 xl:w-2/3 flex flex-col items-center gap-4 md:gap-8 overflow-auto">
        <div className="homeHeader w-full flex justify-center items-center">
          <h1 className="homeTitle text-center text-2xl md:text-6xl font-extrabold drop-shadow-md">
            <span className="text-amber-300">F</span>inding{" "}
            <span className="text-amber-300">F</span>iasco
          </h1>
        </div>
        <div className="homeBody flex flex-col items-center gap-4 md:gap-8 w-full">
          <div className="ruleContent flex flex-col gap-2 md:gap-4 justify-center items-center">
            <form
              className="gameStartForm flex flex-col gap-2 md:gap-4 w-full "
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="inputWrapper flex flex-col gap-1 md:gap-2 p-2 px-4 bg-amber-300 rounded-lg shadow-md">
                <label
                  htmlFor="username"
                  className="text-black font-bold text-md md:text-lg"
                >
                  Username:
                </label>
                <input
                  name="username"
                  id="username"
                  ref={usernameRef}
                  className="bg-black text-amber-300 font-bold text-md md:text-lg px-2 py-0.5 w-full active:bg-black active:text-amber-300 shadow-md rounded-lg"
                />
              </div>
              <div className="homeButton w-full">
                <button
                  className="navButton w-full p-2 bg-amber-300 text-black font-bold text-lg rounded-lg shadow-md hover:bg-amber-100"
                  type="submit"
                  onClick={handleClick}
                >
                  Play Game
                </button>
              </div>
            </form>
            <div className="instructionContent flex flex-col items-center justify-start gap-2 md:gap-4 ">
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
                target. If one of the targets is within your selection box,
                choose that target from the list. After choosing what character
                you think you have found, the game will let you know if you
                found the right target by placing an X over any targets you
                find.{" "}
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
    </div>
  );
}
