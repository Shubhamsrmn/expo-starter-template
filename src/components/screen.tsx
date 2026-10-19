import type { PropsWithChildren } from 'react';
import { ScrollView } from 'react-native';

export function Screen({ children }: PropsWithChildren) {
  return (
    <ScrollView
      className="flex-1 bg-background dark:bg-background-dark"
      contentContainerClassName="gap-6 p-5 pb-12"
      contentInsetAdjustmentBehavior="automatic">
      {children}
    </ScrollView>
  );
}
