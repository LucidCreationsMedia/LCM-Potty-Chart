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
      kofi: "#FF5E5B",
      twitter: "#1da1f2"
    },
    loading: {
      overlayBg: "#171923cb",
      spinnerColor: "#0088ff",
      spinnerEmptySpace: "#2D374860"
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
