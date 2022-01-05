import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import { format } from "date-fns";

interface AddStickerProps {
  isOpen: boolean;
  updateIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  date: Date;
}

const AddSticker = (props: AddStickerProps): JSX.Element => {
  const { isOpen, updateIsOpen, date } = props;

  return (
    <Fragment>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={() => updateIsOpen(!isOpen)}
        motionPreset="slideInBottom"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading textAlign="center" as="h2" size="md" w="100%">
              {format(date, "LLLL do, y")}
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => updateIsOpen(!isOpen)}
            >
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default AddSticker;
