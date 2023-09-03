import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const racketRivalsApi = createApi({
  reducerPath: "racketRivalsAPI",
  baseQuery: baseQuery,
  tagTypes: ["Users", "Auth"],
  endpoints: () => ({}),
});
