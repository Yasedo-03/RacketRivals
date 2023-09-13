import { setMatchs } from "../../store/slice/matchs";
import { racketRivalsApi } from "../api";
import {
  GetDataFromTournamentParams,
  Match,
} from "../tournaments/interfaces/tournamentInterface";

export const matchsEndpoints = racketRivalsApi.injectEndpoints({
  endpoints: (builder) => ({
    getMatchs: builder.query<Match[], GetDataFromTournamentParams>({
      query: ({ tournamentId }) => ({
        url: `/match/${tournamentId}`,
        method: "GET",
      }),
      transformResponse: (result: Match[]) => result ?? null,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setMatchs(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetMatchsQuery } = matchsEndpoints;
