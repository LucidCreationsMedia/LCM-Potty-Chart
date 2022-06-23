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
        h="auto"
        w="100%"
        display={{ base: "none", lg: "flex" }}
        justifyContent="center"
        alignContent="center"
        spacing={4}
      >
        {links.map((link: LinkObj) => {
          const { href, name, type } = link;

          if (type === "primary" || type === "secondary") {
            return <CustomButton link={href} text={name} type={type} />;
          }

          if (type === "patreon") {
            return <Patreon />;
          }

          if (type === "twitter") {
            return <Twitter />;
          }
        })}
      </HStack>
      <VStack
        h="auto"
        w="100%"
        display={{ base: "flex", lg: "none" }}
        justifyContent="center"
        alignContent="center"
        spacing={4}
      >
        {links.map((link: LinkObj) => {
          const { href, name, type } = link;

          if (type === "primary" || type === "secondary") {
            return <CustomButton link={href} text={name} type={type} />;
          }

          if (type === "patreon") {
            return <Patreon />;
          }

          if (type === "twitter") {
            return <Twitter />;
          }
        })}
      </VStack>
      <Divider orientation="horizontal" />
    </VStack>
  );
};

export default TutorialLinks;
