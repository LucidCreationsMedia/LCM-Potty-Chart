import React, { useEffect, useRef, useState } from "react";
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

  // Keeping track of the slug, if it is valid.
  const parsedSlug = useRef<number[] | null>(null);

  const checkNewSlug = (
    currSlug: number[],
    prevSlug: number[]
  ): boolean | null => {
    if (currSlug[0] === prevSlug[0] && currSlug[1] === prevSlug[1]) {
      return false;
    } else if (currSlug[0] !== prevSlug[0] || currSlug[1] !== prevSlug[1]) {
      return true;
    } else {
      return null;
    }
  };

  useEffect(() => {
    // Checking if the slug exists and is an array.
    if (slug && Array.isArray(slug)) {
      // Grabbing the slug length
      const length = slug.length;

      // Parsing the slug to convert it from strings to numbers.
      const newParsedSlug = slug.map((e) => {
        return parseInt(e);
      });

      // Checking if the new slug is different from the previous slug.
      if (checkNewSlug(newParsedSlug, parsedSlug.current)) {
        // Checking if the slug is not "now" when the length is 1.
        // ! Update this to include a check for "today".
        if (length === 1 && slug[0] !== "now") {
          setError(true);
          return console.warn("improper date input:", slug);
        }

        // Checking if the slug has 2 to 3 numbers within the array. year/month/day.
        if (length >= 2 && slug.length <= 3) {
          // Validate that the date is valid.
          const newDate = validateDateInput(newParsedSlug);

          // If anything is invalid the year/day/month would be set to 0. This checks for the invalid condition.
          if (newDate.year === 0 || newDate.month === 0 || newDate.day === 0) {
            setError(true);
            // Set the date to the valid date.
          } else {
            // TODO: Make sure the date is within the valid range using the validateDateRange function.
            // const slugDate = new Date(
            //   newDate.year,
            //   newDate.month - 1,
            //   newDate.day
            // );
            // console.info("Slug date:", slugDate);
            // validateDateRange(slugDate);

            setDate({
              ...validateDateInput(newParsedSlug)
            });
          }
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
