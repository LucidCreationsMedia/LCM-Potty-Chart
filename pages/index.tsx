import React from "react";
import { Box } from "@chakra-ui/react";
import Calender from "../components/calender/Calender";
import { CalenderContextProvider } from "../contexts/CalenderContext";

const IndexPage = (): JSX.Element => {
  return (
    <Box textAlign="center" w="100%" h="auto" pt="50px" pb="10vh">
      <CalenderContextProvider>
        <Calender />
      </CalenderContextProvider>
    </Box>
  );
};

export default IndexPage;
