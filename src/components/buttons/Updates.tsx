import React from "react";
import { Box, Link, Button, BoxProps } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const MotionBox = motion<BoxProps>(Box);

const Updates = (): JSX.Element => {
  return (
    <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Link
        href="https://t.me/LucidCreationsMedia"
        target="_blank"
        rel="noopener"
      >
        <Button
          variant="primary"
          leftIcon={<Icon icon="bi:info-lg" />}
        >
          {"Dev Updates"}
        </Button>
      </Link>
    </MotionBox>
  );
};

export default Updates;
