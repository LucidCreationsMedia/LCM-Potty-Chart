import { Box, Text, VStack } from "@chakra-ui/react";
import {
  add,
  getYear,
  getMonth,
  sub,
  getDate,
  isBefore,
  endOfDay
} from "date-fns";
import router from "next/router";
import React, { Fragment, useState } from "react";
import AddUpdateSticker from "./modals/AddUpdateSticker";
import DemoStickers from "./stickers/DemoStickers";
import { Provider } from "react-redux";
import { store } from "../../app/store";

interface DayProps {
  isOverflow?: boolean;
  overflowDirection?: "next" | "prev" | null;
  sticker: StickerVal;
  date: string;
  selectedDate: string;
  currDate: Date;
  isToday: boolean;
}

/**
 * The individual days in the calender component.
 * @param {boolean} isOverflow is the current date being given before or after the current month.
 * @param {"next" | "prev" | null} overflowDirection the direction the overflow is. This will navigate the calender forward or backwards 1 month.
 * @param {StickerVal} sticker the sticker for this date.
 * @param {date} string the date for this day.
 * @param {date} selectedDate the date for the selected month.
 */
const Day = ({
  isOverflow,
  overflowDirection,
  sticker,
  date,
  selectedDate,
  currDate,
  isToday
}: DayProps): JSX.Element => {
  const selectedDateObj = new Date(selectedDate);
  const currDateObj = new Date(date);

  const handleNav = (direction: "next" | "prev") => {
    if (direction === "next") {
      console.log(overflowDirection);
      const newMonth = add(selectedDateObj, { months: 1 });

      const year = getYear(newMonth);
      const month = getMonth(newMonth) + 1;

      router.push(`/calendar/${year}/${month}`);
    } else if (direction === "prev") {
      const newMonth = sub(selectedDateObj, { months: 1 });

      const year = getYear(newMonth);
      const month = getMonth(newMonth) + 1;

      router.push(`/calendar/${year}/${month}`);
    }
  };

  // This handles the modal for the day.
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // The step the modal is at.
  const [step, setStep] = useState<number>(0);

  // The current selected sticker. (To be added or updated)
  const [selectedSticker, setSelectedSticker] = useState<StickerVal>(null);

  /**
   * TODO: Add logic to remove the onClick within overflow dates.
   * Do not give dates for the next month an onClick.
   * Do not give dates in the past an onClick there is nothing before that month.
   * (Creation date of a chart)
   */

  // TODO: When the valid date range is created, disallow pointer cursor outside of the date range.

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
            cursor: isBefore(currDateObj, endOfDay(currDate))
              ? "pointer"
              : "default",
            background: "gray.700",
            border: "1px solid #FFF",
            color: "whiteAlpha.900"
          }}
          onClick={() => handleNav(overflowDirection)}
          spacing="0.5rem"
          alignContent="center"
          justifyContent="flex-start"
          pt={2}
        >
          <Text w="auto" h="auto">
            {`${getDate(currDateObj)}`}
          </Text>
          <Box key={sticker} fontSize="1.5rem">
            <DemoStickers stickerVal={sticker} />
          </Box>
        </VStack>
      )}
      {!isOverflow && (
        <VStack
          bg="transparent"
          border="1px solid #0068ff"
          w="100%"
          h="100%"
          onClick={() => {
            setStep(0);
            setSelectedSticker(null);
            setIsOpen(true);
          }}
          alignContent="center"
          justifyContent="flex-start"
          pt={2}
          _hover={{
            cursor: isBefore(currDateObj, endOfDay(currDate))
              ? "pointer"
              : "default",
            background: "gray.700",
            border: "1px solid #FFF"
          }}
        >
          <Text
            p={
              isToday
                ? getDate(currDateObj) > 10
                  ? "0px 6px 3px 6px"
                  : "0px 9px 3px 9px"
                : "auto"
            }
            h="auto"
            w="auto"
            border={isToday ? "1px solid #0068ff" : "0px"}
            borderRadius={isToday ? "100px" : "0px"}
          >
            {`${getDate(currDateObj)}`}
          </Text>
          <Box key={sticker} fontSize="1.5rem">
            <DemoStickers stickerVal={sticker} />
          </Box>
          <Provider store={store}>
            {isBefore(currDateObj, endOfDay(currDate)) && (
              <AddUpdateSticker
                date={date}
                isOpen={isOpen}
                updateIsOpen={setIsOpen}
                currSticker={sticker}
                step={step}
                updateStep={setStep}
                selectedSticker={selectedSticker}
                updateSelectedSticker={setSelectedSticker}
                currDate={currDate}
              />
            )}
          </Provider>
        </VStack>
      )}
    </Fragment>
  );
};

export default Day;
