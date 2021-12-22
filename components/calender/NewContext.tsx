import React, { useContext } from "react";
import { Box, Text } from "@chakra-ui/react";
import { NewCalenderContext } from "../../contexts/NewCalenderContext";

const NewContext = (): JSX.Element => {
  const { selectedMonthInfo } = useContext(NewCalenderContext);
  const { date } = selectedMonthInfo;

  return (
    <Box>
      <Text>{`New Context Was Provided. Selected date is ${date}`}</Text>
    </Box>
  );
};

export default NewContext;
