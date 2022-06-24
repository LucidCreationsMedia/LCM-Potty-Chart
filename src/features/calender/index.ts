import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format } from "date-fns";
import populate from "../../../lib/populateMonth";

interface CalenderSlice {
  currDate: string;
  selectedDateInfo: SelectedDateInfo;
  isLoading: boolean;
}

const getCurrDate = (): Date => new Date();
const dateParse = (date: Date) => date.toJSON();
const dateFormatter = (date: Date): string => format(date, "LLLL uuuu");

const initialState: CalenderSlice = {
  currDate: dateParse(getCurrDate()),
  selectedDateInfo: {
    date: dateParse(getCurrDate()),
    title: dateFormatter(getCurrDate()),
    layout: populate(getCurrDate())
  },
  isLoading: true
};

// TODO: Add a function that validated if a month has at least one sticker in it. Use that within the nav function (when filter is enabled).

// TODO: Add a function that will give the closest date, if available, when the nav func detects an empty month.
// Use the chart creation date to aid with this. (When filter is enabled)

/**
 * TODO: Add logic that prevents navigation to the future and too far in the past. (Use chart creation date)
 * Update to use a promise and return appropriate errors. Display those errors on the front end.
 * Update the use of this function on the front to handle the fails of the promise.
 */

// TODO: (When filter is enabled) Update the calender update function that will take in a direction so that the the navigation buttons will take the user to the next month with stickers. Assuming there was a gap with empty months.

const calenderSlice = createSlice({
  name: "Calender",
  initialState,
  reducers: {
    // Update month info
    updateMonth(state: CalenderSlice, action: PayloadAction<string>) {
      const { payload } = action;

      const toDateObj: Date = new Date(payload);

      state.selectedDateInfo.date = payload;
      state.selectedDateInfo.title = dateFormatter(toDateObj);
      state.selectedDateInfo.layout = populate(toDateObj);
    },
    // Update current date
    updateCurrDate(state: CalenderSlice) {
      state.currDate = dateParse(new Date());
    },
    // Update isLoading
    updateLoading(state: CalenderSlice, action: PayloadAction<boolean>) {
      const { payload } = action;
      state.isLoading = payload;
    }
  }
});

export const { updateMonth, updateCurrDate, updateLoading } =
  calenderSlice.actions;
export default calenderSlice.reducer;
