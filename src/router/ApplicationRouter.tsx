import { createBrowserRouter } from "react-router-dom";
import Home from "../presentation/pages/Home/Home";
import DragonBallZ from "../presentation/pages/DragonBallZ/DragonBallZ";
import Country from "../presentation/pages/Country/Country";
import NotFound from "../presentation/pages/NotFound/NotFound";
import Favorites from "../presentation/pages/Favorites/Favorites";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dragon-ball-z",
    element: <DragonBallZ />,
  },
  {
    path: "/country",
    element: <Country />,
  },
  {
    path: "/favorites",
    element: <Favorites/>,
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);