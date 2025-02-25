import NotFound from "./404/notFound";
import "./App.css";
import Game from "./game/gameController";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromChildren,
} from "react-router-dom";
import Home from "./home/homepage";
import Leaderboard from "./leaderboard/leaderboard";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route index element={<Home />} />
      <Route path="game" element={<Game />} />
      <Route path="leaderboard" element={<Leaderboard />} />
      <Route path="*" element={<NotFound />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
