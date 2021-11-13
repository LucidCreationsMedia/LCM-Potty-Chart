import React from "react";
import { Box, Heading } from "@chakra-ui/react";

const IndexPage = (): JSX.Element => {
  return (
    <Box textAlign="center" w="100%" h="auto" py="10vh">
      <Heading as="h1" size="2xl">
        Hello World
      </Heading>
    </Box>
  );
};

export default IndexPage;
