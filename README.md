# Commands

- `npm run serve` - Launches the dev server
- `npm run build` - Build a production ready set of resources into `/dist`
- `npm run lint` - Lint source files
- `npm run lint:fix` - Lint & fix source files
- `npm run test` - Run all test suites
- `npm run test:unit` - Run unit test suite
- `npm run test:e2e` - Run integration test suite
- `npm run test:visual` - Run visual test suite
- `npm run test:visual:update` - Update snapshots of visual test suite
- `npm run storybook:serve` - Run Storybook dev server
- `npm run storybook:build` - Build static Storybook into `/storybook/dist`

# Storybook

We use Storybook to ease the component development process. It allows a "UI
First" development pattern as well as an easy to use component browsers for
developers, project managers and customers.

See the [Storybook README](./storybook/README.md) for more information.

# Testing

Various testing techniques are facilitated to ensure a stable development
process.

- [Integration/End-To-End Testing](./tests/e2e/README.md)
- [Unit Testing](./tests/unit/README.md)
- [Visual Regression Testing](./tests/visual/README.md)

# Code Style

We use [TypeScript](https://www.typescriptlang.org/),
[Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) to
ensure a consistent code style and prevent bad basic coding patterns.

# VS Code

VS Code is the recommended IDE/editor to use for developing this app. Some
[useful settings](./.vscode/README.md) for VS Code are included in this
repository.
