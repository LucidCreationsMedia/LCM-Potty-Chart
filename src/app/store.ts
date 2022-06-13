import { configureStore } from "@reduxjs/toolkit";
import calenderReducer from "../features/calender/calender";

export const store = configureStore({
  reducer: {
    calender: calenderReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
