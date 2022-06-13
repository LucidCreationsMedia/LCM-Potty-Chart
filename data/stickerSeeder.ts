import {
  format,
  getDaysInMonth,
  isBefore,
  setDate,
  startOfDay
} from "date-fns";

/**
 * This seeder is to simulate the date and sticker info from the database.
 * Filling up an array for the current month with sticker from ths first to
 * the day before the current date, leaving the rest of the month empty.
 */

const generateSticker = (): -2 | -1 | 0 | 1 | 2 => {
  const sticker = Math.floor(Math.random() * (2 - -2 + 1)) + -2;

  if (
    sticker === -2 ||
    sticker === -1 ||
    sticker === 0 ||
    sticker === 1 ||
    sticker === 2
  ) {
    return sticker;
  }
};

const stickersSeeder = (): StickerDays => {
  const stickers = [] as Sticker[];

  const now = startOfDay(new Date());
  const daysOfThisMonth = getDaysInMonth(now);

  for (let i = 1; i <= daysOfThisMonth; i++) {
    const currDate = setDate(now, i);

    const sticker = isBefore(currDate, now) ? generateSticker() : null;

    const id =
      format(currDate, "yyyyddLL") + `/${sticker === null ? 0 : sticker}`;

    const newSticker: Sticker = {
      id: id,
      date: currDate.toJSON(),
      sticker: sticker,
      edited: false,
      manual: false
    };

    stickers.push(newSticker);
  }

  if (stickers.length === daysOfThisMonth) {
    return stickers;
  }
};

export default stickersSeeder;
