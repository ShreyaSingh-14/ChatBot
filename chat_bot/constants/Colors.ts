/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  
  PRIMARY:'#0d0e0eff',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY: '#9e9e9eff',
  BLUE:'#0a7ea4ff',
  LIGHT_BLUE: '#0a7ea4cc',
  LIGHT_GRAY: '#f3f1f1ff',
  Magenta: '#800456ff',
  LIGHT_GREEN: ' #84f38cff',
  LIGHT_PINK:'#fec1edff',
  LIGHT_PURPLE:'#dd95f9ff',
  LIGTH_BROWN:'#7a3d32ff',
  LIGHT_ORANGE:'#e78854ff',
  DARK_GREY:'#282727ff'
};

export default Colors;
