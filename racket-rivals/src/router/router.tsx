import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("../pages/homepage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>loading...</div>}>
        <HomePage />
      </Suspense>
    ),
  },
]);
