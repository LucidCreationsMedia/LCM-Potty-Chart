import React, { useContext } from "react";
import { useRouter } from "next/router";
import { HStack, IconButton } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { format, isSameMonth, addMonths, subMonths } from "date-fns";
import findValidDateRange from "../../../lib/findValidDateRange";
import DatePicker from "./DatePicker";
import { CalenderContext } from "../../../contexts/CalenderContext";

const CalenderNav = (): JSX.Element => {
  const { selectedDate } = useContext(CalenderContext);

  const validDateRange = findValidDateRange();
  const { start: validStart, end: validEnd } = validDateRange;

  const router = useRouter();

  const handleNavButtons = (direction: "next" | "prev") => {
    if (direction === "next") {
      const newMonth = addMonths(selectedDate, 1);

      const year = format(newMonth, "y");
      const month = format(newMonth, "L");

      router.push(`/calendar/${year}/${month}`);
    } else if (direction === "prev") {
      const newMonth = subMonths(selectedDate, 1);

      const year = format(newMonth, "y");
      const month = format(newMonth, "L");

      router.push(`/calendar/${year}/${month}`);
    }
  };

  return (
    <HStack spacing={10} as="nav" w="auto" h="10vh" textAlign="center">
      <IconButton
        isDisabled={isSameMonth(selectedDate, validStart)}
        aria-label="Previous Month"
        icon={<Icon icon="akar-icons:chevron-left" />}
        onClick={() => handleNavButtons("prev")}
      />
      <DatePicker />
      <IconButton
        isDisabled={isSameMonth(selectedDate, validEnd)}
        aria-label="Next Month"
        icon={<Icon icon="akar-icons:chevron-right" />}
        onClick={() => handleNavButtons("next")}
      />
    </HStack>
  );
};

export default CalenderNav;