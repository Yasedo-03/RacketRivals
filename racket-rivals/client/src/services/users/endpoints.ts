import { racketRivalsApi } from "../api";
import { LoginRequest, UserResponse } from "./interfaces/usersInterfaces";

const usersEndpoints = racketRivalsApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = usersEndpoints;
