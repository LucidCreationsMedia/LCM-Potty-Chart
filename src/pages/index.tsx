import React, { useRef } from "react";
import { Box } from "@chakra-ui/react";
import { format } from "date-fns";
import { Provider } from "react-redux";
import { store } from "../app/store";
import Calender from "../components/calender";

const IndexPage = (): JSX.Element => {
  const date = useRef<UpdateCalendarProps>({
    year: parseInt(format(new Date(), "y")),
    month: parseInt(format(new Date(), "M")),
    day: parseInt(format(new Date(), "d"))
  });

  return (
    <Box textAlign="center" w="100%" h="auto" pt="50px" pb="10vh">
      <Provider store={store}>
        <Calender {...date.current} />
      </Provider>
    </Box>
  );
};

export default IndexPage;
