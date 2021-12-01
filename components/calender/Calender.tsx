import React, { useContext } from "react";
import { Box, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import CalenderNav from "./CalenderNav";
import { CalenderContext } from "../../contexts/CalenderContext";

const Calender = (): JSX.Element => {
  const { daysOfMonth, daysOfWeek } = useContext(CalenderContext);

  // Simulated user settings context
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
        {daysOfWeek.startOfWeek[userSettings.startOfWeek].map((weekDay) => {
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
