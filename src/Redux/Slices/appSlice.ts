import { createSlice } from "@reduxjs/toolkit";

interface IState {
  isDrawerOpen: boolean;
}

const initialState: IState = {
  isDrawerOpen: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    closeDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const appReducer = appSlice.reducer;
export const { closeDrawer } = appSlice.actions;
