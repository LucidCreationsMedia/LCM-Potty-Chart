import { Box, Text } from "@chakra-ui/react";
import { add, getYear, getMonth, sub, getDate } from "date-fns";
import router from "next/router";
import React, { Fragment, useState } from "react";
import AddSticker from "./modals/AddSticker";

interface DayProps {
  isOverflow?: boolean;
  overflowDirection?: "next" | "prev" | null;
  sticker: -2 | -1 | 0 | 1 | 2 | null;
  date: Date;
  selectedDate: Date;
}

const Day = (props: DayProps): JSX.Element => {
  const { isOverflow, overflowDirection, /*sticker,*/ date, selectedDate } =
    props;

  const handleNav = (direction: "next" | "prev") => {
    if (direction === "next") {
      console.log(overflowDirection);
      const newMonth = add(selectedDate, { months: 1 });

      const year = getYear(newMonth);
      const month = getMonth(newMonth) + 1;

      router.push(`/calendar/${year}/${month}`);
    } else if (direction === "prev") {
      const newMonth = sub(selectedDate, { months: 1 });

      const year = getYear(newMonth);
      const month = getMonth(newMonth) + 1;

      router.push(`/calendar/${year}/${month}`);
    }
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Fragment>
      {isOverflow && (
        <Box
          bg="transparent"
          color="gray.600"
          border="2px solid #181d8f"
          w="100%"
          h="100%"
          _hover={{
            cursor: "pointer"
          }}
          onClick={() => handleNav(overflowDirection)}
        >
          <Text w="100%" h="100%">
            {`Day ${getDate(date)}`}
          </Text>
        </Box>
      )}
      {!isOverflow && (
        <Box
          bg="transparent"
          color="whiteAlpha"
          border="2px solid #0068ff"
          w="100%"
          h="100%"
          onClick={() => setIsOpen(true)}
        >
          <Text>{`Day ${getDate(date)}`}</Text>
          <AddSticker date={date} isOpen={isOpen} updateIsOpen={setIsOpen} />
        </Box>
      )}
    </Fragment>
  );
};

export default Day;
