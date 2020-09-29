module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
  transform: {
    '\\.vue$': 'vue-jest',
    '\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '\\.tsx?$': 'ts-jest',
    '\\.gql$': 'jest-transform-graphql',
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/../../src/$1',
    '^@@/(.*)$': '<rootDir>/../../$1',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['<rootDir>/**/*.(test|spec).(js|jsx|ts|tsx)'],
  testURL: 'http://localhost/',
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
};
