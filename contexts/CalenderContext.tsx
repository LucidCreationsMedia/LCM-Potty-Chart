import React, { createContext, useState, ReactNode } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  getDate,
  add,
  sub,
  set,
  isAfter,
  isBefore,
  compareAsc
} from "date-fns";

const CalenderContext = createContext({} as CalenderContextState);

const CalenderContextProvider = ({
  children
}: {
  children: ReactNode;
}): JSX.Element => {
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
   */
  const populateMonth = (selectedDate: Date): MonthLayout => {
    const endLastMonth = getDate(endOfMonth(sub(selectedDate, { months: 1 })));
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

    const sunStartDay =
      endLastMonth - (ISOToIndex.sunday[startOfSelectedMonth] - 1);

    let sunCurrDate = set(sub(selectedDate, { months: 1 }), {
      date: sunStartDay
    });

    for (const week in sundays) {
      const thisWeek = sundays[week];

      thisWeek.forEach((e, i) => {
        const overflowInfo = isOverflow(selectedDate, sunCurrDate);

        const day: MonthDay = {
          ...overflowInfo,
          date: sunCurrDate
        };

        sunCurrDate = add(sunCurrDate, {
          days: 1
        });

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

    const monStartDay = endLastMonth - ISOToIndex.monday[startOfSelectedMonth];

    let monCurrDate = set(sub(selectedDate, { months: 1 }), {
      date: monStartDay
    });

    for (const week in mondays) {
      const thisWeek = mondays[week];

      thisWeek.forEach((e, i) => {
        const overflowInfo = isOverflow(selectedDate, monCurrDate);

        const day: MonthDay = {
          ...overflowInfo,
          date: monCurrDate
        };

        monCurrDate = add(monCurrDate, {
          days: 1
        });

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

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDateInfo, setSelectedMonthInfo] = useState<MonthContext>({
    date: selectedDate,
    title: format(selectedDate, "LLLL uuuu"),
    layout: populateMonth(selectedDate)
  });

  /**
   * Updates the selectedDateInfo state when given a date.
   * @param {Date} newDate The date to set the selectedDateInfo state to.
   */
  const updateDateInfo = (newDate: Date) => {
    const output = { ...selectedDateInfo };
    output.date = newDate;
    output.title = format(newDate, "LLLL uuuu");
    output.layout = populateMonth(newDate);

    setSelectedMonthInfo(output);
  };

  // TODO: Add a function that validated if a date has at least one sticker in it. Use that within the nav function (when filter is enabled).

  // TODO: Add a function that will give the closest date, if available, when the nav func detects an empty month.
  // Use the chart creation date to aid with this. (When filter is enabled)

  /**
   * TODO: Add logic that prevents navigation to the future and too far in the past. (Use chart creation date)
   * Update to use a promise and return appropriate errors. Display those errors on the front end.
   * Update the use of this function on the front to handle the fails of the promise.
   */

  // TODO: (When filter is enabled) Update the calender update function that will take in a direction so that the the navigation buttons will take the user to the next month with stickers. Assuming there was a gap with empty months.

  /**
   * Updated the selectedDate state when given the appropriate object.
   * @param {UpdateCalendarProps} input An object with year, month,
   * and day keys that the selectedDate state will be updated to.
   */
  const updateDate = (input: UpdateCalendarProps) => {
    const { year, month: inputMonth, day } = input;

    if (!year || !inputMonth || day < 0 || day > 31) {
      return false;
    } else {
      const month = inputMonth - 1;
      const customDate: Date = new Date(year, month, day);

      if (compareAsc(customDate, selectedDate) !== 0) {
        setSelectedDate(customDate);
        updateDateInfo(customDate);
      }
    }
  };

    // * Attempting to fix an issue with static generation where the date does not appear to be updating after initial generation.
    const [currDate, setCurrDate] = useState<Date>(new Date);

  const calenderContextValues: CalenderContextState = {
    currDate,
    setCurrDate,
    selectedDate,
    title: selectedDateInfo.title,
    layout: selectedDateInfo.layout,
    updateDate
  };

  return (
    <CalenderContext.Provider value={calenderContextValues}>
      {children}
    </CalenderContext.Provider>
  );
};

export { CalenderContextProvider, CalenderContext };
