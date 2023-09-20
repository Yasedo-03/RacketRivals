import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  FetchBaseQueryError,
  FetchArgs,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { logout, setCredentials } from "../store/slice/auth";
// import.meta.env.VITE_API_URL
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://racket-rivals-dl6t.vercel.app/api',
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 403) {
    const refreshResult = await baseQuery("auth/refresh", api, extraOptions);
    if (refreshResult.data) {
      const { userID, accessToken } = refreshResult.data as {
        userID: string;
        accessToken: string;
      };
      if (userID && accessToken) {
        api.dispatch(setCredentials({ userID, accessToken }));
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.error(
          "Données de rafraîchissement invalides",
          refreshResult.data
        );
        api.dispatch(logout());
      }
    }
  }
  return result;
};

export const racketRivalsApi = createApi({
  reducerPath: "racketRivalsAPI",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Users", "Auth", "Tournaments", "Matchs"],
  endpoints: () => ({}),
});
