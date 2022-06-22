import React /*, { useEffect, useRef, useState }*/ from "react";
import {
  Box,
  Text,
  VStack,
  Link,
  // Image,
  Button,
  BoxProps
} from "@chakra-ui/react";
// import BackToTopButton from "./BackToTopButton";
import { motion } from "framer-motion";
import Patreon from "../../components/buttons/Patreon";
import CustomButton from "../../components/buttons/Custom";
import Twitter from "../../components/buttons/Twitter";

const MotionBox = motion<BoxProps>(Box);

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
        <VStack spacing={4}>
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
          <CustomButton
            link={
              "https://lucidcreations.media/introducing-code-name-potty-chart/"
            }
            text="More About This App"
            type="footer"
          />
          <Patreon />
          <Twitter />
          <Text color="brand.footerText" fontSize="xs">
            &copy;
            {` 2021 - ${new Date().getFullYear()} `}
            <Link
              href="https://lucidcreations.media"
              rel="noopener"
              target="_blank"
            >
              {"Lucid Creations Media"}
            </Link>
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Footer;
