import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layouts/Layout";

const HomePage = lazy(() => import("../pages/homepage"));

const routes = [{ path: "/", element: <HomePage /> }];

export const router = createBrowserRouter(
  routes.map((route) => ({
    ...route,
    element: (
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>{route.element}</Suspense>
      </Layout>
    ),
  }))
);
