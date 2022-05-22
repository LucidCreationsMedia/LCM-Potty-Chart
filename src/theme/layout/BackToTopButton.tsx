import React, { FC } from "react";
import { Button, Flex, Link } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

interface BackToTopButtonProps {
  show: boolean;
}

const BackToTopButton: FC<BackToTopButtonProps> = ({
  show
}: BackToTopButtonProps) => {
  return (
    <Flex
      display={show ? "flex" : "none"}
      pos="fixed"
      top="85vh"
      right={{
        base: "1.25rem",
        sm: "2rem",
        md: "3rem"
      }}
    >
      <Link href="/#top">
        <Button variant="backToTop">
          <Icon icon="akar-icons:chevron-up" />
        </Button>
      </Link>
    </Flex>
  );
};

export default BackToTopButton;
