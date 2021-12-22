import React, { createContext, useState, ReactNode } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  getDate,
  sub,
  compareAsc,
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
  startOfWeek: {
    sunday: DaysOfWeek;
    monday: DaysOfWeek;
  };
}

interface Month {
  week1: Date[];
  week2: Date[];
  week3: Date[];
  week4: Date[];
  week5: Date[];
  week6: Date[];
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
    days: number;
  };
}

interface MonthContext extends MonthInfo {
  startOfWeek: {
    sunday: {
      layout: DaysOfWeek;
      month: Month;
    };
    monday: {
      layout: DaysOfWeek;
      month: Month;
    };
  };
}

interface CalenderContextState {
  selectedMonth: MonthContext;
}

const NewCalenderContext = createContext({} as CalenderContextState);

const NewCalenderContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const weekDays: WeekDays = {
    startOfWeek: {
      sunday: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      monday: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
  };

  const ISOToIndex = {
    startOfWeek: {
      sunday: {
        Sun: 0,
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6,
      },
      monday: {
        Mon: 0,
        Tue: 1,
        Wed: 2,
        Thu: 3,
        Fri: 4,
        Sat: 5,
        Sun: 6,
      },
    },
  };

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
      endDay: getDate(endOfMonth(prevMonth)),
      days: getDate(endOfMonth(prevMonth)),
    },
    startOfWeek: {
      sunday: {
        layout: weekDays.startOfWeek.sunday,
        month: {} as Month,
      },
      monday: {
        layout: weekDays.startOfWeek.monday,
        month: {} as Month,
      },
    },
  });

  //TODO: Add a function that will populate the "MONTH" layout for the context. It should take in the start of the week (Sunday, Monday) and output the appropriate layout based on that preference.

  //TODO: Update the MonthInfo to use the new month population function on first render.

  //TODO: Add a new navigation function that will take in either a direction (next, prev) or a date to go directly to. That will update the selected month and trigger the use effects below.

  //TODO: Add a function that will update the MonthInfo state when the selected month changes. This should use the populate month function that will be made above.

  //TODO: Add a useEffect that will trigger the update function(s) to run when the selected date is updated.

  const calenderContextValues = {
    selectedMonthInfo,
  };

  return (
    <NewCalenderContext.Provider value={calenderContextValues}>
      {children}
    </NewCalenderContext.Provider>
  );
};

export { NewCalenderContextProvider, NewCalenderContext };
