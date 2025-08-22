const tintColorLight = "#D97706"; // Warm amber
const tintColorDark = "#FBBF24"; // Soft golden yellow for dark theme
const primary = "#F59E0B"; // Primary amber for CTAs
const secondary = "#1F1F1F"; // Deep charcoal background for cards

export const Colors = {
  light: {
    text: "#1C1C1C", // Almost black for light mode
    background: "#FAFAF9", // Soft warm white
    tint: tintColorLight,
    icon: "#6B7280", // Neutral gray
    tabIconDefault: "#6B7280",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#F5F5F4", // Warm off-white text
    background: "#141210", // Deep espresso background
    tint: tintColorDark,
    icon: "#A8A29E", // Muted warm gray icons
    tabIconDefault: "#A8A29E",
    tabIconSelected: tintColorDark,
  },
  PRIMARY: primary, // Amber for main actions
  SECONDARY: secondary, // Dark charcoal for card surfaces
  ACCENT: "#7F1D1D", // Muted wine red for elegance
};
