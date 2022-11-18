import { HStack, Button, VStack, Checkbox } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setTutorialCompleted,
  setTempTutorialComplete,
  toggleRememberCompleted
} from "../../../features/tutorial";

interface TutorialSubmitButtonsProps {
  isLoading: boolean;
}

const TutorialSubmitButtons = ({
  isLoading
}: TutorialSubmitButtonsProps): JSX.Element => {
  const rememberComplete: boolean = useAppSelector(
    (state) => state.tutorial.rememberCompleted
  );
  const dispatch = useAppDispatch();

  const handleComplete = (): void => {
    if (rememberComplete) {
      dispatch(setTutorialCompleted());
    }

    if (!rememberComplete) {
      dispatch(setTempTutorialComplete());
    }
  };

  const handleSkip = (): void => {
    dispatch(setTempTutorialComplete());
  };

  const handleUpdateCheck = (): void => {
    dispatch(toggleRememberCompleted());
  };

  return (
    <HStack
      h="auto"
      w="90%"
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
  );
};

export default TutorialSubmitButtons;
