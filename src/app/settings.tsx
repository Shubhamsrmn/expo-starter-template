import { Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { SettingRow } from '@/components/setting-row';
import { useAppTheme, type ThemePreference } from '@/providers/theme-provider';

const appearanceOptions: { label: string; value: ThemePreference; description: string }[] = [
  { label: 'System', value: 'system', description: 'Match your device setting' },
  { label: 'Light', value: 'light', description: 'Always use the light appearance' },
  { label: 'Dark', value: 'dark', description: 'Always use the dark appearance' },
];

export default function SettingsScreen() {
  const { preference, setPreference } = useAppTheme();

  return (
    <Screen>
      <View className="gap-2">
        <Text className="text-base font-semibold text-foreground dark:text-foreground-dark">
          Appearance
        </Text>
        <Text className="text-sm leading-5 text-muted dark:text-muted-dark">
          This preference is saved on the device. Add your app colors in tailwind.config.js.
        </Text>
      </View>

      <View className="overflow-hidden rounded-2xl border border-border bg-surface dark:border-border-dark dark:bg-surface-dark">
        {appearanceOptions.map((option) => (
          <SettingRow
            key={option.value}
            label={option.label}
            description={option.description}
            selected={preference === option.value}
            onPress={() => setPreference(option.value)}
          />
        ))}
      </View>
    </Screen>
  );
}
