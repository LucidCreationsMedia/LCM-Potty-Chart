import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Heading,
  HStack,
  Text,
  VStack,
  SimpleGrid,
  Box
} from "@chakra-ui/react";
import React, { useState, useContext, Fragment } from "react";
import { format, isSameDay } from "date-fns";
import { Icon } from "@iconify/react";
import { StickersContext } from "../../../contexts/StickerContext";
import StickerSelector from "./StickerSelector";
import DemoStickers from "../stickers/DemoStickers";

interface AddStickerProps {
  isOpen: boolean;
  updateIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  date: Date;
  updateSticker: React.Dispatch<React.SetStateAction<StickerVal>>;
  currSticker: StickerVal;
  step: number;
  updateStep: React.Dispatch<React.SetStateAction<number>>;
  selectedSticker: StickerVal;
  updateSelectedSticker: React.Dispatch<React.SetStateAction<StickerVal>>;
}

/**
 * Handles adding and modifying the stickers for the given month.
 * @param {boolean} isOpen tells the component when the modal should be open.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} updateIsOpen used to close the modal.
 * @param {date} date the date for which the sticker will be added or modified.
 * @param {React.Dispatch<React.SetStateAction<StickerVal>>} updateSticker the react state function to update the sticker.
 * @param {StickerVal} currSticker the current sticker for the date.
 * @param {number} step a numerical variable that represents the page the modal should be at.
 * @param {React.Dispatch<React.SetStateAction<number>>} updateStep used to navigate the pages of the modal by updating the step the modal is on.
 */
const AddSticker = ({
  isOpen,
  updateIsOpen,
  date,
  updateSticker,
  currSticker,
  step,
  updateStep,
  selectedSticker,
  updateSelectedSticker
}: AddStickerProps): JSX.Element => {
  // TODO: Import the stickers array from the calender context.

  // TODO: Add a function that will add or update the sticker for the current date.

  /**
   * TODO: Add logic into the contents of the modal to show messages if the selected date is out of range.
   * Show a message when a date in the future is selected.
   * Show a message when a date before the current date is selected.
   */

  const { addEditSticker } = useContext(StickersContext);

  const [modalVariant] = useState<"currDate" | "notCurrDate">(
    isSameDay(date, new Date()) ? "currDate" : "notCurrDate"
  );

  // ! Step is not setting back to 0 when modal is closet. Try to move out of this component and take it in as an arg.

  const handleClose = () => {
    updateIsOpen(false);
  };

  // TODO: Validate that the provided sticker is not the current sticker. Throw an error if the same sticker is attempted.
  const handleSubmit = (sticker) => {
    const newSticker: Sticker = addEditSticker(date, sticker);
    updateSticker(newSticker.sticker);
    handleClose();
  };

  // * Double check that the submit button is disabled if the selected sticker is the same as the current sticker.

  // TODO: Display the current sticker above the selection screen if a current sticker exists.

  // TODO: Trigger a warning if the date is in the past showing the sticker change.
  // ! DO NOT update the sticker state or trigger the edd/edit function until that new warning is accepted.

  const variants = {
    currDate: [
      {
        header: `Which sticker did you earn for ${format(date, "LLL d, y")}?`,
        body: (
          <StickerSelector
            stickerSet="Demo"
            currSticker={currSticker}
            selectedSticker={selectedSticker}
            updateSelectedSticker={updateSelectedSticker}
          />
        ),
        footer: (
          <Button
            variant="submit"
            isDisabled={
              selectedSticker === null || selectedSticker === currSticker
            }
            onClick={() => handleSubmit(selectedSticker)}
          >
            {"Submit"}
          </Button>
        )
      }
    ],
    notCurrDate: [
      {
        header: `Which sticker did you want to update for ${format(
          date,
          "LLL d, y"
        )}?`,
        body: (
          <VStack
            w="100%"
            h="auto"
            justifyContent="space-between"
            alignContent="center"
          >
            <Heading textAlign="center" as="h3" size="md" w="100%" h="auto">
              {"Current Sticker"}
            </Heading>
            <Text fontSize="4rem">
              <DemoStickers stickerVal={currSticker} />
            </Text>
            <Heading textAlign="center" as="h3" size="md" w="100%" h="auto">
              {"Select your new sticker"}
            </Heading>
            <StickerSelector
              stickerSet="Demo"
              currSticker={currSticker}
              selectedSticker={selectedSticker}
              updateSelectedSticker={updateSelectedSticker}
            />
          </VStack>
        ),
        footer: (
          <Button
            variant="primary"
            // isDisabled={
            //   selectedSticker === null || selectedSticker === currSticker
            // }
            onClick={() => updateStep(step + 1)}
          >
            {"Next"}
          </Button>
        )
      },
      {
        header: `Are you sure you want to change the sticker for ${format(
          date,
          "M/d/y"
        )}?`,
        body: (
          <SimpleGrid my="1.5rem" mx="5rem" w="auto" h="100%" columns={3}>
            <Heading textAlign="center" as="h3" size="md" w="100%" h="auto">
              {"Previous Sticker"}
            </Heading>
            <Box></Box>
            <Heading textAlign="center" as="h3" size="md" w="100%" h="auto">
              {"New Sticker"}
            </Heading>
            <Text textAlign="center" w="100%" fontSize="4rem">
              <DemoStickers stickerVal={currSticker} />
            </Text>
            <Box fontSize="4rem" m="auto">
              <Icon fontSize="4rem" icon="bi:arrow-right" />
            </Box>
            <Text textAlign="center" w="100%" fontSize="4rem">
              <DemoStickers stickerVal={selectedSticker} />
            </Text>
          </SimpleGrid>
        ),
        footer: (
          <HStack
            w="100%"
            h="auto"
            justifyContent={"space-between"}
            alignContent={"center"}
          >
            <Button variant="primary" onClick={() => updateStep(step - 1)}>
              {"Previous"}
            </Button>
            <HStack w="auto" h="auto" alignContent={"center"} spacing={6}>
              <Button
                variant="submit"
              isDisabled={
                selectedSticker === null || selectedSticker === currSticker
              }
              onClick={() => handleSubmit(selectedSticker)}
              >
                {"Confirm"}
              </Button>
              <Button
                backgroundColor="transparent"
                _hover={{ backgroundColor: "brand.danger" }}
                onClick={() => updateIsOpen(!isOpen)}
              >
                {"Cancel"}
              </Button>
            </HStack>
          </HStack>
        )
      }
    ]
  };

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={() => handleClose()}
      motionPreset="slideInBottom"
      scrollBehavior="inside"
      size={modalVariant === "currDate" ? "xl" : "2xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack
            w="100%"
            h="auto"
            justifyContent={"space-between"}
            alignContent={"center"}
          >
            <Heading textAlign="center" as="h2" size="md" w="100%" h="auto">
              {modalVariant && variants[modalVariant][step].header}
            </Heading>
            <Button onClick={() => updateIsOpen(!isOpen)}>{"X"}</Button>
          </HStack>
        </ModalHeader>
        <ModalBody>
          {modalVariant && variants[modalVariant][step].body}
        </ModalBody>
        <ModalFooter>
          {modalVariant && variants[modalVariant][step].footer}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddSticker;
