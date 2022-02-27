const namingConventions = [
  {
    selector: 'variable',
    format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
  },
  {
    selector: 'memberLike',
    format: ['camelCase', 'PascalCase'],
  },
  {
    selector: 'typeLike',
    format: ['PascalCase'],
  },
  {
    selector: 'property',
    filter: '(_id)',
    format: null,
    leadingUnderscore: 'allow',
  },
  {
    selector: 'parameterProperty',
    format: ['camelCase', 'PascalCase'],
    filter: {
      regex: '[- ]|',
      match: false,
    },
  },
];

module.exports = {
  parser: '@typescript-eslint/parser',

  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  globals: {
    __dirname: true,
    browser: true,
    'jest/globals': true,
    page: true,
    process: true,
  },
  plugins: [
    'react',
    'jest',
    'import',
    'json',
    '@typescript-eslint',
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/triple-slash-reference': 'off',
        'spaced-comment': 'off',
        camelcase: 'off',
      },
    },
    {
      files: ['*.test.ts', '*.test.tsx', 'jestsetup.ts', '*.stories.tsx'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'import/no-unresolved': 'off',
        'jest/no-mocks-import': 'off',
        'max-len': 'off',
        'no-bitwise': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'max-lines': 'off',
      },
    },
    {
      files: ['*.icon.tsx', 'icons.tsx'],
      rules: {
        'max-len': 'off',
      },
    },
    {
      files: ['*.stories.tsx'],
      rules: {
        'max-lines': 'off',
      },
    },
    {
      files: ['index.ts'],
      rules: {
        'import/named': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
        'no-empty-function': 'off',
        '@typescript-eslint/no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
          },
        ],
        'no-unused-expressions': 'off',
      },
    },
    {
      files: ['*.ts'],
      rules: {
        'max-lines': ['error', 200],
      },
    },
    {
      files: ['*.tsx'],
      rules: {
        'max-lines': ['error', 150],
      },
    },
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        arrowParens: 'avoid',
      },
    ],
    'global-require': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-shadow': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/naming-convention': ['error'].concat(namingConventions),
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'comma',
          requireLast: true,
        },
        overrides: {
          interface: {
            multiline: {
              delimiter: 'semi',
              requireLast: true,
            },
          },
          typeLiteral: {
            multiline: {
              delimiter: 'semi',
              requireLast: true,
            },
          },
        },
        singleline: {
          delimiter: 'comma',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'arrow-parens': ['error', 'as-needed'],
    'consistent-return': [
      'error',
      {
        treatUndefinedAsUnspecified: false,
      },
    ],
    'func-names': [
      'error',
      'as-needed',
      {
        generators: 'never',
      },
    ],
    'jest/expect-expect': [
      'error',
      {
        assertFunctionNames: ['expect', 'expectSaga'],
      },
    ],
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-relative-packages': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'max-len': [
      'error',
      {
        code: 120,
      },
    ],
    'no-param-reassign': [
      'error',
      {
        ignorePropertyModificationsFor: ['state'],
        props: true,
      },
    ],
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
      },
    ],
    'no-useless-escape': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react/prop-types': 'off',
    'react/sort-comp': [
      'error',
      {
        order: [
          'instance-variables',
          'static-methods',
          'lifecycle',
          'render',
          'everything-else',
        ],
      },
    ],
    'react/state-in-constructor': ['error', 'never'],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        labelComponents: ['CustomInputLabel'],
        labelAttributes: ['label'],
        controlComponents: ['CustomInput'],
        depth: 3,
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'no-underscore-dangle': 'off',
    'dot-notation': 'error',
    'react/function-component-definition': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off', // !!!
    'no-unused-vars': 'off',
    'max-lines': ['error', 300],
    'react/require-default-props': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off'
  },
};
