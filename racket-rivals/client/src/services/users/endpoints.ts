import { racketRivalsApi } from "../api";
import {
  LoginRequest,
  RegisterInput,
  User,
  UserResponse,
} from "./interfaces/usersInterfaces";

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

export const { useLoginMutation, useRegisterUserMutation } = authEndpoints;