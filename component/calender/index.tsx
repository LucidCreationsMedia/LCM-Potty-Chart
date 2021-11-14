import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";

const Calender = (): JSX.Element => {
  const daysArr = [];
  for (let i = daysArr.length; i < 31; i++) {
    daysArr.push(daysArr.length + 1);
  }
  return (
    <SimpleGrid
      px={10}
      spacing="5px"
      bg="brand.main"
      w="100%"
      h="100vh"
      columns={7}
    >
      {daysArr.map((day) => {
        return (
          <Box
            bg="brand.primary"
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
