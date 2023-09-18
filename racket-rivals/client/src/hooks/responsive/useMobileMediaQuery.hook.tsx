import { useMediaQuery } from "react-responsive";

export const useMobileMediaQuery = () =>
  useMediaQuery({ query: "(max-width: 767px)" });
