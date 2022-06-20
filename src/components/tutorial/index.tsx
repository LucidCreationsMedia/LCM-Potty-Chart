import { Box, Button, Heading } from "@chakra-ui/react";
import React from "react";

interface TutorialProps {
  setTutorialCookie: (bool: boolean) => void;
}

const Tutorial = ({ setTutorialCookie }: TutorialProps): JSX.Element => {
  const handleSetCookieButton = (): void => {
    setTutorialCookie(true);
  };
  return (
    <Box>
      <Heading>{"Tutorial Component"}</Heading>
      <Button type="button" onClick={() => handleSetCookieButton()}>
        {"Complete Tutorial"}
      </Button>
    </Box>
  );
};

export default Tutorial;
