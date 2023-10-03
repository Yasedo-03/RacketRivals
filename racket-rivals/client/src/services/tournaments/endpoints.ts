import { TournamentListViews } from "../../components/Homepage/TournamentSection/TournamentCard";
import {
  setSearchQueryTournaments,
  setSearchTermTournaments,
} from "../../store/slice/searchSlice";
import { updateTournamentForm } from "../../store/slice/tournamentForm";
import {
  addTournamentToMyTournaments,
  setMyTournaments,
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
    getMyTournaments: builder.query<ITournament[], void>({
      query: () => ({
        url: "/tournament/myTournaments",
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (result: ITournament[]) => result ?? null,
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
          dispatch(setTournament(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    searchTournament: builder.query<
      ITournament[],
      { searchTerm: string; currentView: TournamentListViews }
    >({
      query: ({ searchTerm, currentView }) => ({
        url: `/tournament/search?query=${
          searchTerm ? encodeURIComponent(searchTerm) : ""
        }`,
        method: "GET",
      }),
      providesTags: (_) => ["Tournaments"],
      transformResponse: (result: ITournament[]) => result ?? null,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSearchQueryTournaments(""));
          dispatch(setSearchTermTournaments(""));
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
