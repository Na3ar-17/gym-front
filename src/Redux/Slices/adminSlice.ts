import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axiosAdmin";
import { IAdminData } from "../../Interfaces/AdminData";
import { IShopCard } from "../../Interfaces/ShopCard";

interface ILoginAdmin {
  email: string;
  password: string;
}
interface IUsersData {
  email: string;
  fullname: string;
  id: number;
}

interface IUserData {
  id: number;
  fullname: string;
  email: string;
}
interface IAdminState {
  data: IAdminData[] | null;
  status: "pending" | "fulfilled" | "rejected";
  users: IUsersData[];
  usersStatus: "pending" | "fulfilled" | "rejected";
  searchUser: string;
  userData: IUserData[];
  userGoods: IShopCard[];
  createShopItemData: IShopCard[];
}

export const fetchLoginAdmin = createAsyncThunk(
  "admin/fetchLoginAdmin",
  async (params: ILoginAdmin) => {
    const { data } = await axios.post("/admin-login", params);
    return data;
  }
);

export const fetchGetAdmin = createAsyncThunk(
  "admin/fetchGetAdmin",
  async () => {
    const { data } = await axios.get(`/get-admin/`);
    return data;
  }
);

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  const { data } = await axios.get("/get-users/");
  return data;
});

export const fetchUserData = createAsyncThunk(
  "admin/fetchUserData",
  async (userId: number) => {
    const { data } = await axios.get(`/get-user-data/${userId}`);
    return data;
  }
);
export const fetchUserGoods = createAsyncThunk(
  "admin/fetchUserGoods",
  async (userId: number) => {
    const { data } = await axios.get(`/get-user-goods/${userId}`);
    return data;
  }
);

export const fetchDeleteShopItem = createAsyncThunk(
  "admin/fetchDeleteShopItem",
  async (productId: number) => {
    const { data } = await axios.delete(`/shop-item/${productId}`);
    return data;
  }
);

const initialState: IAdminState = {
  data: null,
  users: [],
  status: "pending",
  usersStatus: "pending",
  searchUser: "",
  userData: [],
  userGoods: [],
  createShopItemData: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logOutAdmin: (state) => {
      state.data = null;
      window.localStorage.removeItem("adminToken");
    },
    setSearchUser: (state, { payload }) => {
      state.searchUser = payload;
    },
    clearUserData: (state) => {
      (state.userData = []), (state.userGoods = []);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLoginAdmin.pending, (state) => {
        state.data = null;
        state.status = "pending";
      })
      .addCase(
        fetchLoginAdmin.fulfilled,
        (state, action: PayloadAction<IAdminData[]>) => {
          state.data = action.payload;
          state.status = "fulfilled";
        }
      )
      .addCase(fetchLoginAdmin.rejected, (state) => {
        state.data = null;
        state.status = "rejected";
      })
      .addCase(fetchGetAdmin.pending, (state) => {
        state.data = null;
        state.status = "pending";
      })
      .addCase(
        fetchGetAdmin.fulfilled,
        (state, action: PayloadAction<IAdminData[]>) => {
          state.data = action.payload;
          state.status = "fulfilled";
        }
      )
      .addCase(fetchGetAdmin.rejected, (state) => {
        state.data = null;
        state.status = "rejected";
      })
      .addCase(fetchUsers.pending, (state) => {
        state.users = [];
        state.usersStatus = "pending";
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<IUsersData[]>) => {
          state.users = action.payload;
          state.usersStatus = "fulfilled";
        }
      )
      .addCase(fetchUsers.rejected, (state) => {
        state.users = [];
        state.usersStatus = "rejected";
      })
      .addCase(fetchUserData.pending, (state) => {
        state.userData = [];
      })
      .addCase(
        fetchUserData.fulfilled,
        (state, action: PayloadAction<IUserData[]>) => {
          state.userData = action.payload;
        }
      )
      .addCase(fetchUserData.rejected, (state) => {
        state.userData = [];
      })
      .addCase(fetchUserGoods.pending, (state) => {
        state.userGoods = [];
      })
      .addCase(
        fetchUserGoods.fulfilled,
        (state, action: PayloadAction<IShopCard[]>) => {
          state.userGoods = action.payload;
        }
      )
      .addCase(fetchUserGoods.rejected, (state) => {
        state.userGoods = [];
      });
  },
});
export const selectIsAdmin = (state: {
  admin: { data: IAdminData[] | null };
}) => Boolean(state.admin.data);
export const adminReducer = adminSlice.reducer;

export const { logOutAdmin, setSearchUser, clearUserData } = adminSlice.actions;
