import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { endOfMonth, getDate } from "date-fns";

const Calender = (): JSX.Element => {
  const today = new Date();

  const endOfCurrMonth = endOfMonth(today);
  const lastDay = getDate(endOfCurrMonth);

  // console.info(`This month has ${lastDay} days.`);

  const daysArr = [];
  for (let i = daysArr.length; i < lastDay; i++) {
    daysArr.push(daysArr.length + 1);
  }
  return (
    <SimpleGrid
      px={6}
      spacing={2}
      // bg="brand.main"
      w="100%"
      h="100vh"
      columns={7}
    >
      {daysArr.map((day) => {
        return (
          <Box
            bg="transparent"
            border="2px solid #0068ff"
            w="100%"
            h="100%"
            key={day}
          >{`Day ${day}`}</Box>
        );
      })}
    </SimpleGrid>
  );
};

export default Calender;
