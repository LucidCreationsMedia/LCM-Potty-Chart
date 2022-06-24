import React from "react";
import { Spinner } from "@chakra-ui/react";

const LoadingSpinner = (): JSX.Element => {
  return (
    <Spinner
      thickness="4px"
      speed="0.50s"
      emptyColor="loading.spinnerEmptySpace"
      color="loading.spinnerColor"
      size="xl"
    />
  );
};

export default LoadingSpinner;
