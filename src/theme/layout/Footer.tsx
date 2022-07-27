import React /*, { useEffect, useRef, useState }*/ from "react";
import { Box, Text, VStack, Link } from "@chakra-ui/react";
// import BackToTopButton from "./BackToTopButton";
import Buttons from "../../components/buttons";

const Footer = (): JSX.Element => {
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
          <Buttons />
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
