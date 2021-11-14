import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import Calender from "../component/calender";

const IndexPage = (): JSX.Element => {
  return (
    <Box textAlign="center" w="100%" h="auto" pt="50px" pb="10vh">
      {Calender ? (
        <Calender />
      ) : (
        <Heading as="h1" size="2xl">
          Hello World
        </Heading>
      )}
    </Box>
  );
};

export default IndexPage;
