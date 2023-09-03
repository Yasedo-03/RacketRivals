import { useAppSelector } from "./useStore";

export const useAuthStatus = (): boolean => {
  const token = useAppSelector((state) => state.auth.token);
  return Boolean(token);
};

export const useGetToken = (): string | null => {
  const token = useAppSelector((state) => state.auth.token);
  return token;
};
