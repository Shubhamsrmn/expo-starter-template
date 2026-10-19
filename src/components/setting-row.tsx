import { Pressable, Text, View } from 'react-native';

type SettingRowProps = {
  label: string;
  description: string;
  selected: boolean;
  onPress: () => void;
};

export function SettingRow({ label, description, selected, onPress }: SettingRowProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      className="flex-row items-center justify-between gap-4 border-b border-border px-4 py-4 last:border-b-0 active:bg-surface-pressed dark:border-border-dark dark:active:bg-surface-pressed-dark"
      onPress={onPress}>
      <View className="flex-1 gap-1">
        <Text className="text-base font-medium text-foreground dark:text-foreground-dark">{label}</Text>
        <Text className="text-sm text-muted dark:text-muted-dark">{description}</Text>
      </View>
      <View
        aria-hidden
        className={`h-5 w-5 rounded-full border-2 ${selected ? 'border-accent bg-accent' : 'border-muted dark:border-muted-dark'}`}>
        {selected ? <View className="m-1 h-2 w-2 rounded-full bg-on-accent" /> : null}
      </View>
    </Pressable>
  );
}
