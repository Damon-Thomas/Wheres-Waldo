import { useEffect, useState, useRef } from "react";
import Header from "./header/header";
import Selector from "./selector/selector";

function Game() {
  const [smaller, setSmaller] = useState(true);
  const [selecter, setSelecter] = useState({ x: 0, y: 0, active: false });
  const [width, setWidth] = useState(3840);
  const [height, setHeight] = useState(2480);
  const [selectorWidth, setSelectorWidth] = useState(40);
  const [selectorHeight, setSelectorHeight] = useState(40);
  const [foundArray, setFoundArray] = useState([false, false, false]);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [rightSide, setRightSide] = useState(true);
  const [bottom, setBottom] = useState(true);
  const [failureOverlay, setFailureOverlay] = useState(false);
  const [transitionDuration, setTransitionDuration] = useState(".0001s");

  const scrollableRef = useRef<HTMLDivElement>(null);
  let isDown = false;
  let startX: number, startY: number, scrollLeft: number, scrollTop: number;
  let isDragging = false;

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

  useEffect(() => {
    if (failureOverlay) {
      setTransitionDuration("1s"); // Slow transition for hiding
      setFailureOverlay(false);

      setTimeout(() => {
        setTransitionDuration(".0001s"); // Fast transition for showing
      }, 1000);
    }
  }, [failureOverlay]);

  function imageClickHandler(event: React.MouseEvent<HTMLAreaElement>) {
    if (isDragging) {
      isDragging = false;
      return;
    }

    const img = event.target;
    const rect = (img as HTMLImageElement).getBoundingClientRect();

    const clickX = event.clientX - rect.left;
    const clickY = event.clientY + height - rect.top;
    console.log("coords", "x", clickX, " y", clickY);
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

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    isDown = true;
    isDragging = false;
    if (scrollableRef.current) {
      startX = e.pageX - scrollableRef.current.offsetLeft;
      startY = e.pageY - scrollableRef.current.offsetTop;
      scrollLeft = scrollableRef.current.scrollLeft;
      scrollTop = scrollableRef.current.scrollTop;
    }
  }

  function handleMouseLeave() {
    isDown = false;
  }

  function handleMouseUp() {
    isDown = false;
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isDown) return;
    e.preventDefault();
    isDragging = true;
    if (scrollableRef.current) {
      const x = e.pageX - scrollableRef.current.offsetLeft;
      const y = e.pageY - scrollableRef.current.offsetTop;
      const walkX = (x - startX) * 2; // Adjust the scroll speed
      const walkY = (y - startY) * 2; // Adjust the scroll speed
      scrollableRef.current.scrollLeft = scrollLeft - walkX;
      scrollableRef.current.scrollTop = scrollTop - walkY;
    }
  }

  return (
    <div className="screenWindow h-screen w-screen flex flex-col justify-start items-center overflow-hidden">
      <Header smaller={smaller} foundArray={foundArray} />
      {/* <div className="headerBar sticky bg-white h-8 w-full top-0"></div> */}
      <div
        className={`failureOverlay ${failureOverlay ? "show" : ""}`}
        style={{ transitionDuration }}
      ></div>
      <div
        className="relative h-[calc(100vh-2rem)] w-screen overflow-auto scrollbar-gutter-stable cursor-pointer"
        style={{ scrollbarGutter: "stable" }}
        ref={scrollableRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
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
              setFoundArray={setFoundArray}
              widthSetting={selectorWidth}
              heightSetting={selectorHeight}
              rightSide={rightSide}
              bottom={bottom}
              smaller={smaller}
              selecter={selecter}
              setFailureOverlay={setFailureOverlay}
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
