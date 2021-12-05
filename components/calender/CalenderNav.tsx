import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Heading, HStack, IconButton } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { sub, add, format } from "date-fns";
import { CalenderContext } from "../../contexts/CalenderContext";

const CalenderNav = (): JSX.Element => {
  const { selectedDate } = useContext(CalenderContext);

  const currentMonth = format(selectedDate, "LLLL uuuu");

  const router = useRouter();

  const handleNavButtons = (direction: "next" | "prev") => {
    if (direction === "next") {
      const newMonth = add(selectedDate, {
        months: 1,
      });

      const year = format(newMonth, "y");
      const month = format(newMonth, "L");

      router.push(`/calendar/${year}/${month}`);
    } else if (direction === "prev") {
      const newMonth = sub(selectedDate, {
        months: 1,
      });

      const year = format(newMonth, "y");
      const month = format(newMonth, "L");

      router.push(`/calendar/${year}/${month}`);
    }
  }

  return (
    <HStack spacing={10} as="nav" w="auto" h="10vh" textAlign="center">
      <IconButton
        aria-label="Previous Month"
        icon={<Icon icon="akar-icons:chevron-left" />}
        onClick={() => handleNavButtons("prev")}
      />
      <Heading
        w="100%"
        h="auto"
        _hover={{
          cursor: "default",
        }}
      >
        {currentMonth}
      </Heading>
      <IconButton
        aria-label="Next Month"
        icon={<Icon icon="akar-icons:chevron-right" />}
        onClick={() => handleNavButtons("next")}

      />
    </HStack>
  );
};

export default CalenderNav;
