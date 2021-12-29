import React, { useContext, useEffect } from "react";
import { Box, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import CalenderNav from "./CalenderNav";
import { CalenderContext } from "../../contexts/CalenderContext";
import { NewCalenderContext } from "../../contexts/NewCalenderContext";
import { getDate } from "date-fns";

interface UpdateCalendarProps {
  year: number;
  month: number;
  day: number;
}

const Calender = (newDate?: UpdateCalendarProps): JSX.Element => {
  const { daysOfMonth, daysOfWeek, setDate } = useContext(CalenderContext);
  const { layout } = useContext(NewCalenderContext);

  useEffect(() => {
    if (newDate) {
      const { year, month, day } = newDate;

      if (year > 0 && month > 0 && day > 0) {
        setDate(newDate);
      } else {
        console.warn("Invalid date format: ", newDate);
      }
    }
  }, [daysOfMonth, daysOfWeek, newDate, setDate]);

  // Simulated user settings context
  const userSettings = {
    theme: "default",
    startOfWeek: "Sunday"
  };

  const currMonth = layout[`${userSettings.startOfWeek.toLowerCase()}`];
  const { month, weekdays } = currMonth;

  return (
    <VStack h="100vh" w="100%">
      {/* <NewContext /> */}
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
        {weekdays.map((weekDay) => {
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
        {Object.keys(month).map((week) => {
          const thisWeek = month[week];

          return thisWeek.map((day) => {
            const { date, isOverflow } = day;

            return (
              <Box
                bg="transparent"
                color={isOverflow ? "gray.600" : "whiteAlpha"}
                border={isOverflow ? "2px solid #181d8f" : "2px solid #0068ff"}
                w="100%"
                h="100%"
                key={date}
              >
                <Text w="100%" h="100%">
                  {`Day ${getDate(date)}`}
                </Text>
              </Box>
            );
          });
        })}
      </SimpleGrid>
    </VStack>
  );
};

export default Calender;
