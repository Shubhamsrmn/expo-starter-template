# Expo Starter Template Design

## Intent

Create a small, production-shaped Expo SDK 58 template that a backend or AI-focused developer can safely extend for Android and iOS. It teaches one consistent route pattern, a token-based visual system, theme selection, and API data fetching without shipping a demo app or enterprise process.

## Goals

- Keep only a Home route (`src/app/index.tsx`) and a Settings route (`src/app/settings.tsx`) inside one Expo Router stack.
- Use NativeWind 4.2.7 with Tailwind CSS 3 utility classes; define semantic light and dark color tokens in `tailwind.config.js`.
- Persist the user’s light/dark/system preference with AsyncStorage and apply it through NativeWind’s color-scheme API.
- Establish `src/lib/api/client.ts` as the one fetch wrapper and `src/features/example/use-health-check.ts` as the documented TanStack Query hook pattern. No real backend URL or request is invoked by the sample screen.
- Provide a README for first run, Android emulator/iOS Simulator setup, adding routes, theming, environment variables, API calls, and optional EAS build commands.

## Non-goals

- No tabs, authentication, generated native `ios/` or `android/` directories, backend, mock API, test suite, coverage, lint hooks, or CI pipeline.
- No secrets or API keys in source control. Runtime public configuration uses `EXPO_PUBLIC_` variables only; credentials belong on a server or in secure storage.
- No architecture intended to predict every future feature; folders should grow only after a real feature needs them.

## Architecture

`src/app/` contains only routes and the root provider stack. Reusable visual primitives live in `src/components/`; feature-scoped hooks and API calls live in `src/features/<feature>/`; cross-cutting utilities live in `src/lib/`; and the persisted theme provider lives in `src/providers/`.

The initial stack exposes only `/` and `/settings`. Home links to Settings and explains the extension points. Settings selects System, Light, or Dark. A `QueryClientProvider` makes the included API-hook pattern ready but does not create background requests.

## Technology choices

- Expo SDK 58 / Expo Router: current project framework and file-based navigation.
- NativeWind 4.2.7 / Tailwind CSS 3: stable, documented utility-style integration. NativeWind v5 is currently a release candidate, so it is deliberately excluded from a beginner starter.
- TanStack Query: caching and request-state conventions; use the built-in `fetch`, not Axios.
- AsyncStorage: persisted non-sensitive preference storage. Secure tokens use `expo-secure-store` when authentication is added.

## Validation

- `npm run lint`
- `npx tsc --noEmit`
- `npx expo-doctor`
- Start Metro and verify the bundler starts without configuration errors. Manual device/emulator verification remains documented for the recipient.
