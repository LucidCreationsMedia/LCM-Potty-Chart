import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Heading } from "@chakra-ui/react";

const DateIndex = () => {
  const router = useRouter();

  useEffect(() => {
    if (router) {
      router.push("calendar/now");
    }
  }, [router]);

  return (
    <Box textAlign="center" w="100%" h="auto" pt="50px" pb="10vh">
      <Heading as="h2" size="xl">
        Loading
      </Heading>
    </Box>
  );
};

export default DateIndex;
