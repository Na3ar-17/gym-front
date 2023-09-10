import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";

interface trainers {
  name: string;
  category: string;
  instagram: string;
  twitter: string;
  facebook: string;
  img: string;
}

interface TrainersState {
  trainersCard: trainers[];
  status: "pending" | "fulfilled" | "rejected";
}

export const fetchTrainers = createAsyncThunk(
  "trainers/fetchTrainers",
  async () => {
    try {
      const { data } = await axios.get("/trainers");
      return data;
    } catch (error) {
      console.log(`Error fetching trainersData ${error}`);
    }
  }
);

const initialState: TrainersState = {
  trainersCard: [],
  status: "pending",
};

const trainersSlice = createSlice({
  name: "trainers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTrainers.pending, (state) => {
      state.trainersCard = [];
      state.status = "pending";
    }),
      builder.addCase(
        fetchTrainers.fulfilled,
        (state, action: PayloadAction<trainers[]>) => {
          state.trainersCard = action.payload;
          state.status = "fulfilled";
        }
      ),
      builder.addCase(fetchTrainers.rejected, (state) => {
        state.trainersCard = [];
        state.status = "rejected";
      });
  },
});

export default trainersSlice.reducer;
