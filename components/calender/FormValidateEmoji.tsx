import React, { FC } from "react";

interface EmojiValidateEmojiProps {
  type: string;
}

const EmojiValidateEmoji: FC<EmojiValidateEmojiProps> = ({
  type,
}: EmojiValidateEmojiProps) => {
  interface Validations {
    [key: string]: JSX.Element;
  }

  const validations: Validations = {
    Required: (
      <span role="img" aria-label="Explication Mark">
        ❗
      </span>
    ),
    Error: (
      <span role="img" aria-label="X">
        ❌
      </span>
    ),
    Valid: (
      <span role="img" aria-label="Check">
        ✔
      </span>
    ),
  };

  return validations[`${type}`];
};

export default EmojiValidateEmoji;
