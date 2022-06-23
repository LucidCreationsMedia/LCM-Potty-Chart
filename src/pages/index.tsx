import React, { Fragment, useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateLoading } from "../features/calender";
import { getAndSetTutorial } from "../features/tutorial";
import { Box } from "@chakra-ui/react";
import { format } from "date-fns";
import Calender from "../components/calender";
import Tutorial from "../components/tutorial";
import LoadingOverlay from "../components/loading/LoadingOverlay";

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

  useEffect(() => {
    if (completedTutorial === null && tutorialCompletionInfo === null) {
      dispatch(getAndSetTutorial());
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
          <Tutorial isLoading={isLoading} />
        )}
      </Provider>
    </Box>
  );
};

export default IndexPage;
