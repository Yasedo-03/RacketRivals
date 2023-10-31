import { useMediaQuery } from "react-responsive";

export const useTabletMediaQuery = () =>
  useMediaQuery({ query: "(min-width: 768px)" });
