/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';
interface appTheme{
  light:{
  background:string,
   surface:          string,
  textPrimary:      string,
  textSecondary:     string,
  border:          string,
  shadow:           string,
  primaryButton:    string,
  secondaryButton:string,
  highlightAccent:  string,
  dangerAccent:     string,
  iconColor:        string,
    iconSecondary:   string,
  gradientStart:   string,
  gradientMiddle:string,
  gradientEnd:string},
  dark:{   
  background:string,
   surface:          string,
  textPrimary:      string,
  textSecondary:     string,
  border:          string,
  shadow:           string,
  primaryButton:    string,
  secondaryButton:string,
  highlightAccent:  string,
  dangerAccent:     string,
  iconColor:        string,
    iconSecondary:   string,
  gradientStart:   string,
  gradientMiddle:string,
  gradientEnd:string}
}

export const Colors : appTheme = {
 light: {
  // Base UI
  background:        "#FFFFFF",  // Pure White – App background
  surface:           "#F5F5F5",  // Ghost White – Cards, sheets, containers
  textPrimary:       "#212121",  // Jet Black – Headers, body text
  textSecondary:     "#545454",  // Charcoal Gray – Captions, meta text
  border:            "#E0E0E0",  // Light Gray – Input outlines, dividers
  shadow:            "rgba(0,0,0,0.08)", // Card shadows/elevation

  // Buttons & Actions
  primaryButton:     "#8E44AD",  // Amethyst Purple – Main CTA
  secondaryButton:   "#27AE60",  // Emerald Green – Secondary CTA, confirms
  highlightAccent:   "#F39C12",  // Amber Orange – Highlight elements (tabs, pills)
  dangerAccent:      "#E74C3C",  // Coral Red – Delete, warnings

  // Icons (Phosphor duotone)
  iconColor:        "#8E44AD",  // Primary stroke color
  iconSecondary:     "#D5B4E5",  // Lilac Mist – Tint for duotone fill

  // Gradients (e.g. top app bars or onboarding)
  gradientStart:     "#C3F0F2",  // Pale Aqua
  gradientMiddle:    "#DDB3F8",  // Lilac Purple (brand-aligned)
  gradientEnd:       "#FFD6CF",  // Soft Peach
},
 dark: {
  // Base UI
  background:        "#121212",  // Raisin Black – Main app background
  surface:           "#1E1E1E",  // Charcoal Black – Cards, containers
  textPrimary:       "#E0E0E0",  // Platinum – Readable primary text
  textSecondary:     "#A8A8A8",  // Silver Gray – Secondary/meta text
  border:            "#2E2E2E",  // Dark Gray – Borders & inputs
  shadow:            "rgba(0,0,0,0.3)", // Elevation for dark elements

  // Buttons & Actions
  primaryButton:     "#A368C2",  // Lavender Purple – Adjusted brand color for dark
  secondaryButton:   "#3DA574",  // Pine Green – Success actions
  highlightAccent:   "#D7A342",  // Goldenrod – Accent tabs/buttons
  dangerAccent:      "#D96B5C",  // Soft Tomato Red – Errors

  // Icons (Phosphor duotone)
  iconColor:         "#A368C2",  // Lavender Purple – Stroke
  iconSecondary:     "#5D3B74",  // Shadow Plum – Fill tone (shade of brand)

  // Gradients (e.g. top app bars or onboarding)
  gradientStart:     "#1E2A33",  // Deep Teal
  gradientMiddle:    "#3C2A4D",  // Deep Purple (brand-aligned)
  gradientEnd:       "#4A2F36",  // Burnt Plum
},
/*tabBar: {
  background:        isDark ? "#1E1E1E" : "#FFFFFF", // Match app surface
  activeTintColor:   isDark ? "#A368C2" : "#8E44AD", // Primary brand color
  inactiveTintColor: isDark ? "#757575" : "#BDBDBD", // Muted for inactive icons
  borderTopColor:    isDark ? "#2E2E2E" : "#E0E0E0", // Optional divider
}*/

}
