import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Calender from "../../components/calender";
import { CalenderContextProvider } from "../../contexts/CalenderContext";

interface UpdateCalendarProps {
  year: number;
  month: number;
  day: number;
}

const DateRoute: React.FC<unknown> = () => {
  const router = useRouter();
  const { date: slug } = router.query;

  const [date, setDate] = useState<UpdateCalendarProps | null>(null);

  const validateDateInput = (dateArr: number[]): UpdateCalendarProps => {
    if (!(dateArr.length >= 2) && !(dateArr.length <= 3)) {
      return {
        year: 0,
        month: 0,
        day: 0,
      };
    }

    const date = {
      year: 0,
      month: 0,
      day: 0,
    };

    if (/^(19|20)\d{2}$/.test(`${dateArr[0]}`)) {
      date.year = dateArr[0];
    }

    if (dateArr[1] > 0 || dateArr[1] <= 12) {
      date.month = dateArr[1];
    }

    if (dateArr[2] && (dateArr[2] > 0 || dateArr[2] <= 31)) {
      date.day = dateArr[2];
    } else if (!dateArr[2]) {
      date.day = 1;
    }

    return date;
  };

  useEffect(() => {
    if (slug && slug.length === 1 && slug[0] !== "now") {
      return console.warn("improper date input");
    }

    if (slug && Array.isArray(slug) && slug.length >= 2 && slug.length <= 3) {
      const parsedSlug = slug.map((e) => {
        return parseInt(e);
      });
      setDate({ ...validateDateInput(parsedSlug) });
    }
  }, [slug]);

  if (router.isFallback) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Box textAlign="center" w="100%" h="auto" pt="50px" pb="10vh">
      <CalenderContextProvider>
        <Calender {...date} />
      </CalenderContextProvider>
    </Box>
  );
};

export default DateRoute;
