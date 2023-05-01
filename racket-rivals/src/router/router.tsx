import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/homepage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);
