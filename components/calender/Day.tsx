import { Box, Text } from "@chakra-ui/react";
import { add, getYear, getMonth, sub, getDate } from "date-fns";
import router from "next/router";
import React, { Fragment } from "react";
import AddSticker from "./modals/AddSticker";

const Day = (
  isOverflow: boolean,
  date: Date,
  overflowDirection: "next" | "prev" | null,
  selectedDate: Date
) => {
  return (
    <Fragment>
      {isOverflow && (
        <Box
          bg="transparent"
          color={isOverflow ? "gray.600" : "whiteAlpha"}
          border={isOverflow ? "2px solid #181d8f" : "2px solid #0068ff"}
          w="100%"
          h="100%"
          key={date}
          {...(isOverflow && {
            _hover: {
              cursor: "pointer"
            }
          })}
          {...(isOverflow && {
            onClick: () => {
              if (overflowDirection === "next") {
                console.log(overflowDirection);
                const newMonth = add(selectedDate, { months: 1 });

                const year = getYear(newMonth);
                const month = getMonth(newMonth) + 1;

                router.push(`/calendar/${year}/${month}`);
              } else if (overflowDirection === "prev") {
                const newMonth = sub(selectedDate, { months: 1 });

                const year = getYear(newMonth);
                const month = getMonth(newMonth) + 1;

                router.push(`/calendar/${year}/${month}`);
              }
            }
          })}
        >
          <Text w="100%" h="100%">
            {!isOverflow && <AddSticker />}
            {`Day ${getDate(date)}`}
          </Text>
        </Box>
      )}
    </Fragment>
  );
};

export default Day;
