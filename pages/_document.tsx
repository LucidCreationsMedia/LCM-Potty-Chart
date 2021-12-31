import React from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";
import AppTheme from "../theme/AppTheme";

const description =
  // "Behavior and progress tracker for ABDLs and babyfurs alike. Track multiple littles and create any trackers you would like.";
  "Pre-alpha preview of the behavior and progress tracker for ABDLs and babyfurs.";

const logo = "/images/logo.svg";

class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta name="theme-color" content="#3138dc" />
          <link rel="icon" href={logo} sizes="32x32 192x192" />
          <link rel="apple-touch-icon" href={logo} />
          <meta property="og:title" content="LCM Potty Chart" />
          <meta name="og:description" content={description} />
          <meta property="og:type" content="Progress Tracking" />
          <meta property="og:image" content={logo} />
          <meta property="og:image:type" content="image/svg" />
          <meta property="og:image:alt" content="LCM Potty Chart Logo" />
          <meta property="og:url" content="https://lucidcreations.media" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="title" content="LCM Potty Chart" />
          <meta name="description" content={description} />
          <meta property="type" content="Progress Tracking" />
          <meta property="image" content={logo} />
          <meta property="image:type" content="image/svg" />
          <meta property="image:alt" content="LCM Potty Chart Logo" />
          <meta property="url" content="https://https://lucidcreations.media" />
          <meta httpEquiv="content-language" content="en_US" />
          <meta charSet="UTF-8" />
          <meta
            name="keywords"
            content="ABDL Adult Baby Diaper Lover Furry Babyfur ab/dl AB/DL potty chart training progress behavior tracker habbit"
          />
          <meta name="copyright" content="Lucid Creations Media" />
          <meta name="page-topic" content="Progress Tracking" />
          <meta name="page-type" content="Calender" />
          <meta name="audience" content="18+" />
          <meta name="robots" content="index, follow" />
        </Head>
        <html lang="en" />
        <body>
          <ColorModeScript
            initialColorMode={AppTheme.config.initialColorMode}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
