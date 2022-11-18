import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { useRouter } from "next/router";
import { HStack, IconButton } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { format, isSameMonth, addMonths, subMonths } from "date-fns";
import findValidDateRange from "../../../lib/findValidDateRange";
import DatePicker from "./DatePicker";

interface CalenderNavProps {
  isLoading: boolean;
  title: string;
}

/**
 * @param {boolean} isLoading is the component loading?
 * @param {string} title the title for the current date.
 */

const CalenderNav = ({ title, isLoading }: CalenderNavProps): JSX.Element => {
  const selectedDate = useAppSelector(
    (state) => state.calender.selectedDateInfo
  );
  const { date } = selectedDate;

  const selectedDateObj = new Date(date);

  const validDateRange = findValidDateRange();
  const { start: validStart, end: validEnd } = validDateRange;

  const router = useRouter();

  const handleNavButtons = (direction: "next" | "prev") => {
    if (direction === "next") {
      const newMonth = addMonths(selectedDateObj, 1);

      const year = format(newMonth, "y");
      const month = format(newMonth, "L");

      router.push(`/calendar/${year}/${month}`);
    } else if (direction === "prev") {
      const newMonth = subMonths(selectedDateObj, 1);

      const year = format(newMonth, "y");
      const month = format(newMonth, "L");

      router.push(`/calendar/${year}/${month}`);
    }
  };

  return (
    <HStack spacing={10} as="nav" w="auto" h="10vh" textAlign="center">
      <IconButton
        isDisabled={isSameMonth(selectedDateObj, validStart)}
        aria-label="Previous Month"
        icon={<Icon icon="akar-icons:chevron-left" />}
        onClick={() => handleNavButtons("prev")}
      />
      <DatePicker isLoading={isLoading} title={title} />
      <IconButton
        isDisabled={isSameMonth(selectedDateObj, validEnd)}
        aria-label="Next Month"
        icon={<Icon icon="akar-icons:chevron-right" />}
        onClick={() => handleNavButtons("next")}
      />
    </HStack>
  );
};

export default CalenderNav;
