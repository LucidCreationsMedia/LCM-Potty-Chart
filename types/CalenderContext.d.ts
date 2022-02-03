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
  date: Date;
  isOverflow: boolean;
  overflowDirection: "prev" | "next" | null;
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
