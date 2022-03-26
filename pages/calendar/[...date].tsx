import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  endOfMonth,
  getDay
  // getMonth,
  // getYear,
  // isAfter,
  // isBefore
} from "date-fns";
// import findValidDateRange from "../../lib/findValidDateRange";
import ErrorPage from "next/error";
import Calender from "../../components/calender";
import { CalenderContextProvider } from "../../contexts/CalenderContext";
import { StickersContextProvider } from "../../contexts/StickerContext";

const DateRoute: React.FC<unknown> = () => {
  const router = useRouter();
  const { date: slug } = router.query;

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

  /**
   * ! This function does not work as is. It is causing infinite loops whe used within the useEffect.
   */
  // const validateDateRange = (slugDate: Date): void => {
  //   const { start: validStart, end: validEnd } = validDateRange;

  //   // Check if the slug date is beyond the valid end date.
  //   if (isAfter(slugDate, validEnd)) {
  //     // router.push("/calender/now");
  //     console.warn(
  //       "Slug date is after the valid date range for this calendar!!!"
  //     );
  //     // Check if the slug is before the valid start date.
  //   } else if (isBefore(slugDate, validStart)) {
  //     console.warn(
  //       "Slug date is before the valid date range for this calendar!!!"
  //     );
  //     router.push(`/${getYear(validStart)}/${getMonth(validStart) + 1}`);
  //   } else {
  //     console.info(
  //       "Slug date is within the valid date range for this calendar."
  //     );
  //   }
  // };

  useEffect(() => {
    console.log("Use Effect");

    if (slug && Array.isArray(slug)) {
      const length = slug.length;
      if (length === 1 && slug[0] !== "now") {
        setError(true);
        return console.warn("improper date input:", slug);
      }

      if (length >= 2 && slug.length <= 3) {
        const parsedSlug = slug.map((e) => {
          return parseInt(e);
        });

        const newDate = validateDateInput(parsedSlug);

        if (newDate.year === 0 || newDate.month === 0 || newDate.day === 0) {
          setError(true);
        } else {
          // const slugDate = new Date(
          //   newDate.year,
          //   newDate.month - 1,
          //   newDate.day
          // );
          // console.info("Slug date:", slugDate);
          // validateDateRange(slugDate);

          setDate({
            ...validateDateInput(parsedSlug)
          });
          2;
        }
      }
    }
  }, [slug]);

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
