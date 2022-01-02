import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  // Lorem
} from "@chakra-ui/react";
import React, { Fragment, useState } from "react";

const AddSticker = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <Button onClick={() => setIsOpen(!isOpen)}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => setIsOpen(!isOpen)}
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
