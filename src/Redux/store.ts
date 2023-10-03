import { configureStore } from "@reduxjs/toolkit";
import trainersReducer from "./Slices/TrainersSlice";
import programsReducer from "./Slices/ProgramsSlice";
import timeTableReducer from "./Slices/TimeTableSlice";
import shopItemsReducer from "./Slices/ShopItemsSlice";
import authReducer from "./Slices/authSlice";
import { appReducer } from "./Slices/appSlice";
import { myGoodsReducer } from "./Slices/myGoodsSlice";
import { adminReducer } from "./Slices/adminSlice";

const store = configureStore({
  reducer: {
    trainers: trainersReducer,
    programs: programsReducer,
    timeTable: timeTableReducer,
    shopItems: shopItemsReducer,
    auth: authReducer,
    app: appReducer,
    myGoods: myGoodsReducer,
    admin: adminReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
