import { Router } from "./router/router";
import { useAutoRefreshTokenAndFetchUser } from "./hooks/services/useAutoRefreshTokenAndFetchUser";
import "./App.scss";

export const App = () => {
  useAutoRefreshTokenAndFetchUser();

  return <Router />;
};
