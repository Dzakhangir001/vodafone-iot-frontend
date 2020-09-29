# Introduction

This folder contains code to run
[automated visual tests](https://storybook.js.org/testing/automated-visual-testing/).

The following tools are used:
- [Storybook](https://storybook.js.org/)
- [jest-image-snapshot](https://github.com/americanexpress/jest-image-snapshot)


# Running visual tests

To run the visual test suite execute `npm run test:visual`. This will start a
Storybook dev server (in CI mode) to grab the screenshots from, runs the test
and shuts the server down after.


# Updating snapshots

The first time a new test case is ran or when there is no snapshot stored for
it, one will be written. If you want to update existing snapshots execute
`npm run test:visual:update`, which will update **all** snapshots.


# Adding a test case

To add a test case you first need to create a story for the component to test.

Example: `MyButton.stories.ts`
```ts
import { storiesOf } from '@storybook/vue';
import MyButton from './MyButton.vue';

storiesOf('MyButton', module)
  .add('with text', () => ({
    components: { MyButton },
    template: '<my-button @click="action">Click me!</my-button>',
  }));
```

Now you can add a call to `testStory` for your story in the `index.test.ts` test
case (or in another test file within this directory).

Example: `index.test.ts`
```ts
import testStory from './util';

testStory('MyButton', 'with text');
```
