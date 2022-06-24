import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addMonths, endOfDay } from "date-fns";
import versionStringToNumber from "../../../lib/versionStringToNumber";

export interface StorageState {
  exp: string;
  version: number;
  completed: boolean;
}

const endOfToday: Date = endOfDay(new Date());

const generateExpDate = (): string => {
  return endOfDay(addMonths(endOfToday, 1)).toJSON();
};

const generateVersion = (): number => {
  const versionStr: string = process.env.NEXT_PUBLIC_APP_VERSION;

  return versionStringToNumber(versionStr);
};

// * Storage Helpers * //

const setTempStorage = (storageState: StorageState): void => {
  sessionStorage.setItem("completedTutorial", JSON.stringify(storageState));
};

const getTempStorage = (): StorageState | null => {
  return JSON.parse(sessionStorage.getItem("completedTutorial"));
};

const clearTempStorage = (): void => {
  sessionStorage.removeItem("completedTutorial");
};

const setStorage = (storageState: StorageState): void => {
  localStorage.setItem("completedTutorial", JSON.stringify(storageState));
};

const getStorage = (): StorageState | null => {
  return JSON.parse(localStorage.getItem("completedTutorial"));
};

const clearStorage = (): void => {
  localStorage.removeItem("completedTutorial");
};

interface TutorialSlice {
  completedTutorial: boolean | null;
  storageState: StorageState | null;
  rememberCompleted: boolean;
  currWeek: MonthDay[] | null;
}

const initialState: TutorialSlice = {
  completedTutorial: null,
  storageState: null,
  rememberCompleted: false,
  currWeek: null
};

const tutorialSlice = createSlice({
  name: "Tutorial",
  initialState,
  reducers: {
    // Set temp complete
    setTempTutorialComplete(state: TutorialSlice) {
      const exp: string = generateExpDate();
      const version: number = generateVersion();
      const storageState: StorageState = {
        exp,
        version,
        completed: true
      };

      setTempStorage(storageState);
      state.storageState = storageState;
      state.completedTutorial = true;
    },
    // Set completed (remember)
    setTutorialCompleted(state: TutorialSlice) {
      const exp: string = generateExpDate();
      const version: number = generateVersion();
      const storageState: StorageState = {
        exp,
        version,
        completed: true
      };

      setStorage(storageState);
      state.storageState = storageState;
      state.completedTutorial = true;
    },
    // Clear states and storages
    clearTutorialCompleted(state: TutorialSlice) {
      clearTempStorage();
      clearStorage();
      state.storageState = null;
      state.completedTutorial = null;
    },
    // Get and set states
    getAndSetTutorial(state: TutorialSlice) {
      const temp = getTempStorage();
      const local = getStorage();

      if (temp !== null || local !== null) {
        state.storageState = temp !== null ? temp : local;
        state.completedTutorial =
          temp !== null ? temp.completed : local.completed;
      }

      if (temp === null && local === null) {
        state.completedTutorial = false;
      }
    },
    // Toggle remember completed
    toggleRememberCompleted(state: TutorialSlice) {
      const { rememberCompleted } = state;

      state.rememberCompleted = !rememberCompleted;
    },
    // Set current week
    setCurrentWeek(state: TutorialSlice, action: PayloadAction<MonthDay[]>) {
      const { payload } = action;

      state.currWeek = payload;
    }
  }
});

export const {
  setTempTutorialComplete,
  setTutorialCompleted,
  clearTutorialCompleted,
  getAndSetTutorial,
  toggleRememberCompleted,
  setCurrentWeek
} = tutorialSlice.actions;
export default tutorialSlice.reducer;
