import { createSlice } from "@reduxjs/toolkit";

interface ISearchContextState {
  searchQuery: string;
  searchTerm: string;
}

interface ISearchState {
  users: ISearchContextState;
  tournaments: ISearchContextState;
}

const initialState: ISearchState = {
  users: {
    searchQuery: "",
    searchTerm: "",
  },
  tournaments: {
    searchQuery: "",
    searchTerm: "",
  },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQueryUsers: (state, action) => {
      state.users.searchQuery = action.payload;
    },
    setSearchTermUsers: (state, action) => {
      state.users.searchTerm = action.payload;
    },
    setSearchQueryTournaments: (state, action) => {
      state.tournaments.searchQuery = action.payload;
    },
    setSearchTermTournaments: (state, action) => {
      state.tournaments.searchTerm = action.payload;
    },
  },
});

export const {
  setSearchQueryUsers,
  setSearchTermUsers,
  setSearchQueryTournaments,
  setSearchTermTournaments,
} = searchSlice.actions;

export default searchSlice.reducer;
