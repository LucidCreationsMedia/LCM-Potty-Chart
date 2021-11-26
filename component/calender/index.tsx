import React from "react";
import { Box, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { endOfMonth, getDate } from "date-fns";
import CalenderNav from "./nav";

const Calender = (): JSX.Element => {
  const today = new Date();

  const endOfCurrMonth = endOfMonth(today);
  const lastDay = getDate(endOfCurrMonth);

  // console.info(`This month has ${lastDay} days.`);

  const daysOfMonth = [];
  for (let i = daysOfMonth.length; i < lastDay; i++) {
    daysOfMonth.push(daysOfMonth.length + 1);
  }

  const daysOfWeek = {
    Sunday: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    Monday: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  };

  const userSettings = {
    theme: "default",
    startOfWeek: "Sunday",
  };

  return (
    <VStack h="100vh" w="100%">
      <CalenderNav />
      <HStack
        px={6}
        spacing={2}
        // bg="brand.main"
        w="100%"
        h="auto"
        alignContent="center"
        alignItems="center"
      >
        {daysOfWeek[userSettings.startOfWeek].map((weekDay) => {
          return (
            <Box
              d="flex"
              alignContent="center"
              alignItems="center"
              bg="transparent"
              border="2px solid #0068ff"
              w="100%"
              h={10}
              key={weekDay}
            >
              <Text w="100%" h="auto">
                {weekDay}
              </Text>
            </Box>
          );
        })}
      </HStack>
      <SimpleGrid
        px={6}
        spacing={2}
        // bg="brand.main"
        w="100%"
        h="100%"
        columns={7}
        // alignContent="center"
        alignItems="center"
      >
        {daysOfMonth.map((monthDay) => {
          return (
            <Box
              bg="transparent"
              border="2px solid #0068ff"
              w="100%"
              h="100%"
              key={monthDay}
            >
              <Text w="100%" h="100%">
                {`Day ${monthDay}`}
              </Text>
            </Box>
          );
        })}
      </SimpleGrid>
    </VStack>
  );
};

export default Calender;
