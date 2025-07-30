import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useUserStore } from '@/store/useUserStore';

type Theme = 'light' | 'dark' | 'default';

export function useThemeColors(
  overrides?: Partial<Record<keyof typeof Colors.light, string>>
) {
  // Get user's preferred theme from the store
  const storedTheme = useUserStore(state => state.theme);

  // Fallback to system theme if 'default' is selected
  const systemTheme: Theme = useColorScheme() ?? 'light';

  // Resolve final theme value
  const resolvedTheme = (storedTheme === 'default' ? systemTheme : storedTheme) as 'light' | 'dark';

  // Safeguard against invalid theme keys
  const themeColors = Colors[resolvedTheme] ?? Colors.light;

  // Apply overrides if provided
  return {
    ...themeColors,
    ...(overrides ?? {})
  };
}
