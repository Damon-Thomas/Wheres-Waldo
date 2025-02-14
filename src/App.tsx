import { useEffect, useState } from "react";
import "./App.css";
import Header from "./header/header";

function App() {
  const [smaller, setSmaller] = useState(true);
  const [selecter, setSelecter] = useState({ x: 0, y: 0, active: false });
  const [width, setWidth] = useState(3840);
  const [height, setHeight] = useState(2480);

  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      if (w > 600) {
        setSmaller(false);
        setWidth(3840);
        setHeight(2480);
      } else {
        setSmaller(true);
        setWidth(1920);
        setHeight(1240);
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
    console.log("click", clickX, clickY);
  }

  return (
    <div className="screenWindow h-screen w-screen flex flex-col justify-start items-center overflow-hidden">
      <Header timer={0} smaller={smaller} />
      {/* <div className="headerBar sticky bg-white h-8 w-full top-0"></div> */}
      <div
        className="relative h-[calc(100vh-2rem)] w-screen overflow-auto scrollbar-gutter-stable"
        style={{ scrollbarGutter: "stable" }}
      >
        <div
          className="absolute  w-16 h-16   border-4  bg-gray-950/40 border-gray-950 rounded-xl"
          style={{
            top: selecter.y - (smaller ? 25 : 50),
            left: selecter.x - (smaller ? 25 : 50),
            width: smaller ? 50 : 100,
            height: smaller ? 50 : 100,
            display: selecter.active ? "block" : "none",
          }}
        ></div>
        <img
          className="block z-0"
          style={{
            maxWidth: "none",
            width: smaller ? 3840 / 2 : 3840,
            height: smaller ? 2480 / 2 : 2480,
          }}
          useMap="#imageMap"
          src="95f6a575616919.5c51a34aac3a9-bicubic.jpg"
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

export default App;
