import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoaderForRouter } from "../components/Loader";
import { useAuthStatus } from "../hooks/store/user";
import Layout from "../Layouts/Layout";

const HomePage = lazy(() => import("../pages/homePage"));
const LoginPage = lazy(() => import("../pages/loginPage"));
const RegisterPage = lazy(() => import("../pages/registerPage"));
const TournamentPage = lazy(() => import("../pages/tournamentPage"));
const AccountPage = lazy(() => import("../pages/accountPage"));
const DashboardPage = lazy(() => import("../pages/dashboardPage"));
const DashboardMatchsPage = lazy(() => import("../pages/dashboardMatchsPage"));

const ProtectedRoutes = () => {
  const auth = useAuthStatus();
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export const Router = () => (
  <BrowserRouter>
    <Suspense fallback={<LoaderForRouter />}>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/account" element={<AccountPage />} />
          <Route
            path="/dashboard/:tournamentId/matchs"
            element={<DashboardMatchsPage />}
          />
          <Route path="/dashboard/:tournamentId" element={<DashboardPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/tournament/:tournamentId/*"
          element={<TournamentPage />}
        />
        <Route
          path="*"
          element={
            <Layout>
              <Suspense fallback={<LoaderForRouter />}>
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
