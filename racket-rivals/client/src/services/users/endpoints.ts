import {
  setSearchQueryUsers,
  setSearchTermUsers,
} from "../../store/slice/searchSlice";
import { setUser, setUserList } from "../../store/slice/user";
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
    searchUsers: builder.query<User[], string>({
      query: (searchTerm) => {
        return {
          url: `/users?search=${
            searchTerm ? encodeURIComponent(searchTerm) : ""
          }`,
          method: "GET",
        };
      },
      providesTags: (_) => ["Users"],
      transformResponse: (result: User[]) => result ?? null,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSearchQueryUsers(""));
          dispatch(setSearchTermUsers(""));
          dispatch(setUserList(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetMeQuery, useSearchUsersQuery } = usersEndpoints;
