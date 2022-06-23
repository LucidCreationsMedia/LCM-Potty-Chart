import React from "react";
import { Box, Link, Button, BoxProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface CustomButtonProps {
  text: string;
  link: string;
  type: "primary" | "secondary" | "footer";
}

const MotionBox = motion<BoxProps>(Box);

const CustomButton = ({ text, link, type }: CustomButtonProps): JSX.Element => {
  return (
    <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Link href={link} target="_blank" rel="noopener">
        <Button variant={type}>{text}</Button>
      </Link>
    </MotionBox>
  );
};

export default CustomButton;
