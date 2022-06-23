import React, { FC, ReactNode } from "react";
import type { AppProps } from "next/app";
import Header from "../layout/Header";
import { Box } from "@chakra-ui/layout";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  elementType?: string;
}

const Layout: FC<LayoutProps> = (
  { children }: LayoutProps,
  { pageProps }: AppProps
) => {
  return (
    <Box w="100%">
      <Header {...pageProps} />
      <main>{children}</main>
      <Footer />
    </Box>
  );
};
export default Layout;
