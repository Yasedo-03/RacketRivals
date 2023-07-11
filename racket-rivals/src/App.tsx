import { RouterProvider } from "react-router-dom";
import "./App.scss";
import { router } from "./router/router";

export const App = () => {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
};
