import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";
import { IShopCard } from "../../Interfaces/ShopCard";

interface IMyGoodsData {
  userId: number;
  productId: number;
}

interface IMyGoodsState {
  myGoods: IShopCard[];
  status: "pending" | "fulfilled" | "rejected";
}

export const fetchMyGoods = createAsyncThunk(
  "myGoods/fetchMyGoods",
  async (userId: number) => {
    const { data } = await axios.get(`/get-my-goods/${userId}`);
    return data;
  }
);

export const fetchAddMyGoods = createAsyncThunk(
  "myGoods/fetchAddMyGoods",
  async (params: IMyGoodsData) => {
    try {
      const { data } = await axios.post("/add-product", params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchDeleteMyGoodsByUserId = createAsyncThunk(
  "myGoods/fetchDeleteMyGoodsByUserId ",
  async (userId: number) => {
    const { data } = await axios.delete(`/delete-my-goods/${userId}`);
    return data;
  }
);
export const fetchDeleteOneById = createAsyncThunk(
  "myGoods/fetchDeleteOneById ",
  async ({ userId, productId }: { userId: number; productId: number }) => {
    const { data } = await axios.delete(`/delete-by-id/${userId}/${productId}`);
    return data;
  }
);

const initialState: IMyGoodsState = {
  myGoods: [],
  status: "pending",
};

const myGoodsSlice = createSlice({
  name: " myGoods",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchMyGoods.pending, (state) => {
      (state.myGoods = []), (state.status = "pending");
    }),
      builder.addCase(
        fetchMyGoods.fulfilled,
        (state, action: PayloadAction<IShopCard[]>) => {
          state.myGoods = action.payload;
          state.status = "fulfilled";
        }
      ),
      builder.addCase(fetchMyGoods.rejected, (state) => {
        state.myGoods = [];
        state.status = "rejected";
      }),
      builder.addCase(fetchAddMyGoods.pending, (state) => {
        (state.myGoods = []), (state.status = "pending");
      }),
      builder.addCase(
        fetchAddMyGoods.fulfilled,
        (state, action: PayloadAction<IShopCard[]>) => {
          state.myGoods = action.payload;
          state.status = "fulfilled";
        }
      ),
      builder.addCase(fetchAddMyGoods.rejected, (state) => {
        state.myGoods = [];
        state.status = "rejected";
      }),
      builder.addCase(fetchDeleteMyGoodsByUserId.pending, (state) => {
        (state.myGoods = []), (state.status = "pending");
      }),
      builder.addCase(
        fetchDeleteMyGoodsByUserId.fulfilled,
        (state, action: PayloadAction<IShopCard[]>) => {
          state.myGoods = action.payload;
          state.status = "fulfilled";
        }
      ),
      builder.addCase(fetchDeleteMyGoodsByUserId.rejected, (state) => {
        state.myGoods = [];
        state.status = "rejected";
      });
  },
});

export const myGoodsReducer = myGoodsSlice.reducer;
