import { configureStore } from "@reduxjs/toolkit";
import calenderReducer from "../features/calender/calender";
import stickersReducer from "../features/calender/stickers";

export const store = configureStore({
  reducer: {
    calender: calenderReducer,
    stickers: stickersReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
