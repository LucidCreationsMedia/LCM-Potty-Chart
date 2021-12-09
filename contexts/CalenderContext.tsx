import React, { createContext, useState, ReactNode, useEffect } from "react";
import { endOfMonth, getDate, sub, add, compareAsc } from "date-fns";
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
  // Selected month & year
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [endOfSelectedMonth, SetEndOfSelectedDMonth] = useState<number>(
    getDate(endOfMonth(selectedDate))
  );

  const [daysOfMonth, setDaysOfMonth] = useState<[number]>([1]);

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
