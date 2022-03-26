import React, { useEffect, useState, useContext } from "react";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { endOfMonth, getDay } from "date-fns";
import findValidDateRange from "../../lib/findValidDateRange"
import ErrorPage from "next/error";
import Calender from "../../components/calender";
import { CalenderContextProvider } from "../../contexts/CalenderContext";
import { StickersContextProvider } from "../../contexts/StickerContext";

const DateRoute: React.FC<unknown> = () => {
  const router = useRouter();
  const { date: slug } = router.query;

  const validDateRange = findValidDateRange();
  const { start: validStart, end: validEnd } = validDateRange;

  const [date, setDate] = useState<UpdateCalendarProps | null>(null);

  const [error, setError] = useState<boolean>(false);

  const validateDateInput = (dateArr: number[]): UpdateCalendarProps => {
    if (!(dateArr.length >= 2) && !(dateArr.length <= 3)) {
      return {
        year: 0,
        month: 0,
        day: 0
      };
    }

    const date = {
      year: 0,
      month: 0,
      day: 0
    };

    if (/^(19|20)\d{2}$/.test(`${dateArr[0]}`)) {
      date.year = dateArr[0];
    }

    if (dateArr[1] > 0 && dateArr[1] <= 12) {
      date.month = dateArr[1];
    }

    if (date.month && date.year) {
      const lastDay = getDay(
        endOfMonth(new Date(date.year, date.month - 1, 1))
      );
      if (dateArr[2] && dateArr[2] > 0 && dateArr[2] <= lastDay) {
        date.day = dateArr[2];
      } else if (!dateArr[2]) {
        date.day = 1;
      }
    } else {
      return date;
    }

    return date;
  };

  // const validateDateRange = () => {

  // }

  useEffect(() => {2
    if (slug && slug.length === 1 && slug[0] !== "now") {
      setError(true);
      return console.warn("improper date input");
    }

    if (slug && Array.isArray(slug) && slug.length >= 2 && slug.length <= 3) {
      const parsedSlug = slug.map((e) => {
        return parseInt(e);
      });

      const newDate = validateDateInput(parsedSlug);

      if (newDate.year === 0 || newDate.month === 0 || newDate.day === 0) {
        setError(true);
      } else {
        setDate({
          ...validateDateInput(parsedSlug)
        });
      }
    }

    console.info("Context:", calenderContext)
  }, [slug, calenderContext]);

  if (router.isFallback) {
    return <ErrorPage statusCode={404} />;
  }

  /**
   * TODO: Update to disallow navigation in the future and too far in the past.
   * Update so that a date given in the future take the user to /now to today's date.
   * Update so that a date given beyond the last valid date will bring the user to the
   * last month that has stickers within it (When filter is enabled) or to the creation date of the chart..
   */

  return error ? (
    <ErrorPage statusCode={404} />
  ) : (
    <Box textAlign="center" w="100%" h="auto" pt="50px" pb="10vh">
      <CalenderContextProvider>
        <StickersContextProvider>
          <Calender {...date} />
        </StickersContextProvider>
      </CalenderContextProvider>
    </Box>
  );
};

export default DateRoute;
