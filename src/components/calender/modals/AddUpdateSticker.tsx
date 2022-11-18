import React, { useState, useRef } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { addEditSticker } from "../../../features/calender/stickers";
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
import { format, isSameDay } from "date-fns";
import { Icon } from "@iconify/react";
import StickerSelector from "./StickerSelector";
import DemoStickers from "../stickers/DemoStickers";

interface AddStickerProps {
  isOpen: boolean;
  updateIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  stickerDate: string;
  currSticker: StickerVal;
  step: number;
  updateStep: React.Dispatch<React.SetStateAction<number>>;
  selectedSticker: StickerVal;
  updateSelectedSticker: React.Dispatch<React.SetStateAction<StickerVal>>;
  currDate: Date;
}

/**
 * Handles adding and modifying the stickers for the given month.
 * @param {boolean} isOpen Tells the component when the modal should be open.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} updateIsOpen Used to close the modal.
 * @param {date} stickerDate The date for which the sticker will be added or modified.
 * @param {StickerVal} currSticker The current sticker for the date.
 * @param {number} step A numerical variable that represents the page the modal should be at.
 * @param {React.Dispatch<React.SetStateAction<number>>} updateStep Used to navigate the pages of the modal by updating the step the modal is on.
 * @param {StickerVal} selectedSticker the value of the selected sticker.
 * @param {React.Dispatch<React.SetStateAction<StickerVal>>} updateSelectedSticker The react state function to update the selected sticker that will be added or updated.
 * @param {Date} currDate the current date.
 */
const AddUpdateSticker = ({
  isOpen,
  updateIsOpen,
  stickerDate,
  currSticker,
  step,
  updateStep,
  selectedSticker,
  updateSelectedSticker,
  currDate
}: AddStickerProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const stickerDateObj = new Date(stickerDate);

  const [modalVariant] = useState<"add" | "edit">(
    isSameDay(stickerDateObj, currDate) ? "add" : "edit"
  );

  const handleClose = () => {
    updateIsOpen(false);
  };

  // TODO: Validate that the provided sticker is not the current sticker. Throw an error if the same sticker is attempted.
  const handleSubmit = (sticker: StickerVal) => {
    dispatch(addEditSticker({ stickerDate, sticker }));
    handleClose();
  };

  // The first sticker to have focus when the modal opens.
  const initialRef = useRef();

  // * Double check that the submit button is disabled if the selected sticker is the same as the current sticker.

  const variants = {
    add: [
      {
        header: `Which sticker did you earn for ${format(
          stickerDateObj,
          "LLL d, y"
        )}?`,
        body: (
          <VStack
            w="100%"
            h="auto"
            justifyContent="space-between"
            alignContent="center"
            spacing="4"
          >
            <Heading textAlign="center" as="h3" size="md" w="100%" h="auto">
              {"Select a sticker"}
            </Heading>
            <StickerSelector
              stickerSet="Demo"
              currSticker={currSticker}
              selectedSticker={selectedSticker}
              updateSelectedSticker={updateSelectedSticker}
              initialSticker={initialRef}
            />
          </VStack>
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
    edit: [
      {
        header: `Which sticker did you want to update for ${format(
          stickerDateObj,
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
              initialSticker={initialRef}
            />
          </VStack>
        ),
        footer: (
          <Button
            variant="primary"
            isDisabled={
              selectedSticker === null || selectedSticker === currSticker
            }
            onClick={() => updateStep(step + 1)}
          >
            {"Next"}
          </Button>
        )
      },
      {
        header: `Are you sure you want to change the sticker for ${format(
          stickerDateObj,
          "M/d/y"
        )}?`,
        body: (
          <SimpleGrid
            my={{ base: "0px", sm: "6" }}
            mx={{ base: "0px", sm: "10", md: "16" }}
            w="auto"
            h="100%"
            columns={3}
          >
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
            justifyContent="space-between"
            alignContent="center"
          >
            <Button variant="primary" onClick={() => updateStep(step - 1)}>
              {"Previous"}
            </Button>
            <HStack w="auto" h="auto" alignContent="center" spacing={6}>
              <Button
                backgroundColor="transparent"
                _hover={{ backgroundColor: "brand.danger" }}
                onClick={() => updateIsOpen(!isOpen)}
              >
                {"Cancel"}
              </Button>
              <Button
                variant="submit"
                isDisabled={
                  selectedSticker === null || selectedSticker === currSticker
                }
                onClick={() => handleSubmit(selectedSticker)}
              >
                {"Confirm"}
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
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={() => handleClose()}
      motionPreset="slideInBottom"
      scrollBehavior="inside"
      size={modalVariant === "add" ? "xl" : "2xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack
            w="100%"
            h="auto"
            justifyContent="space-between"
            alignContent="center"
          >
            <Heading textAlign="center" as="h2" size="md" w="100%" h="auto">
              {modalVariant && variants[modalVariant][step].header}
            </Heading>
            <Button
              fontSize="2rem"
              px="1"
              onClick={() => updateIsOpen(!isOpen)}
            >
              <Icon icon="bi:x" />
            </Button>
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

export default AddUpdateSticker;
