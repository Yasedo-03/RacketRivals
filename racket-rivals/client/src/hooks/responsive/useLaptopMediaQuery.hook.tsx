import { useMediaQuery } from "react-responsive";

export const useLaptopMediaQuery = () =>
  useMediaQuery({ query: "(min-width: 1024px)" });
