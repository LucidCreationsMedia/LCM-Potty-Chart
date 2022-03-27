import { startOfMonth, endOfMonth } from "date-fns";

interface ValidDateRange {
  start: Date;
  end: Date;
}

/**
 * A function that will determine the valid date range for the navigation of the charts.
 * @returns An object with a start and end key with the given date for the start and end of the range.
 */
const findValidDateRange = (): ValidDateRange => {
  const currDate = new Date(); // Current date.
  const startDate = startOfMonth(currDate); // Will eventually be the creation date of the account or the creation date the selected chart. Whichever is older.
  const endDate = endOfMonth(currDate); // Always needs to be the last day on the current month within the current year.

  return {
    start: startDate,
    end: endDate
  };
};

export default findValidDateRange;
