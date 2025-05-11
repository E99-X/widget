// myTheme.js
import { lightTheme } from "@mysten/dapp-kit";

export const myTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    outlineButton: "var(--widget-font-soft-color)",
    primaryButton: "var(--widget-font-soft-color)",
  },
  backgroundColors: {
    ...lightTheme.backgroundColors,
    primaryButton: "var(--widget-bgr-light)",
    outlineButtonHover: "var(--widget-font-soft-color)",
    primaryButtonHover: "var(--widget-bgr-light)",
  },
  borderColors: {
    outlineButton: "var(--widget-bgr-light)",
  },
  radii: {
    ...lightTheme.radii,
    medium: "8px",
  },
  shadows: {
    ...lightTheme.shadows,
    primaryButton: "none",
  },
  typography: {
    ...lightTheme.typography,
    fontFamily: "var(--font-family)",
    fontStyle: "normal",
    lineHeight: "1.3",
    letterSpacing: "1",
  },
};
