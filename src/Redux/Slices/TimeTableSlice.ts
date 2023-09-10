import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";
import { ITimeTable } from "../../Interfaces/TimeTable";

interface ITimeTableState {
  timeTableData: ITimeTable[];
  status: "pending" | "fulfilled" | "rejected";
}

export const fetchTimeTableData = createAsyncThunk(
  "timeTable/fetchTimeTable",
  async () => {
    try {
      const { data } = await axios.get("/time-table");
      return data;
    } catch (error) {
      console.log(`Error fetching timeTableData ${error}`);
    }
  }
);

const initialState: ITimeTableState = {
  timeTableData: [],
  status: "pending",
};

const timeTableSlice = createSlice({
  name: "timeTable",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTimeTableData.pending, (state) => {
      (state.timeTableData = []), (state.status = "pending");
    }),
      builder.addCase(
        fetchTimeTableData.fulfilled,
        (state, action: PayloadAction<ITimeTable[]>) => {
          (state.timeTableData = action.payload), (state.status = "fulfilled");
        }
      ),
      builder.addCase(fetchTimeTableData.rejected, (state) => {
        (state.timeTableData = []), (state.status = "rejected");
      });
  },
});

export default timeTableSlice.reducer;
