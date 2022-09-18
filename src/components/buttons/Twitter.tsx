import React from "react";
import { Box, Link, Button, BoxProps } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const MotionBox = motion<BoxProps>(Box);

const Twitter = (): JSX.Element => {
  return (
    <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Link
        href="https://twitter.com/LCMDevelopment"
        target="_blank"
        rel="noopener"
      >
        <Button
          variant="twitter"
          leftIcon={<Icon icon="akar-icons:twitter-fill" />}
        >
          {"Dev Updates"}
        </Button>
      </Link>
    </MotionBox>
  );
};

export default Twitter;
