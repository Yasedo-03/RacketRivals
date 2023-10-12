import { TournamentListViews } from "../../components/Homepage/TournamentSection/TournamentCard";
import { setMatchs } from "../../store/slice/matchs";
import { setSearchQueryTournaments } from "../../store/slice/searchSlice";
import { updateTournamentForm } from "../../store/slice/tournamentForm";
import {
  addTournamentToMyTournaments,
  setMyTournaments,
  setTotalTournaments,
  setTournament,
  setTournaments,
} from "../../store/slice/tournaments";
import { racketRivalsApi } from "../api";
import {
  GetDataFromTournamentParams,
  ITournament,
  ITournamentInput,
  RegisterToTournamentBody,
  UpdateTournamentParams,
} from "./interfaces/tournamentInterface";

export const tournamentsEndpoints = racketRivalsApi.injectEndpoints({
  endpoints: (builder) => ({
    getTournaments: builder.query<
      [ITournament],
      { page: number; pageSize: number }
    >({
      query: ({ page, pageSize }) => ({
        url: `/tournament?page=${page}&pageSize=${pageSize}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result, error, { page, pageSize }) => [
        { type: "Tournaments", id: `GET_${page}_${pageSize}` },
      ],
      transformResponse: (result: [ITournament]) => result ?? null,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data, meta } = await queryFulfilled;

          const contentRange = (meta as any)?.response?.headers.get(
            "content-range"
          );

          if (contentRange) {
            const total = parseInt(contentRange.split("/")[1]);
            dispatch(setTotalTournaments(total));
          }
          dispatch(setTournaments(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getTournament: builder.query<ITournament, GetDataFromTournamentParams>({
      query: ({ tournamentId }) => ({
        url: `/tournament/${tournamentId}`,
        method: "GET",
      }),
      transformResponse: (result: ITournament) => result ?? null,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTournament(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getMyTournaments: builder.query<
      ITournament[],
      { page: number; pageSize: number }
    >({
      query: ({ page, pageSize }) => ({
        url: `/tournament/myTournaments?page=${page}&pageSize=${pageSize}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result, error, { page, pageSize }) => [
        { type: "Tournaments", id: `GET_MY_${page}_${pageSize}` },
      ],
      transformResponse: (result: ITournament[]) => result ?? null,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data, meta } = await queryFulfilled;

          const contentRange = (meta as any)?.response?.headers.get(
            "content-range"
          );

          if (contentRange) {
            const total = parseInt(contentRange.split("/")[1]);
            dispatch(setTotalTournaments(total));
          }

          dispatch(setMyTournaments(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    newTournament: builder.mutation<ITournament, ITournamentInput>({
      query: (data) => ({
        url: "/tournament/create",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      transformResponse: (result: ITournament) => result ?? null,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addTournamentToMyTournaments(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    registerToTournament: builder.mutation<
      ITournament,
      RegisterToTournamentBody
    >({
      query: (data) => ({
        url: "/tournament/register",
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      transformResponse: (result: ITournament) => result ?? null,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTournament(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    unregisterToTournament: builder.mutation<
      ITournament,
      RegisterToTournamentBody
    >({
      query: (data) => ({
        url: "/tournament/unregister",
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      transformResponse: (result: ITournament) => result ?? null,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTournament(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateTournament: builder.mutation<ITournament, UpdateTournamentParams>({
      query: ({ tournament, tournamentId }) => ({
        url: `/tournament/${tournamentId}/update`,
        method: "PATCH",
        body: tournament,
        credentials: "include",
      }),
      transformResponse: (result: ITournament) => result ?? null,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateTournamentForm(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    launchEliminationTournament: builder.mutation<
      ITournament,
      UpdateTournamentParams
    >({
      query: ({ tournamentId }) => ({
        url: `/tournament/${tournamentId}/launch_tournament`,
        method: "PATCH",
        credentials: "include",
      }),
      transformResponse: (result: ITournament) => result ?? null,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setMatchs(data.matchs));
          dispatch(setTournament(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    searchTournament: builder.query<
      ITournament[],
      { searchQuery?: string; currentView: TournamentListViews }
    >({
      query: ({ searchQuery, currentView }) => {
        return {
          url: `/tournament/search?query=${
            searchQuery ? encodeURIComponent(searchQuery) : ""
          }`,
          method: "GET",
        };
      },
      providesTags: (result, error, { searchQuery }) => [
        { type: "Tournaments", id: `SEARCH_${searchQuery || ""}` },
      ],
      transformResponse: (result: ITournament[]) => result ?? null,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data, meta } = await queryFulfilled;

          dispatch(setSearchQueryTournaments(""));

          const contentRange = (meta as any)?.response?.headers.get(
            "content-range"
          );
          if (contentRange) {
            const total = parseInt(contentRange.split("/")[1]);
            dispatch(setTotalTournaments(total));
          }

          if (args.currentView === TournamentListViews.MyTournaments) {
            dispatch(setMyTournaments(data));
          } else {
            dispatch(setTournaments(data));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMyTournamentsQuery,
  useGetTournamentQuery,
  useGetTournamentsQuery,
  useNewTournamentMutation,
  useRegisterToTournamentMutation,
  useUnregisterToTournamentMutation,
  useUpdateTournamentMutation,
  useLaunchEliminationTournamentMutation,
  useSearchTournamentQuery,
} = tournamentsEndpoints;
