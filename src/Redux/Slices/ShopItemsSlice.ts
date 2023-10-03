import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";
import { IShopCard } from "../../Interfaces/ShopCard";
interface ICategory {
  category: string;
}

interface IShopItemsState {
  shopCards: IShopCard[];
  searchValue: string;
  categories: ICategory[];
  status: "pending" | "fulfilled" | "rejected";
  sortedCards: IShopCard[];
  currentCategory: string;
  totalPages: number;
  pageSize: number;
  currentPage: number;
}

interface IShopItems {
  currentPage: number;
  pageSize: number;
}

export const fetchShopItems = createAsyncThunk(
  "shopItems/fetchShopItems",
  async (params: IShopItems) => {
    try {
      const { data } = await axios.get(
        `/shop-items?page=${params.currentPage}&pageSize=${params.pageSize}`
      );
      return data;
    } catch (error) {
      console.log(`Error fetching shopItemsData ${error}`);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "shopItems/fetchCategories",
  async () => {
    try {
      const { data } = await axios.get("/get-categories");
      return data;
    } catch (error) {
      console.log(`Error fetching categories ${error}`);
    }
  }
);
export const fetchSortByCategory = createAsyncThunk(
  "shopItems/fetchSortByCategory",
  async (category: string) => {
    try {
      const { data } = await axios.get(`/sort-by-category/${category}`);
      return data;
    } catch (error) {
      console.log(`Error fetching shopItemsData ${error}`);
    }
  }
);

const initialState: IShopItemsState = {
  shopCards: [],
  status: "pending",
  searchValue: "",
  categories: [],
  sortedCards: [],
  currentCategory: "All",
  totalPages: 0,
  pageSize: 4,
  currentPage: 1,
};

const shopItemsSlice = createSlice({
  name: "shopItems",
  initialState,
  reducers: {
    changeSearchValue: (state, { payload }) => {
      state.searchValue = payload;
    },
    clearSortedCards: (state) => {
      state.sortedCards = [];
    },
    setCurrentCategory: (state, { payload }) => {
      state.currentCategory = payload;
    },
    changeCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchShopItems.pending, (state) => {
      state.shopCards = [];
      state.status = "pending";
    });

    builder.addCase(
      fetchShopItems.fulfilled,
      (
        state,
        action: PayloadAction<{ data: IShopCard[]; totalPages: number }>
      ) => {
        state.shopCards = action.payload.data;
        state.status = "fulfilled";
        state.totalPages = action.payload.totalPages;
      }
    );

    builder.addCase(fetchShopItems.rejected, (state) => {
      state.shopCards = [];
      state.status = "rejected";
    });
    builder.addCase(fetchCategories.pending, (state) => {
      (state.categories = []), (state.status = "pending");
    }),
      builder.addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<ICategory[]>) => {
          (state.categories = action.payload), (state.status = "fulfilled");
        }
      ),
      builder.addCase(fetchCategories.rejected, (state) => {
        (state.categories = []), (state.status = "rejected");
      }),
      builder.addCase(fetchSortByCategory.pending, (state) => {
        (state.sortedCards = []), (state.status = "pending");
      }),
      builder.addCase(
        fetchSortByCategory.fulfilled,
        (state, action: PayloadAction<IShopCard[]>) => {
          (state.sortedCards = action.payload), (state.status = "fulfilled");
        }
      ),
      builder.addCase(fetchSortByCategory.rejected, (state) => {
        (state.sortedCards = []), (state.status = "rejected");
      });
  },
});

export const {
  changeSearchValue,
  clearSortedCards,
  setCurrentCategory,
  changeCurrentPage,
} = shopItemsSlice.actions;
export default shopItemsSlice.reducer;
