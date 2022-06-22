import {
  Box,
  Button,
  Checkbox,
  Divider,
  Heading,
  HStack,
  Text,
  VStack
} from "@chakra-ui/react";
import React, { useState } from "react";
import CalenderExample from "./CalenderExample";

interface TutorialProps {
  setTutorialComplete: () => void;
  setTempTutorialComplete: () => void;
}

const Tutorial = ({
  setTutorialComplete,
  setTempTutorialComplete
}: TutorialProps): JSX.Element => {
  const [rememberComplete, setRememberComplete] = useState<boolean>(false);

  const handleComplete = (): void => {
    if (rememberComplete) {
      setTutorialComplete();
    }

    if (!rememberComplete) {
      setTempTutorialComplete();
    }
  };

  const handleSkip = (): void => {
    setTempTutorialComplete();
  };

  const handleUpdateCheck = (): void => {
    setRememberComplete(!rememberComplete);
  };

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
            <Divider orientation="horizontal" />
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
              <Text>
                {
                  "An app that mimics a potty/star chart for a potty training toddler or child."
                }
              </Text>
              <Text>
                {
                  "It can be used to track behavior, habits, diaper training, potty training (good luck), daily chores/tasks, or anything else you might want to track in a fun and visual way."
                }
              </Text>
              <Text>
                {
                  "The final app will have settings to disable any mention of ABDL to allow a more general audience to use, such as for a master and pet relationship."
                }
              </Text>
              <Text>
                {
                  "This is an alpha build of the app. Some functionality may not work as intended, is fully functional, and may be missing entirely."
                }
              </Text>
            </VStack>
          </VStack>
          <Divider orientation="horizontal" />
        </VStack>
        {/* Functionality of the app */}
        <VStack
          h="auto"
          w="100%"
          justifyContent="center"
          alignContent="center"
          spacing={4}
        >
          <Heading as="h3" size="lg">
            {"Current Functionality"}
          </Heading>
          <VStack
            h="auto"
            w="100%"
            justifyContent="start"
            alignContent="center"
            spacing={2}
          >
            <Text>
              {
                "The app will generate stickers to display from the 1st of the month to the day before today. This is to simulate previous and continued use."
              }
            </Text>
            <Text>{"Ability to add a sticker to the current date."}</Text>
            <Text>
              {
                "Ability to add edit a sticker from a previous date with a confirmation prompt."
              }
            </Text>
          </VStack>
          <Divider orientation="horizontal" />
        </VStack>
        {/* Calender Demos */}
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
            justifyContent="start"
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
              <Text>{"Select the date with a"}</Text>
              <Text color="#00ff3c">{" green "}</Text>
              <Text>{"border."}</Text>
            </HStack>
            <CalenderExample type={"add"} />
          </VStack>
          <VStack
            h="auto"
            w="100%"
            justifyContent="start"
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
            <CalenderExample type={"edit"} />
          </VStack>
          <Divider orientation="horizontal" />
        </VStack>
        {/* Complete tutorial */}
        <HStack
          h="auto"
          w="80%"
          justifyContent="space-between"
          alignItems="flex-start"
          pt={8}
        >
          <Button type="button" onClick={() => handleSkip()} variant="skip">
            {"Skip"}
          </Button>
          <VStack
            h="auto"
            w="auto"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Button
              type="button"
              onClick={() => handleComplete()}
              variant="primary"
            >
              {"Complete Tutorial"}
            </Button>
            <Checkbox
              isChecked={rememberComplete}
              onChange={() => handleUpdateCheck()}
            >
              {"Remember completed?"}
            </Checkbox>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Tutorial;
