import { RouterProvider } from "react-router-dom";
import "./App.scss";
import { router } from "./router/router";

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
