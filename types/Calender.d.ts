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
  date: string;
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

interface WeekLayout {
  weekdays: DaysOfWeek;
  month: Month;
}

interface MonthLayout {
  sunday: WeekLayout;
  monday: WeekLayout;
}

interface UpdateCalenderPropsDateLayout {
  year: number;
  month: number;
  day: number;
}
interface UpdateCalendarProps {
  date: UpdateCalenderPropsDateLayout;
  isLoading: boolean;
}

interface SelectedDateInfo {
  date: string;
  title: string;
  layout: MonthLayout;
}
