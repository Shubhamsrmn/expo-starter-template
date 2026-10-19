import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { Screen } from '@/components/screen';

export default function HomeScreen() {
  return (
    <Screen>
      <View className="gap-3">
        <Text className="text-3xl font-bold tracking-tight text-foreground dark:text-foreground-dark">
          Ready to build.
        </Text>
        <Text className="text-base leading-6 text-muted dark:text-muted-dark">
          This is a small Expo starter for Android and iOS. Replace this screen with your first
          feature, then add routes as your app grows.
        </Text>
      </View>

      <View className="gap-3 rounded-2xl border border-border bg-surface p-5 dark:border-border-dark dark:bg-surface-dark">
        <Text className="text-base font-semibold text-foreground dark:text-foreground-dark">
          Where things go
        </Text>
        <Text className="text-sm leading-5 text-muted dark:text-muted-dark">
          Routes live in src/app. Reusable UI lives in src/components. Feature API hooks live in
          src/features. Shared network code lives in src/lib.
        </Text>
      </View>

      <Link href="/settings" asChild>
        <Pressable
          accessibilityRole="button"
          className="items-center rounded-xl bg-accent px-5 py-4 active:opacity-80">
          <Text className="text-base font-semibold text-on-accent">Open settings</Text>
        </Pressable>
      </Link>
    </Screen>
  );
}
