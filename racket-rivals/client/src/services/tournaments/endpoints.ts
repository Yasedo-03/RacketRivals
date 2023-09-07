import {
  setMyTournaments,
  setTournament,
  setTournaments,
} from "../../store/slice/tournaments";
import { racketRivalsApi } from "../api";
import {
  GetTournamentParams,
  ITournament,
  ITournamentInput,
  RegisterToTournamentBody,
} from "./interfaces/tournamentInterface";

export const tournamentsEndpoints = racketRivalsApi.injectEndpoints({
  endpoints: (builder) => ({
    getTournaments: builder.query<[ITournament], void>({
      query: () => ({
        url: "/tournament",
        method: "GET",
      }),
      transformResponse: (result: [ITournament]) => result ?? null,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTournaments(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getTournament: builder.query<ITournament, GetTournamentParams>({
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
    getMyTournaments: builder.query<[ITournament], void>({
      query: () => ({
        url: "/tournament/myTournaments",
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (result: [ITournament]) => result ?? null,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setMyTournaments(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    newTournament: builder.mutation<ITournament, ITournamentInput>({
      query: () => ({
        url: "/tournament/create",
        method: "POST",
        credentials: "include",
      }),
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
} = tournamentsEndpoints;
