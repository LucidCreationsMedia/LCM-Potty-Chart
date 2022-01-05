import React, { useContext, useEffect } from "react";
import { Box, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import CalenderNav from "./CalenderNav";
import { CalenderContext } from "../../contexts/CalenderContext";
import { format } from "date-fns";
import Day from "./Day";
// TODO: import types

const Calender = (newDate?: UpdateCalendarProps): JSX.Element => {
  const { selectedDate, layout, updateDate } = useContext(CalenderContext);

  useEffect(() => {
    if (newDate) {
      const { year, month, day } = newDate;

      if (year > 0 && month > 0 && day > 0) {
        updateDate(newDate);
      } else {
        console.warn("Invalid date format: ", newDate);
      }
    }
  }, [newDate, updateDate]);

  // Simulated user settings context
  const userSettings = {
    theme: "default",
    startOfWeek: "Sunday"
  };

  const currMonth = layout[`${userSettings.startOfWeek.toLowerCase()}`];
  const { month, weekdays } = currMonth;

  return (
    <VStack h="91vh" w="100%">
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

          return thisWeek.map((day: MonthDay) => {
            const { sticker, date, isOverflow, overflowDirection } = day;

            return (
              <Day
                isOverflow={isOverflow}
                overflowDirection={overflowDirection}
                sticker={sticker}
                date={date}
                selectedDate={selectedDate}
                key={format(date, "P")}
              />
              // <Box
              //   bg="transparent"
              //   color={isOverflow ? "gray.600" : "whiteAlpha"}
              //   border={isOverflow ? "2px solid #181d8f" : "2px solid #0068ff"}
              //   w="100%"
              //   h="100%"
              //   key={date}
              //   {...(isOverflow && {
              //     _hover: {
              //       cursor: "pointer"
              //     }
              //   })}
              //   {...(isOverflow && {
              //     onClick: () => {
              //       if (overflowDirection === "next") {
              //         console.log(overflowDirection);
              //         const newMonth = add(selectedDate, { months: 1 });

              //         const year = getYear(newMonth);
              //         const month = getMonth(newMonth) + 1;

              //         router.push(`/calendar/${year}/${month}`);
              //       } else if (overflowDirection === "prev") {
              //         const newMonth = sub(selectedDate, { months: 1 });

              //         const year = getYear(newMonth);
              //         const month = getMonth(newMonth) + 1;

              //         router.push(`/calendar/${year}/${month}`);
              //       }
              //     }
              //   })}
              // >
              //   <Text w="100%" h="100%">
              //     {!isOverflow && <AddSticker />}
              //     {`Day ${getDate(date)}`}
              //   </Text>
              // </Box>
            );
          });
        })}
      </SimpleGrid>
    </VStack>
  );
};

export default Calender;
