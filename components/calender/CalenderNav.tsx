import React, { useContext } from "react";
import { useRouter } from "next/router";
import { HStack, IconButton } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { sub, add, format, isSameMonth } from "date-fns";
import DatePicker from "./DatePicker";
import { CalenderContext } from "../../contexts/CalenderContext";

const CalenderNav = (): JSX.Element => {
  const { selectedDate, validDateRange } = useContext(CalenderContext);
  const { start: validStart, end: validEnd } = validDateRange;

  const router = useRouter();

  const handleNavButtons = (direction: "next" | "prev") => {
    if (direction === "next") {
      const newMonth = add(selectedDate, {
        months: 1
      });

      const year = format(newMonth, "y");
      const month = format(newMonth, "L");

      router.push(`/calendar/${year}/${month}`);
    } else if (direction === "prev") {
      const newMonth = sub(selectedDate, {
        months: 1
      });

      const year = format(newMonth, "y");
      const month = format(newMonth, "L");

      router.push(`/calendar/${year}/${month}`);
    }
  };

  /**
   * TODO: Add logic to remove the nav buttons.
   * Do not show next button for current month.
   * Do not show prev when there is nothing left to see in the past.
   * (Creation date of a chart)
   */

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
