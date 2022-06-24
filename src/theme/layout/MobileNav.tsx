import React, { FC, Fragment } from "react";
import {
  Button,
  Link,
  MenuDivider,
  MenuItem,
  MenuList
} from "@chakra-ui/react";
import navItems, { NavItem } from "./navItems";

interface MobileNavProps {
  updateOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNav: FC<MobileNavProps> = ({ updateOpen }: MobileNavProps) => {
  return (
    <MenuList
      as="nav"
      display={{ base: "block", lg: "none" }}
      h="auto"
      w="100%"
      p={0}
      border="none"
      boxShadow="none"
      bg="brand.main"
    >
      {navItems.map((navItem: NavItem, index: number) => {
        return (
          <MenuItem
            id={"mobile-" + navItem[0]}
            key={navItem[0]}
            w="auto"
            h="auto"
            p={0}
            _hover={{
              backgroundColor: "none"
            }}
            _focus={{
              backgroundColor: "none"
            }}
          >
            <Link onClick={() => updateOpen(false)} href={navItem[1]}>
              {index === 0 ? <MenuDivider /> : <Fragment></Fragment>}
              <Button w="100vw" variant={"nav"} p={0} m="auto">
                {navItem[0]}
              </Button>
              <MenuDivider />
            </Link>
          </MenuItem>
        );
      })}
    </MenuList>
  );
};

export default MobileNav;
