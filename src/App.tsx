import "./App.css";

function App() {
  const w = window.innerWidth;
  let smaller = true;
  console.log(w);
  if (w > 600) {
    smaller = false;
  }
  console.log(smaller);

  function imageClickHandler(event: React.MouseEvent<HTMLAreaElement>) {
    const img = event.target;
    const rect = (img as HTMLImageElement).getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    console.log("x", clickX, "y", clickY);
  }

  return (
    <div className="screenWindow h-screen w-screen flex flex-col justify-start items-center">
      <div className="headerBar sticky bg-white h-8 w-full top-0"></div>
      <div
        className="relative h-[calc(100vh-2rem)] w-screen overflow-auto scrollbar-gutter-stable"
        style={{ scrollbarGutter: "stable" }}
      >
        <img
          className="block"
          style={{
            maxWidth: "none",
            width: smaller ? 3840 / 2 : 3840,
            height: smaller ? 2480 / 2 : 2480,
          }}
          useMap="#imageMap"
          src="95f6a575616919.5c51a34aac3a9-bicubic.jpg"
          alt=""
          onClick={() => console.log("clicked")}
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
