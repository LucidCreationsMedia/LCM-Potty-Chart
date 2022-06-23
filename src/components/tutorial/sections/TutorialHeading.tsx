import React from "react";
import { VStack, Heading, Divider } from "@chakra-ui/react";

const TutorialHeading = (): JSX.Element => {
  return (
    <VStack
      h="auto"
      w="100%"
      justifyContent="center"
      alignContent="center"
      spacing={4}
    >
      <Heading as="h2">{"Welcome to Code Name: LCM Potty Chart"}</Heading>
      <Heading as="h3" size="md">
        {"A Lucid Creations Media Project"}
      </Heading>
      <Divider orientation="horizontal" />
    </VStack>
  );
};

export default TutorialHeading;
