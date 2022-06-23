import React from "react";
import { VStack } from "@chakra-ui/react";
import TutorialCalender from "./sections/TutorialCalender";
import TutorialLinks from "./sections/TutorialLinks";
import TutorialHeading from "./sections/TutorialHeading";
import TutorialAboutApp from "./sections/TutorialAboutApp";
import TutorialSubmitButtons from "./sections/TutorialSubmitButtons";
import TutorialAppFunctionality from "./sections/TutorialAppFunctionality";

interface TutorialProps {
  isLoading: boolean;
}

const Tutorial = ({ isLoading }: TutorialProps): JSX.Element => {
  return (
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
      borderRadius={{ base: "", sm: "2xl" }}
    >
      <TutorialHeading />
      <TutorialAboutApp />
      <TutorialAppFunctionality />
      <TutorialCalender isLoading={isLoading} />
      <TutorialLinks />
      <TutorialSubmitButtons isLoading={isLoading} />
    </VStack>
  );
};

export default Tutorial;
