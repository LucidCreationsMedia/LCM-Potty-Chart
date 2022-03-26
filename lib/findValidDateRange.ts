import { startOfMonth, endOfMonth } from "date-fns";

interface ValidDateRange {
  start: Date;
  end: Date;
}

const validDateRange = (): ValidDateRange => {
  const currDate = new Date(); // Current date.
  const startDate = startOfMonth(currDate); // Will eventually be the creation date of the account or the creation date of the oldest chart within the account. Whichever is older.
  const endDate = endOfMonth(currDate); // Always needs to be the last day on the current month within the current year.

  return {
    start: startDate,
    end: endDate
  };
};

export default validDateRange;
