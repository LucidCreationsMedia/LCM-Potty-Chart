import React /*, { useEffect, useRef, useState }*/ from "react";
import { Box, Link, Button, BoxProps } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const MotionBox = motion<BoxProps>(Box);

const Patreon = (): JSX.Element => {
  return (
    <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Link
        href="https://www.patreon.com/bePatron?u=15380906"
        target="_blank"
        rel="noopener"
      >
        <Button
          variant="patreon"
          leftIcon={<Icon icon="ri:patreon-fill" />}
        >
          {"Fund The App"}
        </Button>
      </Link>
    </MotionBox>
  );
};

export default Patreon;
