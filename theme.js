
import { extendTheme } from "@chakra-ui/react"
// Extend the theme to include custom colors, fonts, etc
export const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
  pageBg: {
    light: "#fff",
    dark: "rgb(27,27,27)"
  },
  pageBgTrans: {
    light: "rgba(220,220,220,0.96)",
    dark: "rgba(0,0,0,0.5)"
  },
  pageColor: {
    light: "#222329",
    dark: "rgb(199,199,199)"
  },
  navbarBg: {
    light: "rgba(255,255,255,1)",
    dark: "rgb(27,27,27)"
  },
  navbarShadow: {
    light: "rgb(0 0 0 / 25%)",
    dark: "rgb(0 0 0 / 25%)"
  },
  swapBg: {
    light: "#f4f4f4",
    dark: "rgba(34,34,34,.7)"
  },
  primaryButtonBg: {
    light: "#3929c5",
    dark: "#3929c5"
  },
  primaryButtonColor: {
    light: "#FFF",
    dark: "#FFF"
  },
  link: {
    light: "#222329",
    dark: "rgb(199,199,199)"
  },
  linkHover: {
    light: "#f06500",
    dark: "#f06500"
  },
  colorAccent: {
    light: "#f06500",
    dark: "#f06500"
  },
  colorAccentInverse: {
    light: "#f06500",
    dark: "#f06500"
  },
  colorError: {
    light: "#b00020",
    dark: "#b00020"
  },
  border: {
    light: "rgba(153,153,153,0.16)",
    dark: "rgba(153,153,153,0.16)"
  }
}
// Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}
// extend the theme
const theme = extendTheme({ colors, config })
export default theme