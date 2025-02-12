import "./App.css";

function App() {
  const w = window.innerWidth;
  let smaller = true;
  console.log(w);
  if (w > 600) {
    smaller = false;
  }
  console.log(smaller);

  function imageClickHandler() {
    console.log("clicked");
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
          src="95f6a575616919.5c51a34aac3a9-bicubic.jpg"
          alt=""
          onClick={() => console.log("clicked")}
        />
      </div>
    </div>
  );
}

export default App;
