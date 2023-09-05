import { User } from "../../services/users/interfaces/usersInterfaces";
import { useAppSelector } from "./useStore";

export const useAuthStatus = (): boolean => {
  const token = useAppSelector((state) => state.auth.accessToken);
  return Boolean(token);
};

export const useGetToken = (): string | null => {
  const token = useAppSelector((state) => state.auth.accessToken);
  return token;
};

export const useGetUser = (): User | null => {
  const user = useAppSelector((state) => state.user.user);
  return user;
};
