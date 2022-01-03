import { getDaysInMonth, getYear, getMonth, isBefore } from "date-fns";

/**
 * This seeder is to simulate the date and sticker info from the database.
 * Filling up an array for the current month with sticker from ths first to
 * the day before the current date, leaving the rest of the month empty.
 */

const generateSticker = (): -2 | -1 | 0 | 1 | 2 => {
  const stickerPossibility = [-2, -1, 0, 1, 2];
  const sticker = Math.floor(Math.random() * stickerPossibility.length);

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

const stickersSeeder = (): Sticker[] => {
  const stickers = [] as Sticker[];

  const now = new Date();
  const daysOfThisMonth = getDaysInMonth(now);

  for (let i = 0; i <= daysOfThisMonth; i++) {
    const currDate = new Date(getYear(now), getMonth(now) - 1, i);

    const newSticker: Sticker = {
      date: currDate,
      sticker: isBefore(currDate, now) ? generateSticker() : null
    };

    stickers.push(newSticker);
  }

  if (stickers.length === daysOfThisMonth) {
    return stickers;
  }
};

export default stickersSeeder;
