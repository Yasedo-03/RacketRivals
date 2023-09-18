import { setMatchFromAPI, updateMatchForm } from "../../store/slice/matchForm";
import { setMatchs, updateMatches } from "../../store/slice/matchs";
import { racketRivalsApi } from "../api";
import { GetDataFromTournamentParams } from "../tournaments/interfaces/tournamentInterface";
import { Match, UpdateMatchParams } from "./interfaces/matchInterface";

export const matchsEndpoints = racketRivalsApi.injectEndpoints({
  endpoints: (builder) => ({
    getMatchs: builder.query<Match[], GetDataFromTournamentParams>({
      query: ({ tournamentId }) => ({
        url: `/match/${tournamentId}`,
        method: "GET",
      }),
      transformResponse: (result: Match[]) => result ?? null,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setMatchs(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateMatch: builder.mutation<Match[], UpdateMatchParams>({
      query: ({ tournamentId, matchInput, matchId }) => ({
        url: `/match/${tournamentId}/matchs_update`,
        method: "PATCH",
        body: { matchInput, matchId },
        credentials: "include",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Matchs", id: arg.matchId },
      ],
      transformResponse: (result: Match[]) => result ?? null,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateMatches(data));

          data.forEach((match) => {
            dispatch(setMatchFromAPI(match));
          });
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetMatchsQuery, useUpdateMatchMutation } = matchsEndpoints;
