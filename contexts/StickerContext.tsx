import React, { createContext, useState, ReactNode } from "react";
import stickersSeeder from "../data/stickerSeeder";

const StickersContext = createContext({} as StickersContextState);

const StickersContextProvider = ({
  children
}: {
  children: ReactNode;
}): JSX.Element => {
  const [stickersMonth, setStickersMonth] = useState<StickerDays>(
    stickersSeeder()
  );

  // TODO: Add stickers functions here. (Add and edit stickers).

  // TODO: Add stickers validation function here.

  const stickersContextValues = {
    stickersMonth
  };

  return (
    <StickersContext.Provider value={stickersContextValues}>
      {children}
    </StickersContext.Provider>
  );
};

export { StickersContextProvider, StickersContext };
