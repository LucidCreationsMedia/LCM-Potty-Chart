import { createSlice/*, PayloadAction*/ } from "@reduxjs/toolkit";
import { addMonths } from "date-fns";

interface StorageState {
  exp: string;
  version: string;
  completed: boolean;
}

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
}

const initialState: TutorialSlice = {
  completedTutorial: null,
  storageState: null
};

const tutorialSlice = createSlice({
  name: "Tutorial",
  initialState,
  reducers: {
    // Set temp complete
    setTempTutorialComplete(state: TutorialSlice) {
      const exp: string = addMonths(new Date(), 1).toJSON();
      const version: string = process.env.NEXT_PUBLIC_APP_VERSION.split("-")[0];
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
      const exp: string = addMonths(new Date(), 1).toJSON();
      const version: string = process.env.NEXT_PUBLIC_APP_VERSION.split("-")[0];
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
    }
  }
});

export const {
  setTempTutorialComplete,
  setTutorialCompleted,
  clearTutorialCompleted,
  getAndSetTutorial
} = tutorialSlice.actions;
export default tutorialSlice.reducer;
