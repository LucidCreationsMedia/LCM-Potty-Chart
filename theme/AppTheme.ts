import { extendTheme, ThemeConfig } from "@chakra-ui/react";
// import { createBreakpoints } from "@chakra-ui/theme-tools";
import buttons from "./components/buttonStyles";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false
};

// const breakpoints = createBreakpoints({
//   sm: "30em",
//   md: "48em",
//   lg: "75em",
//   xl: "85em",
//   "2xl": "100em",
// });

const AppTheme = extendTheme({
  config,
  colors: {
    brand: {
      main: "#3138dc",
      primary: "#0068ff",
      secondary: "#0086ff",
      hover: "#00aec1",
      warning: "#ffbd48",
      danger: "#FC8181",
      valid: "#00c17c",
      footer: "#0097a7",
      footerText: "black",
      content: "#2d3748",
      patreon: "#FF424D"
    }
  },
  styles: {
    global: {
      body: {
        bg: "gray.900"
      }
    }
  },
  components: {
    Button: buttons
  }
  // breakpoints,
});

export default AppTheme;
