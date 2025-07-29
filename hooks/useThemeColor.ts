/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useUserStore } from '@/store/useUserStore';

/*

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}*/

type Theme = 'light' | 'dark' ;

export function useThemeColors(overrides?: Partial<Record<keyof typeof Colors.light, string>>) {
  const theme:any =useUserStore(state=>state.theme)
    const theme2: Theme = theme==='default'?useColorScheme() :theme
  
  //const theme: Theme = useColorScheme() ?? 'light';

  const themeColors = Colors[theme2];

  if (!overrides) return themeColors;

  return {
    ...themeColors,
    ...overrides, // your manual overrides take precedence
  };
}

