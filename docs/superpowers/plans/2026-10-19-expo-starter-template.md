# Expo Starter Template Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Expo’s demo app with a compact Android/iOS starter template that provides routing, NativeWind styling, persistent theming, an API/query pattern, and beginner setup documentation.

**Architecture:** A root Expo Router layout composes theme and query providers around a two-screen stack. NativeWind owns visual token classes; the theme provider persists a three-state appearance preference. The API client and example query hook are present as patterns but never make a network request automatically.

**Tech Stack:** Expo SDK 58, Expo Router, React Native, NativeWind 4.2.7, Tailwind CSS 3, AsyncStorage, TanStack Query.

**Spec:** `docs/superpowers/specs/2026-10-19-expo-starter-design.md`

## Global Constraints

- Keep only `/` and `/settings`; route files contain routes only.
- Do not add test tooling, coverage, pre-commit hooks, CI, generated native directories, or real API calls.
- Use `npx expo install` for Expo-aware dependencies; use npm only for JS-only development tooling when needed.
- Do not store API secrets in `EXPO_PUBLIC_` variables or source control.
- Verify with lint, TypeScript, Expo Doctor, and a Metro startup check.

## Review Focus

- System theme must reapply when the OS appearance changes after choosing System.
- A stored Light or Dark preference must override the operating system after restart.
- API wrapper must reject non-2xx responses with useful status and message context.
- No screen may begin a network request before a developer explicitly uses the example hook.
- The documented Android/iOS instructions must differentiate Expo Go from development builds.

### Task 1: Replace the demo surface with the minimal app structure

**Files:**
- Create: `src/components/screen.tsx`, `src/components/setting-row.tsx`, `src/app/settings.tsx`
- Modify: `src/app/_layout.tsx`, `src/app/index.tsx`
- Delete: Expo demo screens, tab navigator, and demo-only components/constants.

**Interfaces:**
- Produces: `Screen` layout component and two route files used by the root stack.

- [x] Remove the demo tab/animated UI and create the two-screen Router stack.
- [x] Create Home with a settings link and extension-point guidance; create Settings with three appearance choices.
- [x] Confirm `src/app/` contains route files only and the app compiles after provider scaffolding is added.

### Task 2: Add NativeWind tokens and persistent appearance preference

**Files:**
- Create: `tailwind.config.js`, `metro.config.js`, `nativewind-env.d.ts`, `src/providers/theme-provider.tsx`
- Modify: `src/global.css`, `src/app/_layout.tsx`, `app.json`, `package.json`

**Interfaces:**
- Produces: `useAppTheme(): { preference, setPreference }` consumed by Settings.

- [x] Install the SDK-compatible native dependencies and NativeWind/Tailwind setup dependencies.
- [x] Configure NativeWind’s Metro input and semantic Tailwind light/dark tokens.
- [x] Implement hydration-safe persisted System/Light/Dark preference selection with AsyncStorage.

### Task 3: Add a conservative API/query pattern

**Files:**
- Create: `src/lib/api/client.ts`, `src/lib/query-client.ts`, `src/features/example/use-health-check.ts`, `.env.example`
- Modify: `src/app/_layout.tsx`, `package.json`

**Interfaces:**
- Produces: `apiClient<T>(path, options)` and an opt-in `useHealthCheck(enabled)` example hook.

- [x] Install TanStack Query and add one configured QueryClient provider.
- [x] Implement typed JSON fetch and normalized `ApiError` handling.
- [x] Add a disabled-by-default example hook and public-base-URL environment example.

### Task 4: Document the handoff and validate the template

**Files:**
- Modify: `README.md`, `package.json`

- [x] Replace the generated README with setup, run, routing, styling, theme, API, environment, and EAS quick-reference guidance.
- [x] Add convenient `typecheck` and `doctor` scripts.
- [x] Run lint, typecheck, Expo Doctor, and a bounded Metro startup check; resolve failures caused by this work.
