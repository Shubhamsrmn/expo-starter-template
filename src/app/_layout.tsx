import '@/global.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';

import { queryClient } from '@/lib/query-client';
import { AppThemeProvider } from '@/providers/theme-provider';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
          <Stack.Screen name="index" options={{ title: 'Starter' }} />
          <Stack.Screen name="settings" options={{ title: 'Settings' }} />
        </Stack>
      </AppThemeProvider>
    </QueryClientProvider>
  );
}
