import React from "react";
import { Divider, Heading, HStack, VStack } from "@chakra-ui/react";
import CustomButton from "../../buttons/Custom";
import Patreon from "../../buttons/Patreon";
import Twitter from "../../buttons/Twitter";
import links, { LinkObj } from "../data/links";

const TutorialLinks = (): JSX.Element => {
  return (
    <VStack
      h="auto"
      w="100%"
      justifyContent="center"
      alignContent="center"
      spacing={4}
    >
      <Heading as="h3" size="lg">
        {"More Info"}
      </Heading>
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

          if (type === "patreon") {
            return <Patreon key={type} />;
          }

          if (type === "twitter") {
            return <Twitter key={type} />;
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

          if (type === "patreon") {
            return <Patreon key={type} />;
          }

          if (type === "twitter") {
            return <Twitter key={type} />;
          }
        })}
      </VStack>
      <Divider orientation="horizontal" />
    </VStack>
  );
};

export default TutorialLinks;
