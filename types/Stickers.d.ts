type StickerVal = -2 | -1 | 0 | 1 | 2 | null;

type ValidStickerVal = -2 | -1 | 0 | 1 | 2;

interface AddEditStickerProps {
  date: Date;
  sticker: ValidStickerVal;
}

interface Sticker {
  id: string;
  date: string;
  sticker: StickerVal;
  edited: boolean;
  manual: boolean;
}

type StickerDays = Sticker[];

interface StickerModal {
  isOpen: boolean;
  selectedSticker: StickerVal;
  step: number;
}
