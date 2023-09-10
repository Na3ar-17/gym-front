import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";

interface IAuthParams {
  fullName?: string;
  email?: string;
  password?: string;
  id?: number;
  token?: string;
}

interface IAuthData {
  fullName?: string;
  email?: string;
  token?: string;
  id?: number;
}

interface IAuth {
  data: IAuthParams | null;
  status: "pending" | "fulfilled" | "rejected";
}

export const fetchRegistration = createAsyncThunk(
  "auth/fetchRegister",
  async (params: IAuthData) => {
    const { data } = await axios.post("/auth/registration", params);
    return data;
  }
);

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (params: IAuthData) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
  }
);

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

const initialState: IAuth = {
  data: null,
  status: "pending",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("token");
      state.data = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRegistration.pending, (state) => {
        state.data = null;
        state.status = "pending";
      })
      .addCase(
        fetchRegistration.fulfilled,
        (state, action: PayloadAction<IAuthParams>) => {
          state.data = action.payload;
          state.status = "fulfilled";
        }
      )
      .addCase(fetchRegistration.rejected, (state) => {
        state.data = null;
        state.status = "rejected";
      })
      .addCase(fetchLogin.pending, (state) => {
        state.data = null;
        state.status = "pending";
      })
      .addCase(
        fetchLogin.fulfilled,
        (state, action: PayloadAction<IAuthParams>) => {
          state.data = action.payload;
          state.status = "fulfilled";
        }
      )
      .addCase(fetchLogin.rejected, (state) => {
        state.data = null;
        state.status = "rejected";
      })

      .addCase(fetchAuthMe.pending, (state) => {
        state.data = null;
        state.status = "pending";
      })
      .addCase(
        fetchAuthMe.fulfilled,
        (state, action: PayloadAction<IAuthParams>) => {
          state.data = action.payload;
          state.status = "fulfilled";
        }
      )
      .addCase(fetchAuthMe.rejected, (state) => {
        state.data = null;
        state.status = "rejected";
      });
  },
});

export const selectIsAuth = (state: { auth: { data: IAuthParams | null } }) =>
  Boolean(state.auth.data);
export const { logOut } = authSlice.actions;
export default authSlice.reducer;
