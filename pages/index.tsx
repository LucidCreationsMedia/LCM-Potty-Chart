import React from "react";
import { Box } from "@chakra-ui/react";
import Calender from "../components/calender";
import { CalenderContextProvider } from "../contexts/CalenderContext";

const IndexPage = (): JSX.Element => {
  return (
    <Box textAlign="center" w="100%" h="auto" pt="50px" pb="10vh">
      <CalenderContextProvider>
        <Calender date={{ year: 2021, month: 12, day: 1 }} />
      </CalenderContextProvider>
    </Box>
  );
};

export default IndexPage;
