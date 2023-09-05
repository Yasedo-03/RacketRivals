import { setUser } from "../../store/slice/user";
import { racketRivalsApi } from "../api";
import { User } from "./interfaces/usersInterfaces";

export const usersEndpoints = racketRivalsApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query() {
        return {
          url: `me`,
          credentials: "include",
        };
      },
      transformResponse: (result: User) => result ?? null,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getUsers: builder.query<[User], void>({
      query() {
        return {
          url: `users`,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetMeQuery, useGetUsersQuery } = usersEndpoints;
