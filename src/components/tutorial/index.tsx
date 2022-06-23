import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleRememberCompleted } from "../../features/tutorial";
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
import CustomButton from "../buttons/Custom";
import Patreon from "../buttons/Patreon";
import Twitter from "../buttons/Twitter";
import CalenderExample from "./CalenderExample";

interface TutorialProps {
  setTutorialComplete: () => void;
  setTempTutorialComplete: () => void;
  isLoading: boolean;
}

const Tutorial = ({
  setTutorialComplete,
  setTempTutorialComplete,
  isLoading
}: TutorialProps): JSX.Element => {
  const rememberComplete = useAppSelector(
    (state) => state.tutorial.rememberCompleted
  );
  const dispatch = useAppDispatch();

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
    dispatch(toggleRememberCompleted());
  };

  // TODO: Add an expiration validator.
  // TODO: Add a version validator that removed the completed tutorial storages when there were major changes to the tutorial.
  // * The changes are tracked via env variables. The last version that user saw the tutorial is saved in storage.

  // TODO: Break up this component into reusable components that will generate headers and the content section.
  // * Pass in if the component to be generated is the last component so the dividers can be conditionally rendered.
  // * Pass in the type of component: text, calender, type of calender.

  return (
    <Box>
      <VStack
        h="auto"
        w="auto"
        justifyContent="center"
        alignContent="center"
        my={8}
        mx={{ base: 0, sm: 2, md: 4 }}
        py={4}
        px={{ base: 0, sm: 2, md: 4 }}
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
              spacing={1}
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
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            spacing={1}
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
              <Text>{"Select the date with a"}</Text>
              <Text color="#00ff3c">{" green "}</Text>
              <Text>{"border."}</Text>
            </HStack>
            <CalenderExample type={"add"} />
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
            <CalenderExample type={"edit"} />
          </VStack>
          <Divider orientation="horizontal" />
        </VStack>
        {/* Links */}
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
          <HStack
            h="auto"
            w="100%"
            justifyContent="center"
            alignContent="center"
            spacing={4}
          >
            <CustomButton
              link={
                "https://docs.google.com/document/d/1hrerGKHTO3iach8A-CabtfIB4lyZWlgO8EGTyOCrI2Y"
              }
              text="Roadmap and Progress"
              type="secondary"
            />
            <CustomButton
              link={
                "https://lucidcreations.media/introducing-code-name-potty-chart/"
              }
              text="Original Announcement"
              type="secondary"
            />
            <Patreon />
            <Twitter />
          </HStack>
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
          <Button
            type="button"
            isDisabled={isLoading}
            onClick={() => handleSkip()}
            variant="skip"
          >
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
              isDisabled={isLoading}
              onClick={() => handleComplete()}
              variant="primary"
            >
              {"Complete Tutorial"}
            </Button>
            <Checkbox
              isChecked={rememberComplete}
              isDisabled={isLoading}
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
