module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:import/errors'],
  rules: {
    'comma-dangle': [1, 'never'],
    'max-len': [1, 130, 2],
    'prettier/prettier': 0,
    'object-curly-spacing': [1, 'always'],
    'indent': [1, 2],
    'object-property-newline': [1, {
      'allowAllPropertiesOnSameLine': true
    }],
    'object-curly-newline': [1, {
      'ObjectPattern': 'never'
    }],
    'import/no-cycle': 1,
    'import/first': 1,
    'import/no-duplicates': 1,
    'import/order': [1, {
      'groups': ['external'],
      'newlines-between': 'always'
    }],
    'import/newline-after-import': [1, { 'count': 2 }],
    'import/no-unused-modules': [1, { 'unusedExports': true }],
    'comma-spacing': [1, { 'before': false, 'after': true }],
    'no-multi-spaces': 1,
    'arrow-spacing': [1, { 'before': true, 'after': true }],
    'array-bracket-spacing': 1,
    'space-in-parens': 1,
    'key-spacing': [1, { 'beforeColon': false, 'afterColon': true }]
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": false
    }
  }
};
