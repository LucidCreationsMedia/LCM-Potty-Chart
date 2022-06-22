import React, { Fragment, useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { format } from "date-fns";
import Calender from "../components/calender";
import Tutorial from "../components/tutorial";
import LoadingOverlay from "../components/loading/LoadingOverlay";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateLoading } from "../features/calender";
import {
  getAndSetTutorial,
  setTempTutorialComplete,
  setTutorialCompleted
} from "../features/tutorial";

const IndexPage = (): JSX.Element => {
  const isLoading = useAppSelector((state) => state.calender.isLoading);
  const completedTutorial = useAppSelector(
    (state) => state.tutorial.completedTutorial
  );
  const tutorialCompletionInfo = useAppSelector(
    (state) => state.tutorial.storageState
  );
  const dispatch = useAppDispatch();

  const currDate = useRef<UpdateCalenderPropsDateLayout>({
    year: parseInt(format(new Date(), "y")),
    month: parseInt(format(new Date(), "M")),
    day: parseInt(format(new Date(), "d"))
  });

  const handleTempTutorialCompleted = (): void => {
    dispatch(setTempTutorialComplete());
  };

  const handleTutorialCompleted = (): void => {
    dispatch(setTutorialCompleted());
  };

  useEffect(() => {
    if (completedTutorial === null || tutorialCompletionInfo === null) {
      dispatch(getAndSetTutorial());
      dispatch(updateLoading(false));
    }

    if (completedTutorial !== null) {
      dispatch(updateLoading(false));
    }
  }, [completedTutorial, dispatch, tutorialCompletionInfo]);

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
          <Tutorial
            setTutorialComplete={handleTutorialCompleted}
            setTempTutorialComplete={handleTempTutorialCompleted}
          />
        )}
      </Provider>
    </Box>
  );
};

export default IndexPage;
