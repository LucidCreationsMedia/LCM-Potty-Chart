import { Box, Text, VStack } from "@chakra-ui/react";
import { add, getYear, getMonth, sub, getDate, isSameDay } from "date-fns";
import router from "next/router";
import React, { Fragment, useState } from "react";
import AddSticker from "./modals/AddSticker";
import DemoStickers from "./stickers/DemoStickers";

interface DayProps {
  isOverflow?: boolean;
  overflowDirection?: "next" | "prev" | null;
  sticker: -2 | -1 | 0 | 1 | 2 | null;
  date: Date;
  selectedDate: Date;
}

/**
 * The individual days in the calender component.
 * @param props the props for this component.
 * @param {boolean} props.isOverflow is the current date being given before or after the current month.
 * @param {"next" | "prev" | null} props.overflowDirection the direction the overflow is. This will navigate the calender forward or backwards 1 month.
 * @param {-2 | -1 | 0 | 1 | 2 | null} props.sticker the sticker for this date.
 * @param {date} props.date the date for this day.
 * @param {date} props.selectedDate the date for the selected month.
 */
const Day = ({
  isOverflow,
  overflowDirection,
  sticker,
  date,
  selectedDate
}: DayProps): JSX.Element => {
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

  // This handles the modal for this date.
  const [isOpen, setIsOpen] = useState<boolean>(false);

  /**
   * TODO: Add logic to remove the onClick within overflow dates.
   * Do not give dates for the next month an onClick.
   * Do not give dates in the past an onClick there is nothing before that month.
   */

  return (
    <Fragment>
      {isOverflow && (
        <VStack
          bg="transparent"
          color="gray.600"
          border="1px solid #181d8f"
          w="100%"
          h="100%"
          _hover={{
            cursor: "pointer",
            background: "gray.700",
            color: "gray.200"
          }}
          onClick={() => handleNav(overflowDirection)}
          spacing="0.5rem"
          alignContent="center"
          justifyContent="flex-start"
          pt={2}
        >
          <Text w="auto" h="auto">
            {`${getDate(date)}`}
          </Text>
          {sticker !== null ? (
            <Box fontSize="1.5rem">
              <DemoStickers stickerVal={sticker} />
            </Box>
          ) : (
            <Box fontSize="1.5rem">
              <span aria-label="spacer">&nbsp;</span>
            </Box>
          )}
        </VStack>
      )}
      {!isOverflow && (
        <VStack
          bg="transparent"
          color="whiteAlpha"
          border="1px solid #0068ff"
          w="100%"
          h="100%"
          onClick={() => setIsOpen(true)}
          alignContent="center"
          justifyContent="flex-start"
          pt={2}
          _hover={{
            cursor: "pointer",
            background: "gray.700"
          }}
        >
          <Text
            p={
              isSameDay(new Date(), date)
                ? getDate(date) > 10
                  ? "4px 8px"
                  : "2px 10px"
                : "auto"
            }
            h="auto"
            w="auto"
            border={isSameDay(new Date(), date) ? "1px solid #0068ff" : "0px"}
            borderRadius={isSameDay(new Date(), date) ? "100px" : "0px"}
          >
            {`${getDate(date)}`}
          </Text>
          {sticker !== null ? (
            <Box fontSize="1.5rem">
              <DemoStickers stickerVal={sticker} />
            </Box>
          ) : (
            <Box fontSize="1.5rem">
              <span aria-label="spacer">&nbsp;</span>
            </Box>
          )}
          <AddSticker date={date} isOpen={isOpen} updateIsOpen={setIsOpen} />
        </VStack>
      )}
    </Fragment>
  );
};

export default Day;
