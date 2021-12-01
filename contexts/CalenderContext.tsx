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
  selectedMonth: Date;
  daysOfMonth: [number];
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
  const [endOfSelectedMonth, SetEndOfSelectedDMonth] = useState<number>(
    getDate(endOfMonth(selectedMonth))
  );

  const [daysOfMonth, setDaysOfMonth] = useState<[number]>([0]);

  // Update or populate the days of the month.
  const populateDays = (): void => {
    let newDaysOfMonth: [number] = [...daysOfMonth];

    if (newDaysOfMonth.length > 1) {
      newDaysOfMonth = [0];
    }

    for (let i = 1; i < endOfSelectedMonth; i++) {
      if (newDaysOfMonth[i - 1] === 0) {
        newDaysOfMonth[i - 1] = i;
      } else {
        newDaysOfMonth.push(i + 1);
      }
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
  }, [selectedMonth, endOfSelectedMonth]);

  // Update end of month.
  useEffect(() => {
    if (endOfSelectedMonth !== getDate(endOfMonth(selectedMonth))) {
      SetEndOfSelectedDMonth(getDate(endOfMonth(selectedMonth)));
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
    const newMonth = sub(selectedMonth, {
      months: 1,
    });

    setSelectedMonth(newMonth);
  };

  const nextMonth = (): void => {
    const newMonth = add(selectedMonth, {
      months: 1,
    });

    setSelectedMonth(newMonth);
  };

  const calenderContextValues = {
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
