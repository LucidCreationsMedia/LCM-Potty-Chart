import { Box, Button, Divider, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import CalenderExample from "./CalenderExample";

interface TutorialProps {
  setTutorialComplete: () => void;
  setTempTutorialComplete: () => void;
}

const Tutorial = ({
  setTutorialComplete,
  setTempTutorialComplete
}: TutorialProps): JSX.Element => {
  return (
    <Box>
      <VStack
        h="auto"
        w="auto"
        justifyContent="center"
        alignContent="center"
        my={8}
        mx={4}
        p={4}
        bg="gray.700"
      >
        <VStack
          h="auto"
          w="100%"
          justifyContent="center"
          alignContent="center"
          spacing={2}
        >
          {/* The Heading Container */}
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
            <Divider orientation='horizontal' />
          </VStack>
          {/* About the app container */}
          <VStack
            h="auto"
            w="100%"
            justifyContent="center"
            alignContent="center"
            spacing={4}
          >
            <Heading as="h3" size="lg">
              {"About the App"}
            </Heading>
            <VStack
              h="auto"
              w="100%"
              justifyContent="start"
              alignContent="center"
              spacing={0}
            >
              <Text>{"An app that mimics a potty/star chart for a potty training toddler or child."}</Text>
              <Text>{"It can be used to track behavior, habits, diaper training, potty training (good luck), daily chores/tasks, or anything else you might want to track in a fun and visual way."}</Text>
              <Text>{"The final app will have settings to disable any mention of ABDL to allow a more general audience to use, such as for a master and pet relationship."}</Text>
              <Text>{"This is an alpha build of the app. Some functionality may not work as intended, is fully functional, and may be missing entirely."}</Text>

            </VStack>
          </VStack>
          <Divider orientation='horizontal' />
        </VStack>
        {/* Functionality of the app */}
        <VStack
          h="auto"
          w="100%"
          justifyContent="center"
          alignContent="center"
          spacing={4}
        >
          <Heading as="h3" size="lg" >
            {"Current Functionality"}
          </Heading>
          <VStack
            h="auto"
            w="100%"
            justifyContent="start"
            alignContent="center"
            spacing={2}
          >
            <Text>{"The app will generate stickers to display from the 1st of the month to the day before today. This is to simulate previous and continued use."}</Text>
            <Text>{"Ability to add a sticker to the current date."}</Text>
            <Text>{"Ability to add edit a sticker from a previous date with a confirmation prompt."}</Text>
          </VStack>
          <Divider orientation='horizontal' />
        </VStack>
        {/* Calender Examples Here */}
        <Heading>{"Calender examples here"}</Heading>
        <CalenderExample type={"add"} />
        <CalenderExample type={"edit"} />
        {/* Complete Tutorial buttons */}
        <HStack
          h="auto"
          w="80%"
          justifyContent="space-between"
          alignContent="center"
          pt={8}
        >
          <Button
            type="button"
            onClick={() => setTutorialComplete()}
            variant="secondary"
          >
            {"Complete Tutorial (remember)"}
          </Button>
          <Button
            type="button"
            onClick={() => setTempTutorialComplete()}
            variant="primary"
          >
            {"Complete Tutorial"}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Tutorial;
