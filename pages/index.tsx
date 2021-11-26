import React from "react";
import { Box } from "@chakra-ui/react";
import Calender from "../components/calender/Calender";

const IndexPage = (): JSX.Element => {
  return (
    <Box textAlign="center" w="100%" h="auto" pt="50px" pb="10vh">
      <Calender />
    </Box>
  );
};

export default IndexPage;
