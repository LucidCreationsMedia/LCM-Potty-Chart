import React, { createContext, useState, ReactNode } from "react";
import { format, endOfMonth, getDate, compareAsc } from "date-fns";
// TODO: import types

type days =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

interface DaysOfWeek {
  startOfWeek: {
    Sunday: days[];
    Monday: days[];
  };
}

interface UpdateCalendarProps {
  direction: "next" | "prev";
  date: Date;
}

interface Month {
  week1: Date[];
  week2: Date[];
  week3: Date[];
  week4: Date[];
  week5: Date[];
  week6: Date[];
}

interface Calendar {
  startOfWeek: {
    Sunday: Month;
    Monday: Month;
  };
}

// Will replace all states and be used in redis as a form of memoization.
interface MonthInfo {
  date: Date;
  title: string;
  layout: Calendar;
  startWeekday: number;
  endWeekday: number;
  days: number;
}

interface CurrentMonth {
  prev: MonthInfo;
  curr: MonthInfo;
  next: MonthInfo;
}

interface CalenderMemoize {
  String: CurrentMonth;
}

interface CalenderContextState {
  selectedDate: Date;
  monthInfo: MonthInfo;
  setDate: (date: UpdateCalendarProps) => boolean;
}

const CalenderContext = createContext({} as CalenderContextState);

const CalenderContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const indexToDay = {
    startOfWeek: {
      Sunday: {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
      },
      Monday: {
        0: "Monday",
        1: "Tuesday",
        2: "Wednesday",
        3: "Thursday",
        4: "Friday",
        5: "Saturday",
        6: "Sunday",
      },
    },
  };

  // Selected month & year
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  // All the info for the current month
  const [monthInfo, setMonthInfo] = useState<MonthInfo>({
    date: new Date(),
    title: format(selectedDate, "LLLL uuuu"),
    layout: {} as Calendar,
    startWeekday: 1,
    endWeekday: 2,
    days: getDate(endOfMonth(selectedDate))
  })

  // TODO: Repalce this with the new date alignment algorithm. That adds the date weeks obj to the layout key in the monthInfo context.
  // Update or populate the days of the month.
  const populateDays = (): void => {
    // let newDaysOfMonth: [number] = [...daysOfMonth];

    // if (newDaysOfMonth.length > 1) {
    //   newDaysOfMonth = [1];
    // }

    // for (let i = 1; i < endOfSelectedMonth; i++) {
    //   newDaysOfMonth.push(i + 1);
    // }

    // setDaysOfMonth(newDaysOfMonth);
  };

  // Calender Layout
  const daysOfWeek: DaysOfWeek = {
    startOfWeek: {
      Sunday: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      Monday: [
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

  //TODO: Update nav to switch between the prev and next date or take in a custom date.

  // Navigation
  const setDate = (input: UpdateCalendarProps): boolean => {
    // const { year, month: inputMonth, day } = input;

    // if (!year || !inputMonth || day < 0 || day > 31) {
    //   return false;
    // } else {
    //   const month = inputMonth - 1;
    //   const customDate: Date = new Date(year, month, day);

    //   if (compareAsc(customDate, selectedDate) !== 0) {
    //     setSelectedDate(customDate);
    //   }
    // }
  };

  //TODO: Add some functions that will update the MonthInfo state when the month changes. Each function should take care of each key in the context.

  const calenderContextValues = {
    selectedDate,
    monthInfo,
    daysOfWeek,
    setDate,
  };

  return (
    <CalenderContext.Provider value={calenderContextValues}>
      {children}
    </CalenderContext.Provider>
  );
};

export { CalenderContextProvider, CalenderContext };
