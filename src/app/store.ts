import { configureStore } from "@reduxjs/toolkit";
import calenderReducer from "../features/calender";
import stickersReducer from "../features/calender/stickers";
import tutorialReducer from "../features/tutorial";

export const store = configureStore({
  reducer: {
    calender: calenderReducer,
    stickers: stickersReducer,
    tutorial: tutorialReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
