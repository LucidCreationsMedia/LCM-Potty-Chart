import { Box, Text, VStack } from "@chakra-ui/react";
import {
  add,
  getYear,
  getMonth,
  sub,
  getDate,
  isSameDay,
  isBefore,
  endOfDay
} from "date-fns";
import router from "next/router";
import React, { Fragment, useState } from "react";
import { StickersContextProvider } from "../../contexts/StickerContext";
import AddUpdateSticker from "./modals/AddUpdateSticker";
import DemoStickers from "./stickers/DemoStickers";

interface DayProps {
  isOverflow?: boolean;
  overflowDirection?: "next" | "prev" | null;
  sticker: StickerVal;
  date: Date;
  selectedDate: Date;
  currDate: Date;
  isToday: boolean;
}

/**
 * The individual days in the calender component.
 * @param props the props for this component.
 * @param {boolean} props.isOverflow is the current date being given before or after the current month.
 * @param {"next" | "prev" | null} props.overflowDirection the direction the overflow is. This will navigate the calender forward or backwards 1 month.
 * @param {StickerVal} props.sticker the sticker for this date.
 * @param {date} props.date the date for this day.
 * @param {date} props.selectedDate the date for the selected month.
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

  // This handles the modal for the day.
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // The current sticker to be displayed on the current date.
  // * This is temporary. There should be no need for this once persistent storage is used. This is being used as a workaround to a bug.
  const [stickerState, setStickerState] = useState<StickerVal>(sticker);

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
            cursor: isBefore(date, endOfDay(currDate))
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
            {`${getDate(date)}`}
          </Text>
          <Box
            key={stickerState === null ? Math.random() : stickerState}
            fontSize="1.5rem"
          >
            <DemoStickers
              stickerVal={stickerState === null ? null : stickerState}
            />
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
            cursor: isBefore(date, endOfDay(currDate))
              ? "pointer"
              : "default",
            background: "gray.700",
            border: "1px solid #FFF"
          }}
        >
          <Text
            p={
              isToday
                ? getDate(date) > 10
                  ? "0px 6px 3px 6px"
                  : "0px 9px 3px 9px"
                : "auto"
            }
            h="auto"
            w="auto"
            border={isToday ? "1px solid #0068ff" : "0px"}
            borderRadius={isToday ? "100px" : "0px"}
          >
            {`${getDate(date)}`}
          </Text>
          <Box
            key={stickerState === null ? Math.random() : stickerState}
            fontSize="1.5rem"
          >
            <DemoStickers
              stickerVal={stickerState === null ? null : stickerState}
            />
          </Box>
          <StickersContextProvider>
            {isBefore(date, endOfDay(currDate)) && (
              <AddUpdateSticker
                date={date}
                isOpen={isOpen}
                updateIsOpen={setIsOpen}
                updateSticker={setStickerState}
                currSticker={stickerState}
                step={step}
                updateStep={setStep}
                selectedSticker={selectedSticker}
                updateSelectedSticker={setSelectedSticker}
                currDate={currDate}
              />
            )}
          </StickersContextProvider>
        </VStack>
      )}
    </Fragment>
  );
};

export default Day;
