import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../Layouts/Layout";

const HomePage = lazy(() => import("../pages/homePage"));
const LoginPage = lazy(() => import("../pages/loginPage"));
const RegisterPage = lazy(() => import("../pages/registerPage"));
const TournamentPage = lazy(() => import("../pages/tournamentPage"));

export const Router = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/tournament/1/*" element={<TournamentPage />} />
        <Route
          path="*"
          element={
            <Layout>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/*" element={<HomePage />} />
                </Routes>
              </Suspense>
            </Layout>
          }
        />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
