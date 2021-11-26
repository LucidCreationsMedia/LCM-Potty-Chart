import React from "react";
import { Heading, HStack, IconButton } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { format } from "date-fns/esm";

const CalenderNav = (): JSX.Element => {
  const today = new Date();

  const currentMonth = format(today, "LLLL uuuu");

  return (
    <HStack spacing={10} as="nav" w="auto" h="10vh" textAlign="center">
      <IconButton
        aria-label="Previous Month"
        icon={<Icon icon="akar-icons:chevron-left" />}
      />
      <Heading w="100%" h="auto">
        {currentMonth}
      </Heading>
      <IconButton
        aria-label="Next Month"
        icon={<Icon icon="akar-icons:chevron-right" />}
      />
    </HStack>
  );
};

export default CalenderNav;
