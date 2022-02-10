import React, { createContext, useState, ReactNode } from "react";
import { format, getDate, isBefore, startOfDay } from "date-fns";
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
  const addEditSticker = (date: Date, sticker: ValidStickerVal): Sticker => {
    const newStickersMonth = stickersMonth.slice();
    const index = getDate(date) - 1;
    const currDate = newStickersMonth[index];

    const edited = currDate.edited
      ? true
      : isBefore(currDate.date, startOfDay(new Date()))
      ? true
      : false;
    currDate.edited = edited;
    // Add manual here when necessary.

    const id = format(date, "yyyyddLL") + sticker;

    const newSticker: Sticker = {
      id: id,
      date: date,
      sticker: sticker,
      edited: edited,
      manual: false
    };

    newStickersMonth[index] = newSticker;

    setStickersMonth(newStickersMonth.slice());

    return newSticker;
  };

  // TODO: Add stickers validation function here.

  const stickersContextValues = {
    stickersMonth,
    addEditSticker
  };

  return (
    <StickersContext.Provider value={stickersContextValues}>
      {children}
    </StickersContext.Provider>
  );
};

export { StickersContextProvider, StickersContext };
