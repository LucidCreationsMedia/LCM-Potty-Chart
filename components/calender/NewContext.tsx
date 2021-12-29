import React, { useContext } from "react";
import { Box, Text } from "@chakra-ui/react";
import { NewCalenderContext } from "../../contexts/NewCalenderContext";

const NewContext = (): JSX.Element => {
  const { selectedDate } = useContext(NewCalenderContext);

  return (
    <Box>
      <Text>{`New Context Was Provided. Selected date is ${selectedDate}`}</Text>
    </Box>
  );
};

export default NewContext;
