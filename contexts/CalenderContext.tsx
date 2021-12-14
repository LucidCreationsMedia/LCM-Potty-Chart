import React, { createContext, useState, ReactNode, useEffect } from "react";
import { endOfMonth, getDate, sub, compareAsc } from "date-fns";
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
  year: number;
  month: number;
  day: number;
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
  layout: Calendar;
  startWeekday: string;
  endWeekday: string;
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
  daysOfMonth: [number];
  daysOfWeek: DaysOfWeek;
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
  // Update this to have the day of week and the last numerical day.
  const [endOfSelectedMonth, SetEndOfSelectedDMonth] = useState<number>(
    getDate(endOfMonth(selectedDate))
  );
  // Update this to have the day of week and the last numerical day.
  const [endOfPrevMonth, setEndOfPrevMonth] = useState<number>(
    getDate(endOfMonth(sub(selectedDate, { months: 1 })))
  );
  // Add start of selected month and start of next month, including day of week and numerical day.

  // TODO: Remove this state and all referenced to it once the date alignment algorithm is complete.
  const [daysOfMonth, setDaysOfMonth] = useState<[number]>([1]);

  // TODO: Repalce this with the new date alignment algorithm.
  // Update or populate the days of the month.
  const populateDays = (): void => {
    let newDaysOfMonth: [number] = [...daysOfMonth];

    if (newDaysOfMonth.length > 1) {
      newDaysOfMonth = [1];
    }

    for (let i = 1; i < endOfSelectedMonth; i++) {
      newDaysOfMonth.push(i + 1);
    }

    setDaysOfMonth(newDaysOfMonth);
  };

  // TODO: Update new referenced once they are added.
  // Update selected month sates when the selected month is updated.

  // Update days of month.
  useEffect(() => {
    if (daysOfMonth === null) {
      populateDays();
    } else {
      if (daysOfMonth[daysOfMonth.length - 1] !== endOfSelectedMonth) {
        populateDays();
      }
    }
  }, [selectedDate, endOfSelectedMonth]);

  // Update end of month.
  useEffect(() => {
    if (endOfSelectedMonth !== getDate(endOfMonth(selectedDate))) {
      SetEndOfSelectedDMonth(getDate(endOfMonth(selectedDate)));
    }
  }, [selectedDate]);

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

  //TODO: Create an object of arrays that will align with the days on the week. Make two sets for each start of the week setting.

  // Navigation
  const setDate = (input: UpdateCalendarProps): boolean => {
    const { year, month: inputMonth, day } = input;

    if (!year || !inputMonth || day < 0 || day > 31) {
      return false;
    } else {
      const month = inputMonth - 1;
      const customDate: Date = new Date(year, month, day);

      if (compareAsc(customDate, selectedDate) !== 0) {
        setSelectedDate(customDate);
      }
    }
  };

  const calenderContextValues = {
    selectedDate,
    daysOfMonth,
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
