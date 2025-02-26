import { useEffect, useState } from "react";

import Header from "./header/header";
import Selector from "./selector/selector";

function Game() {
  const [smaller, setSmaller] = useState(true);
  const [selecter, setSelecter] = useState({ x: 0, y: 0, active: false });
  const [width, setWidth] = useState(3840);
  const [height, setHeight] = useState(2480);
  const [selectorWidth, setSelectorWidth] = useState(40);
  const [selectorHeight, setSelectorHeight] = useState(40);
  const [foundArray, setFoundArray] = useState([true, false, false]);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [rightSide, setRightSide] = useState(true);
  const [bottom, setBottom] = useState(true);

  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setScreenHeight(h);
      setScreenWidth(w);

      if (w > 600) {
        setSmaller(false);
        setWidth(3840);
        setHeight(2480);
        setSelectorWidth(80);
        setSelectorHeight(80);
      } else {
        setSmaller(true);
        setWidth(1920);
        setHeight(1240);
        setSelectorWidth(40);
        setSelectorHeight(40);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function imageClickHandler(event: React.MouseEvent<HTMLAreaElement>) {
    const img = event.target;
    const rect = (img as HTMLImageElement).getBoundingClientRect();

    const clickX = event.clientX - rect.left;
    const clickY = event.clientY + height - rect.top;
    setSelecter({ x: clickX, y: clickY, active: !selecter.active });

    if (
      screenHeight >
      event.clientY + (smaller ? 25 : 50) + (smaller ? 272 : 272)
    ) {
      setBottom(true);
    } else {
      setBottom(false);
    }
    if (
      screenWidth >
      event.clientX + (smaller ? 25 : 50) + (smaller ? 96 : 96)
    ) {
      setRightSide(true);
    } else {
      setRightSide(false);
    }
  }

  return (
    <div className="screenWindow h-screen w-screen flex flex-col justify-start items-center overflow-hidden">
      <Header timer={0} smaller={smaller} foundArray={foundArray} />
      {/* <div className="headerBar sticky bg-white h-8 w-full top-0"></div> */}
      <div
        className="relative h-[calc(100vh-2rem)] w-screen overflow-auto scrollbar-gutter-stable"
        style={{ scrollbarGutter: "stable" }}
      >
        <div
          className="selectorWrapper block absolute"
          style={{
            display: selecter.active ? "block" : "none",
            top: selecter.y - (smaller ? 25 : 50),
            left: selecter.x - (smaller ? 25 : 50),
          }}
        >
          <div
            className="relative border-4  bg-gray-950/40 border-gray-950 rounded-xl"
            style={{
              width: smaller ? 50 : 100,
              height: smaller ? 50 : 100,
            }}
          >
            <Selector
              foundArray={foundArray}
              widthSetting={selectorWidth}
              heightSetting={selectorHeight}
              rightSide={rightSide}
              bottom={bottom}
              smaller={smaller}
            />
          </div>
        </div>

        <img
          className="block z-0"
          style={{
            maxWidth: "none",
            width: smaller ? 3840 / 2 : 3840,
            height: smaller ? 2480 / 2 : 2480,
          }}
          useMap="#imageMap"
          src="/95f6a575616919.5c51a34aac3a9-bicubic.jpg"
          alt=""
        />
        <map name="imageMap">
          <area
            shape="rect"
            coords={smaller ? "0,0,1920,1240" : "0,0,3840,2480"}
            alt=""
            onClick={imageClickHandler}
            title="theImage"
          />
        </map>
      </div>
    </div>
  );
}

export default Game;
