/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors : any = {
  light: {
    text: '#11181C',
    background: '#fff',
    screenIndicatorInactive:"D6DFFF",
    screenIndicatorActive:"3461FD",
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    gradientBackground:["#F350F0","#7CF2FF"],
    primary:"#3461FD",
    primaryTextColor:"#3461FD",
    ButtonTextColor:"#F5F9FE",
    primaryColor:"#3461FD",
    secondary:"#F5F9FE",
    border:"#3461FD"
  },
  dark: {
    text: '#ECEDEE',
    background: '#323441',
    tint: tintColorDark,
     screenIndicatorInactive:"D6DFFF",
    screenIndicatorActive:"3461FD",
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorLight,
    primary:"white",
    secondary:"grey",
    border:'grey'
  },
};
