import React from "react";
import { Divider, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import CalenderExample from "../CalenderExample";

interface CalenderExampleProps {
  isLoading: boolean;
}

const TutorialCalender = ({ isLoading }: CalenderExampleProps): JSX.Element => {
  return (
    <VStack
      h="auto"
      w="100%"
      justifyContent="center"
      alignContent="center"
      spacing={4}
    >
      <Heading as="h3" size="lg">
        {"How to Use The Calender"}
      </Heading>
      <VStack
        h="auto"
        w="100%"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        spacing={4}
      >
        <Heading as="h4" size="md">
          {"Add a Sticker to Today's Date"}
        </Heading>
        <HStack
          w="100%"
          h="auto"
          alignContent="center"
          justifyContent="center"
          spacing={1}
        >
          <Text>{"Select the date with the"}</Text>
          <Text color="#00ff3c">{" green "}</Text>
          <Text>{"border."}</Text>
        </HStack>
        <CalenderExample type={"add"} isLoading={isLoading} />
      </VStack>
      <VStack
        h="auto"
        w="100%"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        spacing={4}
      >
        <Heading as="h4" size="md">
          {"Add a Sticker to Previous Dates"}
        </Heading>
        <HStack
          w="100%"
          h="auto"
          alignContent="center"
          justifyContent="center"
          spacing={1}
        >
          <Text>{"Select a date with a"}</Text>
          <Text color="#00ff3c">{" green "}</Text>
          <Text>{"border."}</Text>
        </HStack>
        <CalenderExample type={"edit"} isLoading={isLoading} />
      </VStack>
      <Divider orientation="horizontal" />
    </VStack>
  );
};

export default TutorialCalender;
