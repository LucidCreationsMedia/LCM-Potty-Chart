import React, { FC } from "react";

// TODO: When themes are made import the theme from user settings store. Refactor to use whatever those SVGs are.

interface DemoStickersProps {
  stickerVal: StickerVal;
}

const DemoStickers: FC<DemoStickersProps> = ({
  stickerVal
}: DemoStickersProps) => {
  // If sticker is null return an empty space.
  if (stickerVal === null) {
    return <span aria-label="spacer">&nbsp;</span>;
  }

  interface StickerToEmoji {
    [key: string]: JSX.Element;
  }

  /**
   * ? Temporarily using values -1 to 1.
   * ? In the full app the values will be between -2 and 2.
   */
  let key = "0";

  if (stickerVal > 0) {
    key = "1";
  } else if (stickerVal < 0) {
    key = "-1";
  }

  // Link value to an emoji representing a sticker.
  const stickerToEmoji: StickerToEmoji = {
    "1": (
      <span role="img" aria-label="Sun">
        ☀️
      </span>
    ),
    "0": (
      <span role="img" aria-label="Cloud">
        ☁️
      </span>
    ),
    "-1": (
      <span role="img" aria-label="Raining Cloud">
        🌧️
      </span>
    )
  };

  // Return the appropriate sticker.
  return stickerToEmoji[`${key}`];
};

export default DemoStickers;
