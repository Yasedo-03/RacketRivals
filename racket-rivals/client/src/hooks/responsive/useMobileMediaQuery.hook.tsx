import { useMediaQuery } from "react-responsive";

export const useLaptopMediaQuery = () =>
  useMediaQuery({ query: "(max-width: 1024px)" });
