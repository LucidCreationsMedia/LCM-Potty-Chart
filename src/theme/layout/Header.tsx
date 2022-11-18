import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Heading,
  HStack,
  Box,
  IconButton,
  Menu,
  MenuButton
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import appLogo from "../../../public/images/logo.svg";

const Header = (): JSX.Element => {
  const appName = "LCM Potty Chart";
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION_HEADER || "";

  // Add transparency while not at the top of the page.
  const [transparentNavbar, setTransparentNavbar] = useState<boolean>(false);
  const lastScroll = useRef<number>(0);

  const handleScroll = (): void => {
    // Sticky Nav
    if (window.scrollY >= 20) {
      setTransparentNavbar(true);
    } else {
      setTransparentNavbar(false);
    }

    // Scroll Position.
    const currentScroll =
      window.scrollY || window.pageYOffset || document.body.scrollTop;

    // Update Scroll Position Reference
    lastScroll.current = currentScroll <= 0 ? 0 : currentScroll;
    // setScroll(lastScroll.current = currentScroll <= 0 ? 0 : currentScroll)
  };

  useEffect(() => {
    if (!window) {
      console.log("waiting for mount");
    } else if (window) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile Menu Icon && Open/Close
  const [open, setOpen] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);

  const menuIcon = (): JSX.Element => {
    const iconType = {
      default: <Icon icon="bx:bx-menu-alt-right" />,
      hover: <Icon icon="bx:bx-menu" />,
      open: <Icon icon="bx:bx-x" />
    };

    if (open) {
      return iconType.open;
    } else if (hover) {
      return iconType.hover;
    } else {
      return iconType.default;
    }
  };

  return (
    <Box
      zIndex={1}
      w="100%"
      pos="fixed"
      top={0}
      alignItems="center"
      boxShadow={
        open
          ? "none"
          : "rgba(0, 134, 255, 0.75) 0px 0px 15px, rgba(0, 134, 255, 0.5) 0px 0px 3px 1px"
      }
      bg={
        open
          ? "brand.main"
          : transparentNavbar
          ? "rgba(49, 56, 220, 0.9)"
          : "brand.main"
      }
      transition=".5s ease"
      borderRadius="0px 0px 10px 10px"
      _hover={{
        bg: "brand.main",
        boxShadow: open
          ? "none"
          : "rgba(0, 134, 255, 0.9) 0px 0px 15px, rgba(0, 134, 255, 0.7) 0px 0px 3px 1px"
      }}
      h={open ? "125px" : "auto"}
    >
      {/* Logo | Site Name */}
      <HStack
        display={{ base: "flex", lg: "none" }}
        position="absolute"
        width="100%"
        height={12}
        top={0}
        ml={4}
        spacing="5px"
        justifyContent={{
          base: "flex-start",
          sm: "center"
        }}
        alignItems="center"
        _hover={{
          cursor: "default"
        }}
      >
        <Image height="30" width="30" src={appLogo} alt="App Logo" />

        <Heading as="h1" size="md">
          {appName}
        </Heading>
        <Heading color="whiteAlpha.500" as="h2" size="sm">
          {appVersion}
        </Heading>
      </HStack>

      {/* Desktop Nav Items and Mobile Menu Button */}
      <HStack
        w="100%"
        px={4}
        h={12}
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack
          w="100%"
          h="auto"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box w="auto" display={{ base: "flex", lg: "none " }}></Box>
          <Box w="100%" display={{ base: "none", lg: "flex" }} m="auto">
            <HStack
              width="100%"
              alignItems="center"
              height="auto"
              spacing="5px"
              _hover={{
                cursor: "default"
              }}
            >
              <Image height="30" width="30" src={appLogo} alt="App Logo" />
              <Heading as="h1" size="md">
                {appName}
              </Heading>
              <Heading color="whiteAlpha.500" as="h2" size="sm">
                {appVersion}
              </Heading>
            </HStack>
          </Box>
          <DesktopNav />
        </HStack>
        <Menu isLazy lazyBehavior="unmount" isOpen={open}>
          <MenuButton
            id="mobile-menu-button"
            as={IconButton}
            aria-label="Mobile Menu"
            icon={menuIcon()}
            display={{
              base: "inline-flex",
              lg: "none"
            }}
            bg={transparentNavbar ? "transparent" : "rgba(255, 255, 255, .15)"}
            border={transparentNavbar ? "1px solid #0068ff" : "none"}
            variant="mobileNav"
            type="button"
            onClick={() => setOpen(!open)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          />
          <MobileNav updateOpen={setOpen} />
        </Menu>
      </HStack>
    </Box>
  );
};

export default Header;
