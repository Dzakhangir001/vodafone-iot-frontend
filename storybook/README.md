# Introduction

This folder contains configuration and setup files for
[Storybook](https://storybook.js.org/basics/guide-vue/). The integration is done
via [vue-cli-plugin-storybook](https://github.com/storybooks/vue-cli-plugin-storybook).


# Running Storybook

Execute `npm run storybook:serve` to start the Storybook dev server and launch
your browser.


# Building Storybook

Execute `npm run storybook:build` to build a static version of Storybook.


# Writing a new story

To add a new story for your component, you can just create a `*.stories.ts` file
next to your component (if it doesnt already exist). Multiple stories can be
placed into one file.

Example: `MyButton.stories.ts`
```ts
import { storiesOf } from '@storybook/vue';
import MyButton from './MyButton.vue';

storiesOf('MyButton', module) // Name of the component
  .add('with text', () => ({ // Name of the story
    // Vue component options describing the story
    components: { MyButton },
    template: '<my-button @click="action">Click me!</my-button>',
  }));
```

Placing a components stories file next to the component is a convention. In this
setup `*.stories.ts` files are loaded from anywhere within the `./src` or
`./storybook` directory.
