import React from "react";
import { Divider, Heading, VStack } from "@chakra-ui/react";
import Buttons from "../../buttons";

const TutorialLinks = (): JSX.Element => {
  return (
    <VStack
      h="auto"
      w="100%"
      justifyContent="center"
      alignContent="center"
      spacing={4}
    >
      <Heading as="h3" size="lg">
        {"More Info"}
      </Heading>
      <Buttons />
      <Divider orientation="horizontal" />
    </VStack>
  );
};

export default TutorialLinks;
