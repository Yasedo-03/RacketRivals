import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../Layouts/Layout";

const HomePage = lazy(() => import("../pages/homepage"));

export const Router = () => (
  <BrowserRouter>
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </Layout>
  </BrowserRouter>
);
