/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IModalState {
  name: string;
  visible: boolean;
}

const initialState: IModalState = {
  name: "",
  visible: false,
};

const slice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<IModalState>) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {},
});

export const { setModal } = slice.actions;

export default slice.reducer;
