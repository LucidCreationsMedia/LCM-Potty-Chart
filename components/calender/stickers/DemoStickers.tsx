import React, { FC } from "react";

// TODO: When themes are made import the theme from user settings context. Refactor to use whatever those SVGs are.

interface DemoStickersProps {
  stickerVal: StickerVal;
}

const DemoStickers: FC<DemoStickersProps> = ({
  stickerVal
}: DemoStickersProps) => {
  interface StickerToEmoji {
    [key: string]: JSX.Element;
  }

  let key = "0";

  if (stickerVal > 0) {
    key = "1";
  } else if (stickerVal < 0) {
    key = "-1";
  }

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

  return stickerToEmoji[`${key}`];
};

export default DemoStickers;
