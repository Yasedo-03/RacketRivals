import { createSlice } from "@reduxjs/toolkit";

interface ISearchContextState {
  searchQuery: string;
}

interface ISearchState {
  users: ISearchContextState;
  tournaments: ISearchContextState;
}

const initialState: ISearchState = {
  users: {
    searchQuery: "",
  },
  tournaments: {
    searchQuery: "",
  },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQueryUsers: (state, action) => {
      state.users.searchQuery = action.payload;
    },
    setSearchQueryTournaments: (state, action) => {
      state.tournaments.searchQuery = action.payload;
    },
  },
});

export const { setSearchQueryUsers, setSearchQueryTournaments } =
  searchSlice.actions;

export default searchSlice.reducer;
