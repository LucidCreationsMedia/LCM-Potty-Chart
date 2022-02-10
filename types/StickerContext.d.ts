interface StickersContextState {
  stickersMonth: StickerDays;
  addEditSticker: (date: Date, sticker: ValidStickerVal) => Sticker;
}

type StickerVal = -2 | -1 | 0 | 1 | 2 | null;

type ValidStickerVal = -2 | -1 | 0 | 1 | 2;

interface AddEditStickerProps {
  date: Date;
  sticker: ValidStickerVal;
}

interface Sticker {
  id: string;
  date: Date;
  sticker: StickerVal;
  edited: boolean;
  manual: boolean;
}

type StickerDays = Sticker[];

interface MonthSticker {
  date: Date;
  month: Sticker[];
}
