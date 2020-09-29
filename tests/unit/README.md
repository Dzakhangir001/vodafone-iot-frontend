# Introduction

This folder contains unit test specs. While unit testing (visual) Vue components
is possible like in the example below, intergration or end-to-end testing should
be the prefered way of testing components. Unit testing is much more suited for
testing non-rendering features of your app, like utility functions, API clients,
data stores and so on.

We use [Jest](https://jestjs.io/) as our unit testing framework.

# Running unit tests

To run the unit test suite execute `npm run test:unit` or
`npm run test:unit PATTERN`, where `PATTERN` is a regular expression filter
applied to the path of test files. See [Running from the command line](https://jestjs.io/docs/en/cli#running-from-the-command-line)
in the Jest documentation.

All files inside the `./tests/unit` directory matching the glob
`**/*.(test|spec).(js|jsx|ts|tsx)` will be executed.

# Example

Example: `HelloWorld.spec.ts`
```ts
import HelloWorld from '@/components/HelloWorld.vue';
import { shallowMount } from '@vue/test-utils';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
```
