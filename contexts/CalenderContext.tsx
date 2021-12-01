import React, { createContext, useState, ReactNode, useEffect } from "react";
import { endOfMonth, getDate, sub, add } from "date-fns";
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

interface CalenderContextState {
  today: Date;
  selectedMonth: Date;
  daysOfMonth: [number] | [null];
  daysOfWeek: DaysOfWeek;
  prevMonth: () => void;
  nextMonth: () => void;
}

const CalenderContext = createContext({} as CalenderContextState);

const CalenderContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  // Today's date
  const [today] = useState<Date>(new Date());

  // Selected month & year
  const [selectedMonth, setSelectedMonth] = useState<Date>(today);
  const [endOfSelectedMonth, SetEndOfSelectedDMonth] = useState<Date>(
    endOfMonth(selectedMonth)
  );
  const [lastDayOfSelectedMonth, setLastDayOfSelectedMonth] = useState<number>(
    getDate(endOfSelectedMonth)
  );

  const [daysOfMonth, setDaysOfMonth] = useState<[number] | [null]>([null]);

  // Populate days of the month and update them when the month changes.
  useEffect(() => {
    if (
      lastDayOfSelectedMonth !== daysOfMonth[daysOfMonth.length - 1] ||
      daysOfMonth === null
    ) {
      const newDaysOfMonth: [number] = [0];
      for (let i = daysOfMonth.length; i < lastDayOfSelectedMonth; i++) {
        if (newDaysOfMonth.length === 1) {
          newDaysOfMonth[0] = 1;
        }

        newDaysOfMonth.push(newDaysOfMonth.length + 1);
      }

      setDaysOfMonth(newDaysOfMonth);
    }
  }, [selectedMonth, lastDayOfCurrMonth]);

  // Update selected month sates when the selected month is updated.
  useEffect(() => {
    if (endOfSelectedMonth !== endOfMonth(selectedMonth)) {
      SetEndOfSelectedDMonth(endOfMonth(selectedMonth));
    }

    if (lastDayOfSelectedMonth !== getDate(endOfSelectedMonth)) {
      setLastDayOfSelectedMonth(getDate(endOfSelectedMonth));
    }
  }, [selectedMonth]);

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
  const prevMonth = (): void => {
    const newMonth = sub(today, {
      years: 1,
    });

    setSelectedMonth(newMonth);
  };

  const nextMonth = (): void => {
    const newMonth = add(today, {
      years: 1,
    });

    setSelectedMonth(newMonth);
  };

  const calenderContextValues = {
    today,
    selectedMonth,
    daysOfMonth,
    daysOfWeek,
    prevMonth,
    nextMonth,
  };

  return (
    <CalenderContext.Provider value={calenderContextValues}>
      {children}
    </CalenderContext.Provider>
  );
};

export { CalenderContextProvider, CalenderContext };
