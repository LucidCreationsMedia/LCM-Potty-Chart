import { Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";
import React from "react";

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
        w="100%"
        justifyContent="center"
        alignContent="center"
        spacing={6}
      >
        <Heading>{"Tutorial Component"}</Heading>
        <HStack
          h="auto"
          w="80%"
          justifyContent="space-between"
          alignContent="center"
        >
          <Button type="button" onClick={() => setTutorialComplete()}>
            {"Complete Tutorial (remember)"}
          </Button>
          <Button type="button" onClick={() => setTempTutorialComplete()}>
            {"Complete Tutorial"}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Tutorial;
