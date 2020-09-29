import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  failureThresholdType: 'percent',
  failureThreshold: 0,
});

expect.extend({ toMatchImageSnapshot });
