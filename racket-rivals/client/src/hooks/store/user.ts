import { useAppSelector } from "./useStore";

export const useAuthStatus = (): boolean => {
  const token = useAppSelector((state) => state.auth.token);
  return Boolean(token);
};
