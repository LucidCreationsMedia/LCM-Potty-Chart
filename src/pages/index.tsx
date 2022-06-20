import React, { Fragment, useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import { addMonths, format } from "date-fns";
import Calender from "../components/calender";
import Tutorial from "../components/tutorial";
import LoadingOverlay from "../components/loading/LoadingOverlay";
import { Provider } from "react-redux";
import { store } from "../app/store";

const IndexPage = (): JSX.Element => {
  const calenderProps = useRef<UpdateCalendarProps>({
    year: parseInt(format(new Date(), "y")),
    month: parseInt(format(new Date(), "M")),
    day: parseInt(format(new Date(), "d"))
  });

  const [completedTutorial, setCompletedTutorial] = useState<boolean | null>(
    null
  );

  const getTutorialCookie = (): boolean => {
    let flag = false;

    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(";");

    cookies.map((val) => {
      const cookie = val.split("=");

      if (cookie.length > 1) {
        const cName = cookie[0].toLowerCase();
        const cVal = JSON.parse(cookie[1]) || cookie[1];

        if (
          cName === "tutorialCompleted".toLowerCase() &&
          cName &&
          cVal &&
          typeof cVal === "boolean"
        ) {
          flag = cVal;
        }
      }
    });
    return flag;
  };

  const setTutorialCookie = (bool: boolean): void => {
    const name = "tutorialCompleted";
    const exp = addMonths(new Date(), 1).toUTCString();

    document.cookie = `${name}=${bool};expires=${exp}'path=/`;
    setCompletedTutorial(bool);
  };

  useEffect(() => {
    setCompletedTutorial(getTutorialCookie());
  }, [completedTutorial]);

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
            <Calender {...calenderProps.current} />
          </Fragment>
        ) : completedTutorial ? (
          <Calender {...calenderProps.current} />
        ) : (
          <Tutorial setTutorialCookie={setTutorialCookie} />
        )}
      </Provider>
    </Box>
  );
};

export default IndexPage;
