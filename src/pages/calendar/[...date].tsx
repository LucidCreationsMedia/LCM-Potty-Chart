import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  endOfMonth,
  getDate
  // getMonth,
  // getYear,
  // isAfter,
  // isBefore,
  // isSameMonth
} from "date-fns";
// import findValidDateRange from "../../lib/findValidDateRange";
import ErrorPage from "next/error";
import Calender from "../../components/calender";

const DateRoute: React.FC<unknown> = () => {
  const router = useRouter();
  const { date: slug } = router.query;

  const [date, setDate] = useState<UpdateCalenderPropsDateLayout | null>(null);

  const [error, setError] = useState<boolean>(false);

  // const dateRange = useRef(findValidDateRange());
  // const validDateRange = Object.assign({}, dateRange.current);

  const validateDateInput = (
    dateArr: number[]
  ): UpdateCalenderPropsDateLayout => {
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
      const lastDay = getDate(
        endOfMonth(new Date(date.year, date.month - 1, 1))
      );
      if (dateArr[2] && dateArr[2] > 0 && dateArr[2] <= lastDay) {
        date.day = dateArr[2];
      } else if (!dateArr[2]) {
        date.day = 1;
      }
    }

    return date;
  };

  /**
   * ! This function does not work as is. It is causing infinite loops whe used within the useEffect.
   */
  // const validateDateRange = (
  //   slugDate: Date
  // ): [Date, "after" | "before" | "valid"] => {
  //   const { start: validStart, end: validEnd } = validDateRange;

  //   // Check if the slug date is beyond the valid end date.
  //   if (isAfter(slugDate, validEnd)) {
  //     // router.push("/calender/now");
  //     console.warn(
  //       "Slug date is after the valid date range for this calendar!!!"
  //     );
  //     return [validEnd, "after"];
  //     // Check if the slug is before the valid start date.
  //   } else if (isBefore(slugDate, validStart)) {
  //     console.warn(
  //       "Slug date is before the valid date range for this calendar!!!"
  //     );
  //     return [validStart, "before"];
  //     // router.push(`/${getYear(validStart)}/${getMonth(validStart) + 1}`);
  //   } else {
  //     console.info(
  //       "Slug date is within the valid date range for this calendar."
  //     );
  //     return [slugDate, "valid"];
  //   }
  // };

  useEffect(() => {
    // Checking if the slug exists and is an array.
    if (slug && Array.isArray(slug)) {
      console.log(slug);
      // Grabbing the slug length
      const length = slug.length;

      // Parsing the slug to convert it from strings to numbers.
      const parsedSlug = slug.map((e) => {
        return parseInt(e);
      });

      // Checking if the slug has 2 to 3 numbers within the array. year/month/day.
      if (length >= 2 && length <= 3) {
        // Validate that the date is valid.
        const newDate = validateDateInput(parsedSlug);

        // If anything is invalid the year/day/month would be set to 0. This checks for the invalid condition.
        if (newDate.year === 0 || newDate.month === 0 || newDate.day === 0) {
          setError(true);
          // Set the date to the valid date.
        } else {
          // TODO: Make sure the date is within the valid range using the validateDateRange function.
          // const validDate = new Date(
          //   newDate.year,
          //   newDate.month - 1,
          //   newDate.day
          // );

          // const validDateWithinRange = validateDateRange(validDate)[0];

          // setDate({
          //   ...{
          //     year: getYear(validDateWithinRange),
          //     month: getMonth(validDateWithinRange) + 1,
          //     day: getDate(validDateWithinRange)
          //   }
          // });

          setDate({
            ...newDate
          });
        }
      } else if (length === 1) {
        // Checking if the slug is not "now".
        // ! Update this to include a check for "today".
        if (slug[0] !== "now") {
          setError(true);
          return console.warn("improper date input:", slug);
        }
      }
    }
  }, [slug]);

  /**
   * ? Pushing into the router within the use effect does not create the infinite loop.
   * ? The way the validate date range or the way it is being used within a useEffect is what is creating the infinite loop.
   */

  // useEffect(() => {
  //   // Check is slug and date are valid.
  //   if (slug && date && date !== null) {
  //     // Check if the slug is an array and has a length of 2.
  //     if (Array.isArray(slug) && slug.length === 2) {
  //       const dateState = new Date(date.year, date.month - 1, date.day);

  //       const parsedSlug = slug.map((e) => {
  //         return parseInt(e);
  //       });
  //       const slugDate = new Date(parsedSlug[0], parsedSlug[1] - 1, 1);

  //       if (!isSameMonth(dateState, slugDate)) {
  //         const validDateWithinRange = validateDateRange(dateState);

  //         if (validDateRange[1] === "after") {
  //           router.push("/now");
  //         } else {
  //           router.push(
  //             `/${getYear(validDateWithinRange[0])}/${getMonth(
  //               validDateWithinRange[0]
  //             )}`
  //           );
  //         }
  //       }
  //     }
  //   }
  // }, [date]);

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
      <Provider store={store}>
        <Calender date={date} isLoading={false} />
      </Provider>
    </Box>
  );
};

export default DateRoute;
