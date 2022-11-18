import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { Box, Skeleton, VStack } from "@chakra-ui/react";
import {
  add,
  getYear,
  getMonth,
  sub,
  getDate,
  isBefore,
  endOfDay,
  isToday as isTodayFun
} from "date-fns";
import router from "next/router";
import AddUpdateSticker from "./modals/AddUpdateSticker";
import DemoStickers from "./stickers/DemoStickers";

interface DayProps {
  isLoading: boolean;
  isOverflow?: boolean;
  overflowDirection?: "next" | "prev" | null;
  currSticker: StickerVal;
  date: string;
  selectedDate: string;
  currDate: Date;
  tutorial?: "add" | "edit";
}

/**
 * The individual days in the calender component.
 * @param {boolean} isLoading is the component loading?
 * @param {boolean} isOverflow is the current date being given before or after the current month.
 * @param {"next" | "prev" | null} overflowDirection the direction the overflow is. This will navigate the calender forward or backwards 1 month.
 * @param {StickerVal} currSticker the sticker for this date.
 * @param {date} date the date for this day.
 * @param {date} selectedDate the date for the selected month.
 * @param {Date} currDate today's date.
 */
const Day = ({
  isLoading,
  isOverflow,
  overflowDirection,
  currSticker,
  date,
  selectedDate,
  currDate,
  tutorial
}: DayProps): JSX.Element => {
  const selectedDateObj = new Date(selectedDate);
  const currDateObj = new Date(date);
  const isToday = isTodayFun(currDateObj);

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

  return isOverflow ? (
    <VStack
      w="100%"
      h="100%"
      bg="transparent"
      pt={2}
      color="gray.600"
      border="1px solid #181d8f"
      _hover={{
        cursor: isBefore(currDateObj, endOfDay(currDate))
          ? selectedSticker !== null
            ? "pointer"
            : "default"
          : "default",
        background: "gray.700",
        border: "1px solid #FFF",
        color: "whiteAlpha.900"
      }}
      onClick={() =>
        selectedSticker !== null ? handleNav(overflowDirection) : ""
      }
      spacing="0.5rem"
      alignContent="center"
      justifyContent="flex-start"
    >
      <Box w="1.8rem" h="1.8rem" textAlign="center" p={0} m={0}>
        {`${getDate(currDateObj)}`}
      </Box>
      {isLoading ? (
        <Skeleton key={currSticker}>
          <Box fontSize="1.5rem">
            <DemoStickers stickerVal={0} />
          </Box>
        </Skeleton>
      ) : (
        <Box key={currSticker} fontSize="1.5rem">
          <DemoStickers stickerVal={currSticker} />
        </Box>
      )}
    </VStack>
  ) : (
    <VStack
      w="100%"
      h="100%"
      bg={
        tutorial
          ? tutorial === "add" && isToday
            ? "gray.600"
            : tutorial === "edit" &&
              !isToday &&
              isBefore(currDateObj, endOfDay(currDate))
            ? "gray.600"
            : "transparent"
          : "transparent"
      }
      border={
        tutorial
          ? tutorial === "add" && isToday
            ? "1px solid #00ff3c"
            : tutorial === "edit" &&
              !isToday &&
              isBefore(currDateObj, endOfDay(currDate))
            ? "1px solid #00ff3c"
            : "1px solid #0068ff"
          : "1px solid #0068ff"
      }
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
        bg: tutorial
          ? tutorial === "add" && isToday
            ? "gray.600"
            : tutorial === "edit" &&
              !isToday &&
              isBefore(currDateObj, endOfDay(currDate))
            ? "gray.600"
            : "transparent"
          : "transparent",
        border: "1px solid #FFF"
      }}
    >
      {isToday ? (
        <Box
          border="1px solid #0068ff"
          borderRadius="50%"
          w="1.8rem"
          h="1.8rem"
          textAlign="center"
          p={0}
          m={0}
        >
          {`${getDate(currDateObj)}`}
        </Box>
      ) : (
        <Box w="1.8rem" h="1.8rem" textAlign="center" p={0} m={0}>
          {`${getDate(currDateObj)}`}
        </Box>
      )}
      {isLoading ? (
        <Skeleton key={currSticker}>
          <Box fontSize="1.5rem">
            <DemoStickers stickerVal={0} />
          </Box>
        </Skeleton>
      ) : (
        <Box key={currSticker} fontSize="1.5rem">
          <DemoStickers stickerVal={currSticker} />
        </Box>
      )}
      {tutorial ? (
        <Provider store={store}>
          {tutorial.toLowerCase() === "add" && isToday && !isLoading && (
            <AddUpdateSticker
              stickerDate={date}
              isOpen={isOpen}
              updateIsOpen={setIsOpen}
              currSticker={currSticker}
              step={step}
              updateStep={setStep}
              selectedSticker={selectedSticker}
              updateSelectedSticker={setSelectedSticker}
              currDate={currDate}
            />
          )}
          {tutorial.toLowerCase() === "edit" &&
            !isToday &&
            isBefore(currDateObj, endOfDay(currDate)) &&
            !isLoading && (
              <AddUpdateSticker
                stickerDate={date}
                isOpen={isOpen}
                updateIsOpen={setIsOpen}
                currSticker={currSticker}
                step={step}
                updateStep={setStep}
                selectedSticker={selectedSticker}
                updateSelectedSticker={setSelectedSticker}
                currDate={currDate}
              />
            )}
        </Provider>
      ) : (
        <Provider store={store}>
          {isBefore(currDateObj, endOfDay(currDate)) && !isLoading && (
            <AddUpdateSticker
              stickerDate={date}
              isOpen={isOpen}
              updateIsOpen={setIsOpen}
              currSticker={currSticker}
              step={step}
              updateStep={setStep}
              selectedSticker={selectedSticker}
              updateSelectedSticker={setSelectedSticker}
              currDate={currDate}
            />
          )}
        </Provider>
      )}
    </VStack>
  );
};

export default Day;
