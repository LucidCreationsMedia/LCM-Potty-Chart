import type { AppProps } from "next/app";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import AppTheme from "../theme/AppTheme";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Layout from "../theme/layout/Layout";
import Head from "next/head";

function LCMPottyChart({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <React.StrictMode>
      <ChakraProvider theme={AppTheme}>
        <Layout {...pageProps}>
          <Head>
            <title>{"LCM Potty Chart"}</title>
            <meta
              name="viewport"
              content="width=device-width, user-scalable=yes, initial-scale=1.0"
            />
          </Head>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Layout>
      </ChakraProvider>
    </React.StrictMode>
  );
}

export default LCMPottyChart;
