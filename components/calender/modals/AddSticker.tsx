import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  HStack,
  VStack
} from "@chakra-ui/react";
import React, { Fragment, useState, useContext } from "react";
import { format } from "date-fns";
import DemoStickers from "../stickers/DemoStickers";
import { StickersContext } from "../../../contexts/StickerContext";

interface AddStickerProps {
  isOpen: boolean;
  updateIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  date: Date;
  updateSticker: React.Dispatch<React.SetStateAction<StickerVal>>;
}

/**
 * Handles adding and modifying the stickers for the given month.
 * @param props the props for this component.
 * @param {boolean} props.isOpen tells the component when the modal should be open.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.updateIsOpen used to close the modal.
 * @param {date} props.date the date for which the sticker will be added or modified.
 * @param {React.Dispatch<React.SetStateAction<StickerVal>>} updateSticker the react state function to update the sticker.
 */
const AddSticker = ({
  isOpen,
  updateIsOpen,
  date,
  updateSticker
}: AddStickerProps): JSX.Element => {
  // TODO: Import the stickers array from the calender context.

  // TODO: Add a function that will add or update the sticker for the current date.

  /**
   * TODO: Add logic into the contents of the modal to show messages if the selected date is out of range.
   * Show a message when a date in the future is selected.
   * Show a message when a date before the current date is selected.
   */

  const [selectedSticker, setSelectedSticker] = useState<StickerVal>(null);

  const { addEditSticker } = useContext(StickersContext);

  const handleClose = () => {
    setSelectedSticker(null);
    updateIsOpen(false);
  };

  const handleSubmit = (sticker) => {
    const newSticker: Sticker = addEditSticker(date, sticker);
    updateSticker(newSticker.sticker);
    handleClose();
  };

  // TODO: Invalidate submit button if the selected sticker is the same as the current sticker.


  // TODO: Display the current sticker above the selection screen if a current sticker exists.

  // TODO: Invalidate the button for the current sticker and gray it out.

  // TODO: Trigger a warning if the date is in the past showing the sticker change.
  // ! DO NOT update the sticker state or trigger the edd/edit function until that new warning is accepted.

  return (
    <Fragment>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={() => handleClose()}
        motionPreset="slideInBottom"
        scrollBehavior="inside"
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading textAlign="center" as="h2" size="md" w="100%" h="auto">
              {`Which sticker did you earn for ${format(date, "LLL d, y")}?`}
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <HStack
                w="100%"
                h="auto"
                justifyContent="center"
                alignContent="center"
                spacing={6}
              >
                <Button
                  border={selectedSticker === 1 ? "1px solid #FFF" : "opx"}
                  bg={selectedSticker === 1 && "gray.800"}
                  onClick={() => setSelectedSticker(1)}
                  variant="stickerButton"
                >
                  <DemoStickers stickerVal={1} />
                </Button>
                <Button
                  border={selectedSticker === 0 ? "1px solid #FFF" : "opx"}
                  bg={selectedSticker === 0 && "gray.800"}
                  onClick={() => setSelectedSticker(0)}
                  variant="stickerButton"
                >
                  <DemoStickers stickerVal={0} />
                </Button>
                <Button
                  border={selectedSticker === -1 ? "1px solid #FFF" : "opx"}
                  bg={selectedSticker === -1 && "gray.800"}
                  onClick={() => setSelectedSticker(-1)}
                  variant="stickerButton"
                >
                  <DemoStickers stickerVal={-1} />
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="primary"
              isDisabled={selectedSticker === null}
              // mr={3}
              onClick={() => handleSubmit(selectedSticker)}
            >
              {"Submit"}
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default AddSticker;
