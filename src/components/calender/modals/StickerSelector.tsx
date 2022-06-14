import { HStack, Button } from "@chakra-ui/react";
import React from "react";
import DemoStickers from "../stickers/DemoStickers";

interface StickerSelectorProps {
  stickerSet: "Demo";
  currSticker: StickerVal;
  selectedSticker: StickerVal;
  updateSelectedSticker: React.Dispatch<React.SetStateAction<StickerVal>>;
  initialSticker: React.MutableRefObject<undefined>;
}

/**
 * Handles displaying a list of dynamic stickers to be selected.
 * @param {string} stickerSet The name of the stickers that should be displayed.
 * @param {StickerVal} currSticker The current sticker for the date.
 * @param {StickerVal} selectedSticker The selected sticker for the current. date
 * @param {React.Dispatch<React.SetStateAction<StickerVal>>} updateSelectedSticker TThe react state function to update the selected sticker that will be added or updated.
 * @param {React.MutableRefObject<undefined>} initialSticker the sticker that should have be in focus when the modal opens.
 */

const StickerSelector = ({
  stickerSet,
  currSticker,
  selectedSticker,
  updateSelectedSticker,
  initialSticker
}: StickerSelectorProps): JSX.Element => {
  const stickers = {
    Demo: (
      <HStack
        w="100%"
        h="auto"
        justifyContent="center"
        alignContent="center"
        spacing={14}
      >
        <Button
          isDisabled={currSticker >= 1}
          ref={currSticker <= 1 ? initialSticker : null}
          border={selectedSticker === 1 ? "1px solid #FFF" : "opx"}
          bg={selectedSticker === 1 && "gray.800"}
          onClick={() => updateSelectedSticker(1)}
          variant="stickerButton"
        >
          <DemoStickers stickerVal={1} />
        </Button>
        <Button
          isDisabled={currSticker === 0}
          ref={currSticker >= 1 ? initialSticker : null}
          border={selectedSticker === 0 ? "1px solid #FFF" : "opx"}
          bg={selectedSticker === 0 && "gray.800"}
          onClick={() => updateSelectedSticker(0)}
          variant="stickerButton"
        >
          <DemoStickers stickerVal={0} />
        </Button>
        <Button
          isDisabled={currSticker <= -1}
          border={selectedSticker === -1 ? "1px solid #FFF" : "opx"}
          bg={selectedSticker === -1 && "gray.800"}
          onClick={() => updateSelectedSticker(-1)}
          variant="stickerButton"
        >
          <DemoStickers stickerVal={-1} />
        </Button>
      </HStack>
    )
  };

  return stickers[stickerSet];
};

export default StickerSelector;
