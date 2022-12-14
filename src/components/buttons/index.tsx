import React from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";
import CustomButton from "./Custom";
import links, { LinkObj } from "./data/links";
import KoFi from "./KoFi";

const Buttons = (): JSX.Element => {
  return (
    <Box h="auto" w="100%">
      <HStack
        display={{ base: "none", lg: "flex" }}
        h="auto"
        w="100%"
        justifyContent="center"
        alignContent="center"
        spacing={4}
      >
        {links.map((link: LinkObj) => {
          const { href, name, type } = link;

          if (type === "primary" || type === "secondary") {
            return (
              <CustomButton
                key={name.replaceAll(" ", "-")}
                link={href}
                text={name}
                type={type}
              />
            );
          }

          if (type === "ko-fi") {
            return <KoFi key={type} />;
          }
        })}
      </HStack>
      <VStack
        display={{ base: "flex", lg: "none" }}
        h="auto"
        w="100%"
        justifyContent="center"
        alignContent="center"
        spacing={4}
      >
        {links.map((link: LinkObj) => {
          const { href, name, type } = link;

          if (type === "primary" || type === "secondary") {
            return (
              <CustomButton
                key={name.replaceAll(" ", "-")}
                link={href}
                text={name}
                type={type}
              />
            );
          }

          if (type === "ko-fi") {
            return <KoFi key={type} />;
          }
        })}
      </VStack>
    </Box>
  );
};

export default Buttons;
