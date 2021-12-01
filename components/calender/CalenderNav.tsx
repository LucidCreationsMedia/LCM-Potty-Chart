import React, { useContext } from "react";
import { Heading, HStack, IconButton } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { CalenderContext } from "../../contexts/CalenderContext";

const CalenderNav = (): JSX.Element => {
  const { selectedMonth, prevMonth, nextMonth } = useContext(CalenderContext);

  const currentMonth = format(selectedMonth, "LLLL uuuu");

  return (
    <HStack spacing={10} as="nav" w="auto" h="10vh" textAlign="center">
      <IconButton
        aria-label="Previous Month"
        icon={<Icon icon="akar-icons:chevron-left" />}
        onClick={() => prevMonth()}
      />
      <Heading w="100%" h="auto">
        {currentMonth}
      </Heading>
      <IconButton
        aria-label="Next Month"
        icon={<Icon icon="akar-icons:chevron-right" />}
        onClick={() => nextMonth()}
      />
    </HStack>
  );
};

export default CalenderNav;
