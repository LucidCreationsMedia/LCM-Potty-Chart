import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateMonth } from "../../features/calender";
import { Box, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { format, isSameDay, isToday } from "date-fns";
import Day from "../calender/Day";
import { setCurrentWeek } from "../../features/tutorial";

interface CalenderExampleProps {
  type: "add" | "edit";
  isLoading: boolean;
}

const CalenderExample = ({
  type,
  isLoading
}: CalenderExampleProps): JSX.Element => {
  // TODO: Check if the current date is the start of the user's preferred start of the week and use the previous week for the edit example.

  const currDateStr: string = useAppSelector(
    (state) => state.calender.currDate
  );
  const currDateObj: Date = new Date(currDateStr);

  const dispatch = useAppDispatch();

  // * Current Month * //
  const selectedDate: SelectedDateInfo = useAppSelector(
    (state) => state.calender.selectedDateInfo
  );
  const { layout, date: currSelectedDateStr } = selectedDate;

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
    const currDateObj: Date = new Date(currDateStr);
    const currSelectedDateOj: Date = new Date(currSelectedDateStr);

    if (!isSameDay(currDateObj, currSelectedDateOj)) {
      dispatch(updateMonth(currDateObj.toJSON()));
    }
  }, [currDateStr, currSelectedDateStr, dispatch]);

  // * The current week * //
  const currWeek = useAppSelector((state) => state.tutorial.currWeek);

  useEffect(() => {
    const getCurrentWeek = (): MonthDay[] => {
      let foundWeek: MonthDay[];

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

    if (currWeek === null) {
      dispatch(setCurrentWeek(getCurrentWeek()));
    }
  }, [currWeek, dispatch, month]);

  return (
    <VStack
      h="auto"
      w="100%"
      alignContent="center"
      alignItems="center"
      spacing={2}
    >
      <VStack
        h="8.5rem"
        w="100%"
        alignContent="center"
        alignItems="center"
        spacing={0}
      >
        <HStack
          w="100%"
          h="auto"
          alignContent="center"
          alignItems="center"
          spacing={0}
          px={{ base: 1, sm: 2, md: 6 }}
        >
          {weekdays.map((weekDay) => {
            return (
              <Box
                key={weekDay}
                display="flex"
                w="100%"
                h={10}
                bg="transparent"
                border="1px solid #0068ff"
                alignContent="center"
                alignItems="center"
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
        <SimpleGrid
          w="100%"
          h="100%"
          columns={7}
          px={{ base: 1, sm: 2, md: 6 }}
          alignItems="center"
        >
          {currWeek &&
            currWeek.map((day: MonthDay) => {
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
      {type === "edit" && (
        <VStack
          w="100%"
          h="auto"
          alignContent="center"
          alignItems="center"
          spacing={2}
        >
          <Text fontSize="sm" color="whiteAlpha.800">
            {
              "Not being able to edit within this tutorial when the current date is the start of the week or month is a known bug."
            }
          </Text>
          <Text fontSize="sm" color="whiteAlpha.800">
            {"This bug will be fixed in beta v2."}
          </Text>
          <Text fontSize="sm" color="whiteAlpha.800">
            {"You can skip the tutorial and try again tomorrow."}
          </Text>
        </VStack>
      )}
    </VStack>
  );
};

export default CalenderExample;
