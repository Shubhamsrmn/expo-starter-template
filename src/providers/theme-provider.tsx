import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import type { PropsWithChildren } from 'react';
import React from 'react';
import { useColorScheme } from 'nativewind';

export type ThemePreference = 'system' | 'light' | 'dark';

type AppThemeContextValue = {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
};

const THEME_PREFERENCE_KEY = 'app-theme-preference';
const AppThemeContext = React.createContext<AppThemeContextValue | null>(null);

export function AppThemeProvider({ children }: PropsWithChildren) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [preference, setPreferenceState] = React.useState<ThemePreference>('system');
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    AsyncStorage.getItem(THEME_PREFERENCE_KEY)
      .then((savedPreference) => {
        const nextPreference: ThemePreference =
          savedPreference === 'light' || savedPreference === 'dark' || savedPreference === 'system'
            ? savedPreference
            : 'system';
        setPreferenceState(nextPreference);
        setColorScheme(nextPreference);
      })
      .finally(() => setIsHydrated(true));
  }, [setColorScheme]);

  const setPreference = React.useCallback(
    (nextPreference: ThemePreference) => {
      setPreferenceState(nextPreference);
      setColorScheme(nextPreference);
      void AsyncStorage.setItem(THEME_PREFERENCE_KEY, nextPreference);
    },
    [setColorScheme],
  );

  const contextValue = React.useMemo(() => ({ preference, setPreference }), [preference, setPreference]);

  if (!isHydrated) {
    return null;
  }

  return (
    <AppThemeContext value={contextValue}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      {children}
    </AppThemeContext>
  );
}

export function useAppTheme() {
  const context = React.use(AppThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used inside AppThemeProvider.');
  }
  return context;
}
