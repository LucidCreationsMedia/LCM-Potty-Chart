import React, { Fragment, useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import { addMonths, format } from "date-fns";
import Calender from "../components/calender";
import Tutorial from "../components/tutorial";
import LoadingOverlay from "../components/loading/LoadingOverlay";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateLoading } from "../features/calender/calender";

const IndexPage = (): JSX.Element => {
  const isLoading = useAppSelector((state) => state.calender.isLoading);
  const dispatch = useAppDispatch();

  const currDate = useRef<UpdateCalenderPropsDateLayout>({
    year: parseInt(format(new Date(), "y")),
    month: parseInt(format(new Date(), "M")),
    day: parseInt(format(new Date(), "d"))
  });

  const [completedTutorial, setCompletedTutorial] = useState<boolean | null>(
    null
  );

  const getTutorialCookie = (): boolean => {
    return JSON.parse(localStorage.getItem("tutorialCompleted")) || false;
  };

  const setTutorialCookie = (bool: boolean): void => {
    localStorage.setItem("tutorialCompleted", `${bool}`);
    setCompletedTutorial(true);
  };

  useEffect(() => {
    if (completedTutorial !== null) {
      dispatch(updateLoading(false));
    }
    setCompletedTutorial(getTutorialCookie());
  }, [completedTutorial, dispatch]);

  return (
    <Box
      textAlign="center"
      w="100%"
      h="auto"
      pt="50px"
      pb="10vh"
      minWidth="min-content"
    >
      <Provider store={store}>
        {completedTutorial === null ? (
          <Fragment>
            <LoadingOverlay />
            <Calender date={currDate.current} isLoading={isLoading} />
          </Fragment>
        ) : completedTutorial ? (
          <Calender date={currDate.current} isLoading={isLoading} />
        ) : (
          <Tutorial setTutorialCookie={setTutorialCookie} />
        )}
      </Provider>
    </Box>
  );
};

export default IndexPage;
