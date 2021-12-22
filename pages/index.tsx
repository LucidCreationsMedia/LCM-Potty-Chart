import React, { useRef } from "react";
import { Box } from "@chakra-ui/react";
import Calender from "../components/calender";
import { CalenderContextProvider } from "../contexts/CalenderContext";
import { format } from "date-fns";
import { NewCalenderContextProvider } from "../contexts/NewCalenderContext";

interface UpdateCalendarProps {
  year: number;
  month: number;
  day: number;
}

const IndexPage = (): JSX.Element => {
  const date = useRef<UpdateCalendarProps>({
    year: parseInt(format(new Date(), "y")),
    month: parseInt(format(new Date(), "M")),
    day: parseInt(format(new Date(), "d")),
  });
  return (
    <Box textAlign="center" w="100%" h="auto" pt="50px" pb="10vh">
      <CalenderContextProvider>
        <NewCalenderContextProvider>
          <Calender {...date.current} />
        </NewCalenderContextProvider>
      </CalenderContextProvider>
    </Box>
  );
};

export default IndexPage;
