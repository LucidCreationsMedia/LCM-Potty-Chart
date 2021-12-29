import React, { createContext, useState, ReactNode } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  getDate,
  getMonth,
  getYear,
  add,
  sub,
  set,
  isAfter,
  isBefore,
  compareAsc
} from "date-fns";
// TODO: import types

type Days =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

type DaysOfWeek = Days[];

interface WeekDays {
  sunday: DaysOfWeek;
  monday: DaysOfWeek;
}

interface MonthDay {
  isOverflow: boolean;
  date: Date;
}

interface Month {
  week1: MonthDay[];
  week2: MonthDay[];
  week3: MonthDay[];
  week4: MonthDay[];
  week5: MonthDay[];
  week6: MonthDay[];
}

interface MonthInfo {
  date: Date;
  title: string;
}

interface MonthLayout {
  sunday: {
    weekdays: DaysOfWeek;
    month: Month;
  };
  monday: {
    weekdays: DaysOfWeek;
    month: Month;
  };
}

interface MonthContext extends MonthInfo {
  layout: MonthLayout;
}

interface UpdateCalendarProps {
  year: number;
  month: number;
  day: number;
}

interface CalenderContextState {
  selectedDate: Date;
  title: string;
  layout: MonthLayout;
  updateDate: (input: UpdateCalendarProps) => void;
}

const NewCalenderContext = createContext({} as CalenderContextState);

const NewCalenderContextProvider = ({
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

  //TODO Add a function that will populate the "MONTH" layout for the context. It should take in the start of the week (Sunday, Monday) and output the appropriate layout based on that preference.

  /**
   * Using date-fns, this function checks if currDate is within the month of selectedDate or not.
   * @param {Date} selectedDate The current month.
   * @param {Date} currDate The date to be compared to the selected month.
   * @returns True if currDate is outside of the month of selectedDate, false if otherwise.
   */
  const isOverflow = (selectedDate: Date, currDate: Date): boolean => {
    let flag = false;
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);

    if (isBefore(currDate, start) || isAfter(currDate, end)) {
      flag = true;
    }

    return flag;
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
        const day: MonthDay = {
          isOverflow: isOverflow(selectedDate, sunCurrDate),
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
        const day: MonthDay = {
          isOverflow: isOverflow(selectedDate, monCurrDate),
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

  //TODO Update the MonthInfo to use the new month population function on first render.

  //TODO Add a function that will update the MonthInfo state when the selected month changes. This should use the populate month function that will be made above.
  const updateDateInfo = (newDate: Date) => {
    const output = { ...selectedDateInfo };
    output.date = newDate;
    output.title = format(newDate, "LLLL uuuu");
    output.layout = populateMonth(newDate);

    setSelectedMonthInfo(output);
  };

  //TODO: Add a new navigation function that will take in either a direction (next, prev) or a date to go directly to. That will update the selected month and trigger the use effects below.
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

  const calenderContextValues = {
    selectedDate,
    title: selectedDateInfo.title,
    layout: selectedDateInfo.layout,
    updateDate
  };

  return (
    <NewCalenderContext.Provider value={calenderContextValues}>
      {children}
    </NewCalenderContext.Provider>
  );
};

export { NewCalenderContextProvider, NewCalenderContext };
