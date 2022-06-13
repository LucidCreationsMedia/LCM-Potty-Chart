import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format } from "date-fns";

interface CalenderSlice {
  currDate: Date;
  selectedDateInfo: {
    selectedDate: Date;
    title: string;
    layout: MonthLayout;
  };
}

const getCurrDate = (): Date => new Date();
const dateFormatter = (date: Date): string => format(date, "LLLL uuuu");

const initialState: CalenderSlice = {
  currDate: getCurrDate(),
  selectedDateInfo: {
    selectedDate: getCurrDate(),
    title: dateFormatter(new Date()),
    layout: {} as MonthLayout
  }
};

const calenderSlice = createSlice({
  name: "Calender",
  initialState,
  reducers: {
    // Populate month
    // Update month info
    updateMonth(state: CalenderSlice, action: PayloadAction<Date>) {
      const { payload: newDate } = action;

      state.selectedDateInfo.selectedDate = newDate;
      state.selectedDateInfo.title = dateFormatter(newDate);
      // ! Add the layout formatter function
    },
    // Update current date
    updateCurrDate(state: CalenderSlice) {
      state.currDate = new Date();
    }
  }
});

export const { updateMonth, updateCurrDate } = calenderSlice.actions;
export default calenderSlice.reducer;
