import { createSlice } from "@reduxjs/toolkit";

interface IState {
  isDrawerOpen: boolean;
  isSnackOpen: boolean;
  snackText: string;
  snackType: "error" | "warning" | "info" | "success";
}

const initialState: IState = {
  isDrawerOpen: false,
  isSnackOpen: false,
  snackText: "",
  snackType: "info",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    closeDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    setSnackOpen: (state) => {
      state.isSnackOpen = !state.isSnackOpen;
    },
    setSnackText: (state, { payload }) => {
      state.snackText = payload;
    },
    setSnackType: (state, { payload }) => {
      state.snackType = payload;
    },
  },
});

export const appReducer = appSlice.reducer;
export const { closeDrawer, setSnackOpen, setSnackText, setSnackType } =
  appSlice.actions;
