import React from "react";
import { VStack, Heading, Divider, Text } from "@chakra-ui/react";
import appFunctionality from "../data/appFunctionality";

const TutorialAppFunctionality = (): JSX.Element => {
  return (
    <VStack
      h="auto"
      w="100%"
      justifyContent="center"
      alignContent="center"
      spacing={4}
    >
      <Heading as="h3" size="lg">
        {"App Functionality"}
      </Heading>
      <VStack
        h="auto"
        w="100%"
        justifyContent="start"
        alignContent="center"
        spacing={1}
      >
        {appFunctionality.map((string: string) => {
          return <Text key={string.replaceAll(" ", "-")}>{string}</Text>;
        })}
      </VStack>
      <Divider orientation="horizontal" />
    </VStack>
  );
};

export default TutorialAppFunctionality;
