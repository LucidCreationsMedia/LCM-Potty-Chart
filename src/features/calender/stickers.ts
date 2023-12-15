import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format, getDate, isSameDay } from "date-fns";
import stickersSeeder from "../../../data/stickerSeeder";

interface StickersSlice {
  stickersMonth: StickerDays;
}

interface UpdateStickerSlicePayload {
  stickerDate: string;
  sticker: StickerVal;
}

const initialState: StickersSlice = {
  stickersMonth: stickersSeeder()
};

const stickersSlice = createSlice({
  name: "Stickers",
  initialState,
  reducers: {
    addEditSticker(
      state: StickersSlice,
      actions: PayloadAction<UpdateStickerSlicePayload>
    ) {
      const { stickerDate, sticker } = actions.payload;

      const dateObj = new Date(stickerDate);

      // Getting index for the stickers array, sticker from the stickers array, and the date from the sticker.
      const index: number = getDate(dateObj) - 1;
      const currSticker: Sticker = state.stickersMonth[index];

      // Updating the edited status by checking if the sticker date is today's date.
      const edited = currSticker.edited
        ? true
        : isSameDay(new Date(stickerDate), new Date())
          ? false
          : true;
      currSticker.edited = edited;

      // TODO: Add manually added here.

      // Updating the id of the sticker.
      const id = format(dateObj, "yyyyddLL") + sticker;

      // Updating the information of the sticker.
      const newSticker: Sticker = {
        id: id,
        date: stickerDate,
        sticker: sticker,
        edited: edited,
        manual: false
      };

      state.stickersMonth[index] = newSticker;
    }
  }
});

export const { addEditSticker } = stickersSlice.actions;
export default stickersSlice.reducer;
