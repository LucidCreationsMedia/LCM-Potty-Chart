import React, { Fragment, useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateLoading } from "../features/calender";
import {
  clearTutorialCompleted,
  getAndSetTutorial,
  StorageState
} from "../features/tutorial";
import { Box } from "@chakra-ui/react";
import { format, isAfter, isBefore, startOfDay } from "date-fns";
import Calender from "../components/calender";
import Tutorial from "../components/tutorial";
import LoadingOverlay from "../components/loading/LoadingOverlay";
import versionStringToNumber from "../../lib/versionStringToNumber";

const IndexPage = (): JSX.Element => {
  const currDateStr: string = useAppSelector(
    (state) => state.calender.currDate
  );
  const isLoading: boolean = useAppSelector(
    (state) => state.calender.isLoading
  );

  const currDateObj: Date = new Date(currDateStr);

  // * Tutorial * //
  const completedTutorial: boolean = useAppSelector(
    (state) => state.tutorial.completedTutorial
  );
  const tutorialCompletionInfo: StorageState = useAppSelector(
    (state) => state.tutorial.storageState
  );
  const dispatch = useAppDispatch();

  // Get the completed tutorial cookie or have it set to false.
  useEffect(() => {
    if (completedTutorial === null && tutorialCompletionInfo === null) {
      dispatch(getAndSetTutorial());
    }

    if (completedTutorial !== null) {
      dispatch(updateLoading(false));
    }
  }, [completedTutorial, dispatch, tutorialCompletionInfo]);

  // Checking the exp date of completed tutorial cookie and if the version completed is out of date.
  useEffect(() => {
    if (tutorialCompletionInfo !== null) {
      const { exp, version } = tutorialCompletionInfo;
      const currDateObj: Date = new Date(currDateStr);

      /**
       * Checks if the completed tutorial cookie is expired.
       * @param {Date} expDate the date when the completed tutorital cookie expires.
       * @returns {boolean} true if the cookie is expired, false is otherwise.
       */
      const expDateValidator = (expDate: Date): boolean => {
        let flag = false;

        const startOfToday = startOfDay(currDateObj);

        if (isAfter(startOfToday, expDate)) {
          flag = true;
        }

        return flag;
      };

      /**
       * Checks if the last time the completed tutorial is before an update to the tutorial.
       * @param {number} lastVersionCompleted the version number the tutorial was last completed.
       * @returns {boolean} true if the version given is before the changes to the tutorial, false otherwise.
       */
      const versionValidator = (lastVersionCompleted: number): boolean => {
        const lastVersionWithChangeStr: string =
          process.env.NEXT_PUBLIC_NEW_TUTORIAL_VERSION;
        const lastVersionWithChange: number = versionStringToNumber(
          lastVersionWithChangeStr
        );

        const lastUpdatedDateStr: string =
          process.env.NEXT_PUBLIC_LAST_UPDATE_DATE;
        const lastUpdatedDate: Date = new Date(lastUpdatedDateStr);

        let flag = false;

        if (
          lastVersionCompleted < lastVersionWithChange ||
          (lastVersionCompleted === lastVersionWithChange &&
            isBefore(currDateObj, lastUpdatedDate))
        ) {
          flag = true;
          console.error("Completed cookie version is out of date.");
        }

        return flag;
      };

      if (expDateValidator(new Date(exp)) || versionValidator(version)) {
        console.warn("Version outdated or cookie expired.");
        dispatch(clearTutorialCompleted());
      }
    }
  }, [currDateStr, dispatch, tutorialCompletionInfo]);

  // Current date
  const currDate = useRef<UpdateCalenderPropsDateLayout>({
    year: parseInt(format(currDateObj, "y")),
    month: parseInt(format(currDateObj, "M")),
    day: parseInt(format(currDateObj, "d"))
  });

  return (
    <Box textAlign="center" w="100%" h="auto" pt="50px" minWidth="min-content">
      <Provider store={store}>
        {isLoading === true ? (
          <Fragment>
            <LoadingOverlay />
            <Calender date={currDate.current} isLoading={isLoading} />
          </Fragment>
        ) : completedTutorial ? (
          <Calender date={currDate.current} isLoading={isLoading} />
        ) : (
          <Tutorial isLoading={isLoading} />
        )}
      </Provider>
    </Box>
  );
};

export default IndexPage;
