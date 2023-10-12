import { setSearchQueryUsers } from "../../store/slice/searchSlice";
import { setTotalUsers, setUser, setUserList } from "../../store/slice/user";
import { racketRivalsApi } from "../api";
import { User } from "./interfaces/usersInterfaces";

export const usersEndpoints = racketRivalsApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query() {
        return {
          url: `user/me`,
          credentials: "include",
        };
      },
      providesTags: (result) => [{ type: "Users", id: "CURRENT" }],
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
    getUsers: builder.query<User[], { page: number; pageSize: number }>({
      query: ({ page, pageSize }) => ({
        url: `/user/users?page=${page}&pageSize=${pageSize}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result, error, { page, pageSize }) => [
        { type: "Users", id: `GET_${page}_${pageSize}` },
      ],
      transformResponse: (result: User[]) => result ?? null,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data, meta } = await queryFulfilled;
          dispatch(setUserList(data));

          const contentRange = (meta as any)?.response?.headers.get(
            "content-range"
          );
          if (contentRange) {
            const total = parseInt(contentRange.split("/")[1]);
            dispatch(setTotalUsers(total));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    searchUsers: builder.query<User[], { searchQuery?: string }>({
      query: ({ searchQuery }) => {
        return {
          url: `/user/users?search=${
            searchQuery ? encodeURIComponent(searchQuery) : ""
          }`,
          method: "GET",
        };
      },
      providesTags: (result, error, { searchQuery }) => [
        { type: "Users", id: `SEARCH_${searchQuery || ""}` },
      ],
      transformResponse: (result: User[]) => result ?? null,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSearchQueryUsers(""));
          dispatch(setUserList(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetMeQuery, useSearchUsersQuery, useGetUsersQuery } =
  usersEndpoints;
