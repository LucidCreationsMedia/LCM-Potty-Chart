import {
  getDate,
  endOfMonth,
  format,
  startOfMonth,
  set,
  isAfter,
  isBefore,
  subMonths,
  addDays
} from "date-fns";

const weekDays: WeekDays = {
  sunday: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  monday: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ]
};

/**
 * Using date-fns, this function checks if currDate is within the month of selectedDate or not.
 * @param {Date} selectedDate The current month.
 * @param {Date} currDate The date to be compared to the selected month.
 * @returns True if currDate is outside of the month of selectedDate, false if otherwise.
 */
const isOverflow = (
  selectedDate: Date,
  currDate: Date
): {
  isOverflow: boolean;
  overflowDirection: "prev" | "next" | null;
} => {
  let flag = false;
  let direction: "next" | "prev" | null = null;

  const start = startOfMonth(selectedDate);
  const end = endOfMonth(selectedDate);

  if (isBefore(currDate, start)) {
    flag = true;
    direction = "prev";
  }

  if (isAfter(currDate, end)) {
    flag = true;
    direction = "next";
  }

  return { isOverflow: flag, overflowDirection: direction };
};

/**
 * A function that will return a month layout when given a date. It produces
 * an object with 6 weeks that include overflow from the previous and next month
 * with all dates aligned with the day of the week.
 * @param selectedDate The date of the month to generate a month layout for.
 * @returns The month layout object for the provided month.
 */
const populateMonth = (selectedDate: Date): MonthLayout => {
  const endLastMonth = getDate(endOfMonth(subMonths(selectedDate, 1)));
  const startOfSelectedMonth = format(startOfMonth(selectedDate), "iii");

  const ISOToIndex = {
    sunday: {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6
    },
    monday: {
      Mon: -1,
      Tue: 0,
      Wed: 1,
      Thu: 2,
      Fri: 3,
      Sat: 4,
      Sun: 5
    }
  };

  const sundays = {
    week1: new Array(7).fill(null),
    week2: new Array(7).fill(null),
    week3: new Array(7).fill(null),
    week4: new Array(7).fill(null),
    week5: new Array(7).fill(null),
    week6: new Array(7).fill(null)
  };

  // The date of the first day in the overflow
  const sunStartDay =
    endLastMonth - (ISOToIndex.sunday[startOfSelectedMonth] - 1);

  let sunCurrDate = set(subMonths(selectedDate, 1), {
    date: sunStartDay
  });

  for (const week in sundays) {
    const thisWeek = sundays[week];

    thisWeek.forEach((e, i) => {
      const overflowInfo = isOverflow(selectedDate, sunCurrDate);

      const day: MonthDay = {
        ...overflowInfo,
        date: sunCurrDate.toJSON()
      };

      sunCurrDate = addDays(sunCurrDate, 1);

      sundays[week][i] = day;
    });
  }

  const mondays = {
    week1: new Array(7).fill(null),
    week2: new Array(7).fill(null),
    week3: new Array(7).fill(null),
    week4: new Array(7).fill(null),
    week5: new Array(7).fill(null),
    week6: new Array(7).fill(null)
  };

  // The date of the first day in the overflow
  const monStartDay = endLastMonth - ISOToIndex.monday[startOfSelectedMonth];

  let monCurrDate = set(subMonths(selectedDate, 1), {
    date: monStartDay
  });

  for (const week in mondays) {
    const thisWeek = mondays[week];

    thisWeek.forEach((e, i) => {
      const overflowInfo = isOverflow(selectedDate, monCurrDate);

      const day: MonthDay = {
        ...overflowInfo,
        date: monCurrDate.toJSON()
      };

      monCurrDate = addDays(monCurrDate, 1);

      mondays[week][i] = day;
    });
  }

  const output = {
    sunday: {
      weekdays: weekDays.sunday,
      month: sundays
    },
    monday: {
      weekdays: weekDays.monday,
      month: mondays
    }
  };

  return output;
};

export default populateMonth;
