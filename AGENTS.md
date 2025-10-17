# Repository Guidelines

## Project Structure & Module Organization

- Monorepo managed by pnpm workspaces and Turborepo.
- `packages/extension`: Browser extension (React + MobX + TypeScript).
  - Source: `packages/extension/src/js/**/*`
  - Styles/Assets: `packages/extension/src/css`, `packages/extension/src/img`
  - HTML entrypoints: `packages/extension/src/*.html`
  - Config/Build utils: `packages/extension/webpack.config.js`, `packages/extension/utils/*.js`
- `packages/integration_test`: Playwright-based integration tests.
- `packages/storybook`: Component docs and examples.

## Build, Test, and Development Commands

- Install: `pnpm install`
- Dev server: `pnpm start` (serves extension; Chrome at `build/build_chrome`, Firefox at `build/build_firefox`).
- Build all: `pnpm build`
  - Targeted builds: `pnpm -F tab-manager-v2 build:chrome` or `build:firefox`
- Zip artifacts: `pnpm -F tab-manager-v2 zip` then `pnpm deploy` (creates zips and checksums under `packages/extension/build`).
- Test all: `pnpm test`
  - Unit/UI tests: `pnpm -F tab-manager-v2 test`
  - Integration: `pnpm -F integration-test test`
- Lint/format: `pnpm lint`, `pnpm lintfix`

## Coding Style & Naming Conventions

- TypeScript + React (`.tsx`). Components in `src/js/components` use PascalCase (e.g., `CloseButton.tsx`).
- Prettier: 2 spaces, single quotes, no semicolons, trailing commas (`.prettierrc.yaml`).
- ESLint: TypeScript + Jest rules (`eslint.config.mjs`). Fix with `pnpm lintfix`.
- Pre-commit: Husky runs lint-staged on staged files.

## Testing Guidelines

- Framework: Jest + Testing Library (`jsdom`). Coverage enabled; keep meaningful assertions and update snapshots when intentional.
- File names: `*.test.ts(x)` under `__tests__` near code.
- Run unit/UI: `pnpm -F tab-manager-v2 test`
- Run integration (Playwright + image snapshots): `pnpm -F integration-test test`

## Commit & Pull Request Guidelines

- Commit messages: Prefer Conventional Commits (e.g., `feat:`, `fix:`, `chore:`). Scope with folder/component when helpful.
- PRs must include: clear description, linked issues, and screenshots/GIFs for UI changes.
- Before opening PR: `pnpm lintfix && pnpm test` and verify local build (`pnpm -F tab-manager-v2 build:chrome`).
- Do not commit secrets or built artifacts. Update Storybook stories when changing UI components.

## Security & Configuration Tips

- Environment: `TARGET_BROWSER` (`chrome`|`firefox`), `PORT` for dev server (`utils/env.js`).
- Publishing uses `.release-it.yml` and platform CLIs; store tokens in env vars, never in the repo.
