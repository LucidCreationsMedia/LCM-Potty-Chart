import React, { useEffect } from "react";
import { Box, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { isSameDay, format } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateCurrDate, updateMonth } from "../../features/calender";
import CalenderNav from "./CalenderNav";
import Day from "./Day";

const Calender = ({
  date: newDate,
  isLoading
}: UpdateCalendarProps): JSX.Element => {

  const dispatch = useAppDispatch();

  // * Month * //
  const currDate: string = useAppSelector((state) => state.calender.currDate);
  const selectedDate: SelectedDateInfo = useAppSelector(
    (state) => state.calender.selectedDateInfo
  );
  const { layout, title } = selectedDate;

  const currDateObj = new Date(currDate);

  // * Stickers * //

  const stickersMonth: StickerDays = useAppSelector(
    (state) => state.stickers.stickersMonth
  );

  useEffect(() => {
    if (newDate && newDate.year && newDate.month && newDate.day) {
      const { year, month, day } = newDate;

      if (year > 0 && month > 0 && day > 0) {
        const generatedDate: Date = new Date(year, month - 1, day);
        const dateString: string = generatedDate.toJSON();

        dispatch(updateMonth(dateString));
      } else {
        console.warn("Invalid date format: ", newDate);
      }
    }
  }, [dispatch, newDate]);

  useEffect(() => {
    // console.info("Check to update date.");

    const currDateObj = new Date(currDate);

    if (!isSameDay(currDateObj, new Date())) {
      // console.info("Updated date.");
      dispatch(updateCurrDate());
    }
  }, [currDate, dispatch]);

  // Simulated user settings.
  const userSettings = {
    theme: "default",
    startOfWeek: "Sunday"
  };

  const currMonth: WeekLayout =
    layout[`${userSettings.startOfWeek.toLowerCase()}`];
  const { month, weekdays } = currMonth;

  // TODO: Move the weekdays into it's own component for responsiveness.

  return (
    <VStack h="91vh" w="100%">
      <CalenderNav title={title} isLoading={isLoading} />
      <VStack h="100%" w="100%" spacing={0}>
        <HStack
          px={6}
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
        <SimpleGrid px={6} w="100%" h="100%" columns={7} alignItems="center">
          {Object.keys(month).map((week) => {
            const thisWeek = month[week];

            return thisWeek.map((day: MonthDay) => {
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
                  isToday={isSameDay(currDateObj, toDateObj)}
                  key={
                    id.length
                      ? id
                      : format(toDateObj, "yyyyddLL") +
                      `/${sticker === null ? 0 : sticker}`
                  }
                />
              );
            });
          })}
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};

export default Calender;
