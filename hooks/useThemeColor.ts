/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

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

type Theme = 'light' | 'dark';

export function useThemeColors(overrides?: Partial<Record<keyof typeof Colors.light, string>>) {
  const theme: Theme = useColorScheme() ?? 'light';

  const themeColors = Colors[theme];

  if (!overrides) return themeColors;

  return {
    ...themeColors,
    ...overrides, // your manual overrides take precedence
  };
}

