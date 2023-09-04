import { racketRivalsApi } from "../api";
import {
  LoginRequest,
  RegisterInput,
  User,
  UserResponse,
} from "./interfaces/authInterfaces";

export const authEndpoints = racketRivalsApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    logout: builder.mutation<void, null>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
    registerUser: builder.mutation<User, RegisterInput>({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterUserMutation, useLogoutMutation } =
  authEndpoints;
