import { Box, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { format, isSameDay, isToday } from "date-fns";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateMonth } from "../../features/calender";
import Day from "../calender/Day";

interface CalenderExampleProps {
  type: "add" | "edit";
}

const CalenderExample = ({ type }: CalenderExampleProps): JSX.Element => {
  // TODO: Check if the current date is the start of the user's preferred start of the week and use the previous week for the edit example.

  // TODO: Add highlight to the current date for the add example and highlight other dates when the edit example is used.

  // TODO: Disable the days that shouldn't have a function to prevent edits on add example and add to current date on the edit example.

  const currDateObj: Date = new Date();
  const isLoading = false;

  const dispatch = useAppDispatch();

  // * Current Month * //
  const selectedDate: SelectedDateInfo = useAppSelector(
    (state) => state.calender.selectedDateInfo
  );
  const { layout } = selectedDate;

  // * Stickers * //

  const stickersMonth: StickerDays = useAppSelector(
    (state) => state.stickers.stickersMonth
  );

  // Simulated user settings.
  const userSettings = {
    theme: "default",
    startOfWeek: "Sunday"
  };

  // * Week Names * //
  const currMonth: WeekLayout =
    layout[`${userSettings.startOfWeek.toLowerCase()}`];
  const { month, weekdays } = currMonth;

  useEffect(() => {
    dispatch(updateMonth(new Date().toJSON()));
  }, [dispatch]);

  // * The current week * //

  const getCurrentWeek = (): MonthDay[] => {
    let foundWeek: MonthDay[] | null;
    for (const week in month) {
      const currWeek = month[week];

      currWeek.forEach((day: MonthDay) => {
        const { date } = day;

        if (isToday(new Date(date))) {
          foundWeek = currWeek;
        }
      });
    }

    return foundWeek || ([] as MonthDay[]);
  };

  const [currWeek /*, setCurrWeek*/] = useState<MonthDay[]>(getCurrentWeek());

  return (
    <VStack h="8.5rem" w="100%" spacing={0}>
      <HStack
        px={{ base: 1, sm: 2, md: 6 }}
        spacing={0}
        w="100%"
        h="auto"
        alignContent="center"
        alignItems="center"
      >
        {weekdays.map((weekDay) => {
          return (
            <Box
              display="flex"
              alignContent="center"
              alignItems="center"
              bg="transparent"
              border="1px solid #0068ff"
              w="100%"
              h={10}
              key={weekDay}
            >
              <Text display={{ base: "none", md: "block" }} w="100%" h="auto">
                {weekDay}
              </Text>
              <Text
                display={{ base: "none", sm: "block", md: "none" }}
                w="100%"
                h="auto"
              >
                {weekDay.substring(0, 3)}
              </Text>
              <Text display={{ base: "block", sm: "none" }} w="100%" h="auto">
                {weekDay.substring(0, 2)}
              </Text>
            </Box>
          );
        })}
      </HStack>
      <SimpleGrid px={{ base: 1, sm: 2, md: 6 }} w="100%" h="100%" columns={7} alignItems="center">
        {currWeek.map((day: MonthDay) => {
          const { date, isOverflow, overflowDirection } = day;

          const toDateObj: Date = new Date(date);

          let sticker = null;

          let id = "";

          stickersMonth.map((stickerDay) => {
            const { date: stickerDate } = stickerDay;

            if (isSameDay(new Date(stickerDate), toDateObj)) {
              sticker = stickerDay.sticker;

              id = stickerDay.id;
            }
          });

          return (
            <Day
              isLoading={isLoading}
              isOverflow={isOverflow}
              overflowDirection={overflowDirection}
              currSticker={sticker}
              date={date}
              selectedDate={selectedDate.date}
              currDate={currDateObj}
              tutorial={type}
              key={
                id.length
                  ? id
                  : format(toDateObj, "yyyyddLL") +
                  `/${sticker === null ? 0 : sticker}`
              }
            />
          );
        })}
      </SimpleGrid>
    </VStack>
  );
};

export default CalenderExample;
