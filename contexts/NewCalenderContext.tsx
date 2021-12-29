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
  isBefore
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
  startDay: string;
  endDay: string;
  days: number;
  prevMonth: {
    date: Date;
    endDay: number;
  };
}

interface MonthLayout {
  sunday: {
    layout: DaysOfWeek;
    month: Month;
  };
  monday: {
    layout: DaysOfWeek;
    month: Month;
  };
}

interface MonthContext extends MonthInfo {
  layout: MonthLayout;
}

interface CalenderContextState {
  selectedMonth: MonthContext;
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

  // Checks if the date is before or after the current month.
  const isOverflow = (selectedDate: Date, currDate: Date): boolean => {
    let flag = false;
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);

    if (isBefore(currDate, start) || isAfter(currDate, end)) {
      flag = true;
    }

    return flag;
  };

  // Populates the month.
  const populateMonth = (
    selectedDate: Date,
    startOfMonth: string,
    prevMonth: {
      endDay: number;
    }
  ): MonthLayout => {
    const { endDay: endLastMonth } = prevMonth;

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

    const sunStartDay = endLastMonth - (ISOToIndex.sunday[startOfMonth] - 1);

    let sunCurrDate = set(sub(selectedDate, { months: 1 }), {
      date: sunStartDay
    });

    for (let week in sundays) {
      const thisWeek = sundays[week];

      thisWeek.forEach((e, i, a) => {
        const day: MonthDay= {
          isOverflow: isOverflow(selectedDate, sunCurrDate),
          date: sunCurrDate
        };
        sunCurrDate = add(sunCurrDate, { days: 1 });

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

    const monStartDay = endLastMonth - ISOToIndex.monday[startOfMonth];

    let monCurrDate = set(sub(selectedDate, { months: 1 }), {
      date: monStartDay
    });

    for (let week in mondays) {
      const thisWeek = mondays[week];

      thisWeek.forEach((e, i, a) => {
        const day: MonthDay = {
          isOverflow: isOverflow(selectedDate, monCurrDate),
          date: monCurrDate
        };
        monCurrDate = add(monCurrDate, { days: 1 });

        mondays[week][i] = day;
      });
    }

    const output = {
      sunday: {
        layout: weekDays.sunday,
        month: sundays
      },
      monday: {
        layout: weekDays.monday,
        month: mondays
      }
    };

    return output;
  };

  //TODO: Add output typing and move the invocation into the monthInfo state, removing any unended info from the state.

  // populateMonth(
  //   selectedDate,
  //   format(startOfMonth(selectedDate), "iii"),
  //   selectedMonthInfo.prevMonth
  // );

  const [selectedDate, setSelectedMonth] = useState<Date>(new Date());
  const [prevMonth, setPrevMonth] = useState<Date>(
    sub(selectedDate, { months: 1 })
  );
  const [selectedMonthInfo, setSelectedMonthInfo] = useState<MonthContext>({
    date: selectedDate,
    title: format(selectedDate, "LLLL uuuu"),
    startDay: format(startOfMonth(selectedDate), "iii"), // TODO: Update to use the ISOToIndex dynamically with the user's start day preferences.
    endDay: format(endOfMonth(selectedDate), "iii"), // TODO: Update to use the ISOToIndex dynamically with the user's start day preferences.
    days: getDate(endOfMonth(selectedDate)),
    prevMonth: {
      date: prevMonth,
      endDay: getDate(endOfMonth(prevMonth))
    },
    layout: populateMonth(
      selectedDate,
      format(startOfMonth(selectedDate), "iii"),
      {
        endDay: getDate(endOfMonth(prevMonth))
      }
    )
  });

  //TODO: Update the MonthInfo to use the new month population function on first render.

  //TODO: Add a new navigation function that will take in either a direction (next, prev) or a date to go directly to. That will update the selected month and trigger the use effects below.

  //TODO: Add a function that will update the MonthInfo state when the selected month changes. This should use the populate month function that will be made above.

  //TODO: Add a useEffect that will trigger the update function(s) to run when the selected date is updated.

  const calenderContextValues = {
    selectedMonthInfo
  };

  return (
    <NewCalenderContext.Provider value={calenderContextValues}>
      {children}
    </NewCalenderContext.Provider>
  );
};

export { NewCalenderContextProvider, NewCalenderContext };
