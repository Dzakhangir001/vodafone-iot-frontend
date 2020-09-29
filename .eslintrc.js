module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:vue/recommended',
    'prettier/vue',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // replex rules
    complexity: ['error', 12],
    'no-template-curly-in-string': 'warn',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/no-var-requires': 'off', // reenabled only for .tsx? files
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          { allowExpressions: true, allowTypedFunctionExpressions: true },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-parameter-properties': [
          'error',
          {
            // we actually allow all parameter props except "readonly" without
            // visibility modifier, this is inline with normal prop declarations
            allows: ['private', 'protected', 'public', 'private readonly', 'protected readonly', 'public readonly'],
          },
        ],
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-var-requires': 'error',
      },
    },
  ],
};
