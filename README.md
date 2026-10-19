# Expo mobile starter

A deliberately small Expo starter for building one React Native app for Android and iOS. It gives you a clean route structure, NativeWind utility styling, a persisted theme preference, and a ready-to-copy API pattern—without tabs, authentication, test infrastructure, or CI.

## What is Expo?

Expo is the standard framework for React Native. It provides the development server, device tooling, maintained native modules, file-based routing through Expo Router, and optional cloud builds through EAS. The code in this repository is still React Native; Expo simply makes the native setup and iteration loop easier.

Start with Expo Go for normal UI and JavaScript work. Make a development build only after adding native code or a library that Expo Go does not include.

## First run

Use Node.js 22.13 or newer, then install and start the project:

```bash
npm install
npx expo start
```

The terminal displays a QR code and keyboard shortcuts. Use one of these paths:

- **Physical Android or iPhone:** install [Expo Go](https://expo.dev/go), put the phone and computer on the same Wi-Fi network, then scan the QR code.
- **Android emulator:** start an emulator first, then press `a` in the Expo terminal or run `npm run android`.
- **iOS Simulator (macOS only):** open a simulator first, then press `i` or run `npm run ios`.

If device discovery fails on a restrictive network, restart with `npx expo start --tunnel`.

## Local emulator setup

### Android

1. Install [Android Studio](https://developer.android.com/studio).
2. In **SDK Manager**, install an Android SDK Platform and Android SDK Build-Tools.
3. In **Device Manager**, create and start a virtual device.
4. From this project, run `npm run android`.

Expo can open the running emulator and load the app. You do not need to create or edit an `android/` folder for this starter.

### iOS (requires macOS)

1. Install Xcode from the App Store and open it once to accept its license.
2. In Xcode, open **Window → Devices and Simulators → Simulators** and boot a device, or just run `npm run ios`.

You do not need to create or edit an `ios/` folder for this starter.

## Commands

```bash
npm run start       # start Metro / Expo development server
npm run android     # start and open Android emulator
npm run ios         # start and open iOS Simulator (macOS)
npm run web         # run in a browser
npm run lint        # lint the source
npm run typecheck   # check TypeScript types
npm run doctor      # check Expo configuration and package compatibility
```

Run `npm run lint` and `npm run typecheck` before sharing a feature. Use `npx expo install <package>` for Expo or React Native packages: it selects versions compatible with this Expo SDK.

## Folder guide

```text
src/
  app/                 # Expo Router routes only
    _layout.tsx         # providers and the root stack
    index.tsx           # / (Home)
    settings.tsx        # /settings
  components/           # reusable visual building blocks
  features/             # feature-specific hooks, types, and API calls
    example/            # a disabled-by-default React Query example
  lib/
    api/client.ts       # the one fetch wrapper for the app
    query-client.ts     # TanStack Query defaults
  providers/
    theme-provider.tsx  # persisted system/light/dark selection
```

`src/app/` is only for screens and layouts. Put a new screen at `src/app/profile/index.tsx` to create `/profile`; shared components do **not** go in this folder.

## Styling and themes

This project uses [NativeWind](https://www.nativewind.dev/), so React Native components accept Tailwind-style `className` values:

```tsx
<View className="rounded-2xl bg-surface p-5 dark:bg-surface-dark">
  <Text className="text-base font-semibold text-foreground dark:text-foreground-dark">
    Hello
  </Text>
</View>
```

Color tokens are in `tailwind.config.js`. Update the light and matching `*-dark` values there instead of scattering hex values through screens. The Settings screen persists a System, Light, or Dark preference with AsyncStorage; use `useAppTheme()` only from code rendered below `AppThemeProvider`.

## API calls

Copy `.env.example` to `.env` and choose a public API base URL:

```bash
cp .env.example .env
```

`EXPO_PUBLIC_*` values are bundled into the client app. They are appropriate for a base URL or non-secret public key—**never for credentials, private API keys, or database URLs**.

Use `apiClient` instead of calling `fetch` directly in screens, then put each feature’s query hooks inside its own feature folder:

```tsx
// src/features/projects/use-projects.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';

type Project = { id: string; name: string };

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => apiClient<Project[]>('/projects'),
  });
}
```

The included `useHealthCheck` example is disabled by default, so the template never calls a placeholder URL. Query screens should handle loading, error, empty, and content states.

## When Expo Go is not enough

Expo Go is the right first stop. If you later add custom native code or a native library it does not bundle, build locally with:

```bash
npx expo run:android
npx expo run:ios
```

Those commands generate native projects through Expo’s Continuous Native Generation workflow. Configure native behavior in `app.json` and config plugins; do not hand-edit generated `ios/` or `android/` folders in this template.

For store-ready Android/iOS builds, use EAS when the app is ready: `npx eas-cli@latest build`. That is intentionally not part of this beginner development loop.

## Using an AI coding assistant

Tell the assistant which user flow to build, the target route, API shape, and the empty/loading/error behavior you expect. Ask it to preserve these rules:

- use Expo Router and put only routes in `src/app/`;
- create reusable UI in `src/components/` and feature-specific query hooks in `src/features/`;
- style with NativeWind classes and centralize reusable color changes in `tailwind.config.js`;
- call `apiClient` from query hooks, never expose secrets through `EXPO_PUBLIC_*` variables;
- run lint and typecheck after making changes.
