import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  // HStack,
  Text,
  VStack,
  Link,
  // Icon,
  // Image,
  // Button,
  // BoxProps,
} from "@chakra-ui/react";
// import BackToTopButton from "./BackToTopButton";
// import { motion } from "framer-motion";

// export const MotionBox = motion<BoxProps>(Box);

const Footer = (): JSX.Element => {
  // const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  // const lastScroll = useRef<number>(0);

  // const handleScroll = (): void => {
  //   if (window.scrollY >= 500) {
  //     setShowBackToTop(true);
  //   } else {
  //     setShowBackToTop(false);
  //   }

  //   const currentScroll =
  //     window.pageYOffset || document.documentElement.scrollTop;

  //   lastScroll.current = currentScroll <= 0 ? 0 : currentScroll;
  // };

  // useEffect(() => {
  //   if (!window) {
  //     console.log("waiting for mount");
  //   } else if (window) {
  //     window.addEventListener("scroll", handleScroll);
  //   }

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
  return (
    <Box bg="brand.footer" as="footer" w="100%" h="auto">
      {/* <BackToTopButton show={showBackToTop} /> */}
      <VStack
        h="auto"
        w="auto"
        py={12}
        spacing={5}
        justifyItems="center"
        justifyContent="center"
      >
        {/* <HStack color="brand.footerText" spacing={2}>
          <Text fontSize="xl">Deployed by</Text>
          <Link
            aria-label="Vercel"
            href="https://vercel.com/"
            rel="noopener"
            target="_blank"
          >
            <Icon fontSize="1.75rem" icon="logos:vercel" />
          </Link>
        </HStack> */}
        <VStack spacing={2}>
          {/* <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
              href="https://github.com/LucidCreationsMedia"
              target="_blank"
              rel="noopener"
            >
              <Button
                color="whiteAlpha"
                variant="credits"
                leftIcon={<Icon icon="akar-icons:github-fill" />}
              >
                View Codebase
              </Button>
            </Link>
          </MotionBox> */}
          <Text color="brand.footerText" fontSize="xs">
            &copy; 2021 - {new Date().getFullYear()}
            <Link
              href="https://lucidcreations.media"
              rel="noopener"
              target="_blank"
            >
              Lucid Creations Media
            </Link>
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Footer;
