import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";
import { IPrograms } from "../../Interfaces/Programs";

interface programsState {
  programsCard: IPrograms[];
  status: "pending" | "fulfilled" | "rejected";
}

export const fetchPrograms = createAsyncThunk(
  "programs/fetchPrograms",
  async () => {
    try {
      const { data } = await axios.get("/programs");
      return data;
    } catch (error) {
      console.log(`Error fetching programsData ${error}`);
    }
  }
);

const initialState: programsState = {
  programsCard: [],
  status: "pending",
};
const programsSLice = createSlice({
  name: "programs",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPrograms.pending, (state) => {
      (state.programsCard = []), (state.status = "pending");
    }),
      builder.addCase(
        fetchPrograms.fulfilled,
        (state, action: PayloadAction<IPrograms[]>) => {
          (state.programsCard = action.payload), (state.status = "fulfilled");
        }
      ),
      builder.addCase(fetchPrograms.rejected, (state) => {
        state.programsCard = [];
        state.status = "rejected";
      });
  },
});

export default programsSLice.reducer;
