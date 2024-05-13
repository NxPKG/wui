const rule = require('./i18n');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint')
});

const valid = [
  /** WuiI18n **/
  // nothing to validate against
  '<I18n token="wuiFooBar.tokenName" default="Some default value"/>',

  // values agree with default string
  `<WuiI18n token="wuiFooBar.tokenName" default="{value}, {value2}" values={{ value: 'Hello', value2: 'World' }}/>`,

  // valid tokens
  `<WuiI18n tokens={['wuiFooBar.token1', 'wuiFooBar.token2']} defaults={['value1', 'value 2']}/>`,

  // token name is used by render prop
  `<WuiI18n token="wuiFooBar.tokenName" default="Some default value">
      {tokenName => 'asdf'}
    </WuiI18n>`,
  `<WuiI18n token="wuiFooBar.tokenName" default="Some default value">
      {(tokenName) => 'asdf'}
    </WuiI18n>`,

  // token names are used by render prop
  `<WuiI18n tokens={['wuiFooBar.token1', 'wuiFooBar.token2']} defaults={['value 1', 'value 2']}>
      {([token1, token2]) => 'asdf'}
    </WuiI18n>`,

  // default callback params match values
  `<WuiI18n token="wuiFooBar.token" values={{ name: 'John' }} default={({ name }) => name}/>`,

  /** useWuiI18n **/
  // nothing to validate against
  `useI18n('wuiFooBar.tokenName', 'Some default value')`,

  // values agree with default string
  `useWuiI18n('wuiFooBar.tokenName', '{value}, {value2}', { value: 'Hello', value2: 'World' })`,

  // valid tokens
  `useWuiI18n(['wuiFooBar.token1', 'wuiFooBar.token2'], ['value1', 'value 2'])`,

  // default callback params match values
  `useWuiI18n('wuiFooBar.token', ({ name }) => name, { name: 'John' })`,
];
const invalid = [
  /** WuiI18n **/
  // token doesn't match file name
  {
    code: '<WuiI18n token="wuiFooeyBar.tokenName" default="Some default value"/>',
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'wuiFooeyBar.tokenName', tokenNamespace: 'wuiFooBar' } }]
  },

  // token doesn't have at least two parts
  {
    code: '<WuiI18n token="wuiFooBar" default="Some default value"/>',
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'wuiFooBar', tokenNamespace: 'wuiFooBar' } }]
  },
  {
    code: '<WuiI18n token="tokenName" default="Some default value"/>',
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'tokenName', tokenNamespace: 'wuiFooBar' } }]
  },

  // invalid tokens
  {
    code: `<WuiI18n tokens={['wuiFooBar.token1', 'token2']} defaults={['value1', 'value 2']}/>`,
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'token2', tokenNamespace: 'wuiFooBar' } }]
  },
  {
    code: `<WuiI18n tokens={['wuiFooeyBar.token1', 'wuiFooBar.token2']} defaults={['value1', 'value 2']}/>`,
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'wuiFooeyBar.token1', tokenNamespace: 'wuiFooBar' } }]
  },
  {
    code: `<WuiI18n tokens={['wuiFooBar.token1']} defaults={['value1', 'value 2']}/>`,
    errors: [{ messageId: 'mismatchedTokensAndDefaults', data: { tokenLength: 1, defaultsLength: 2 } }]
  },

  // values not in agreement with default string
  {
    code: `<WuiI18n token="wuiFooBar.tokenName" default="{value}, {value2}" values={{ valuee: 'Hello', value2: 'World' }}/>`,
    errors: [{
      messageId: 'mismatchedValues',
      data: {
        expected: 'value, value2',
        provided: 'value2, valuee'
      }
    }]
  },
  {
    code: `<WuiI18n token="wuiFooBar.tokenName" default="{valuee}, {value2}" values={{ value: 'Hello', value2: 'World' }}/>`,
    errors: [{
      messageId: 'mismatchedValues',
      data: {
        expected: 'value2, valuee',
        provided: 'value, value2'
      }
    }]
  },

  // token name isn't used by render prop
  {
    code: `<WuiI18n token="wuiFooBar.tokenName" default="Some default value">
      {tokenGame => 'asdf'}
    </WuiI18n>`,
    errors: [{
      messageId: 'tokenNamesNotUsedInRenderProp',
      data: {
        tokenNames: 'tokenName',
        paramNames: 'tokenGame',
      }
    }],
  },

  // token names aren't used by render prop
  {
    code: `<WuiI18n tokens={['wuiFooBar.token1', 'wuiFooBar.token2']} defaults={['value 1', 'value 2']}>
      {([tokener1, token2]) => 'asdf'}
    </WuiI18n>`,
    errors: [{
      messageId: 'tokenNamesNotUsedInRenderProp',
      data: {
        tokenNames: 'token1, token2',
        paramNames: 'token2, tokener1'
      }
    }],
  },

  // default callback params don't match values
  {
    code: `<WuiI18n token="wuiFooBar.token" values={{ nare: 'John' }} default={({ name }) => name}/>`,
    errors: [{
      messageId: 'mismatchedValues',
      data: {
        expected: 'name',
        provided: 'nare'
      }
    }]
  },

  // invalid attribute types
  {
    code: '<WuiI18n token={5} default="value"/>',
    errors: [{ messageId: 'invalidTokenType', data: { type: 'JSXExpressionContainer' } }]
  },
  {
    code: `<WuiI18n tokens="wuiFooBar.token" defaults={['value']}/>`,
    errors: [{ messageId: 'invalidTokensType', data: { type: 'Literal' } }]
  },
  {
    code: `<WuiI18n tokens={5} defaults={['value']}/>`,
    errors: [{ messageId: 'invalidTokensType', data: { type: 'Literal' } }]
  },
  {
    code: `<WuiI18n tokens={[5]} defaults={['value']}/>`,
    errors: [{ messageId: 'invalidTokensType', data: { type: 'Literal' } }]
  },
  {
    code: '<WuiI18n token="wuiFooBar.token" default={5}/>',
    errors: [{ messageId: 'invalidDefaultType', data: { type: 'Literal' } }]
  },
  {
    code: `<WuiI18n tokens={['wuiFooBar.token']} defaults="value"/>`,
    errors: [{ messageId: 'invalidDefaultsType', data: { type: 'Literal' } }]
  },
  {
    code: `<WuiI18n tokens={['wuiFooBar.token']} defaults={5}/>`,
    errors: [{ messageId: 'invalidDefaultsType', data: { type: 'Literal' } }]
  },
  {
    code: `<WuiI18n tokens={['wuiFooBar.token']} defaults={[5]}/>`,
    errors: [{ messageId: 'invalidDefaultsType', data: { type: 'Literal' } }]
  },

  // /** useWuiI18n **/
  // token doesn't match file name
  {
    code: `useWuiI18n('wuiFooeyBar.tokenName', 'Some default value')`,
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'wuiFooeyBar.tokenName', tokenNamespace: 'wuiFooBar' } }]
  },

  // token doesn't have at least two parts
  {
    code: `useWuiI18n('wuiFooBar', 'Some default value')`,
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'wuiFooBar', tokenNamespace: 'wuiFooBar' } }]
  },
  {
    code: `useWuiI18n('tokenName', 'Some default value')`,
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'tokenName', tokenNamespace: 'wuiFooBar' } }]
  },

  // invalid tokens
  {
    code: `useWuiI18n(['wuiFooBar.token1', 'token2'], ['value1', 'value 2'])`,
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'token2', tokenNamespace: 'wuiFooBar' } }]
  },
  {
    code: `useWuiI18n(['wuiFooeyBar.token1', 'wuiFooBar.token2'], ['value1', 'value 2'])`,
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'wuiFooeyBar.token1', tokenNamespace: 'wuiFooBar' } }]
  },
  {
    code: `useWuiI18n(['wuiFooBar.token1'], ['value1', 'value 2'])`,
    errors: [{ messageId: 'mismatchedTokensAndDefaults', data: { tokenLength: 1, defaultsLength: 2 } }]
  },

  // values not in agreement with default string
  {
    code: `useWuiI18n('wuiFooBar.tokenName', '{value}, {value2}', { valuee: 'Hello', value2: 'World' })`,
    errors: [{
      messageId: 'mismatchedValues',
      data: {
        expected: 'value, value2',
        provided: 'value2, valuee'
      }
    }]
  },
  {
    code: `useWuiI18n('wuiFooBar.tokenName', '{valuee}, {value2}', { value: 'Hello', value2: 'World' })`,
    errors: [{
      messageId: 'mismatchedValues',
      data: {
        expected: 'value2, valuee',
        provided: 'value, value2'
      }
    }]
  },

  // default callback params don't match values
  {
    code: `useWuiI18n('wuiFooBar.token', ({ name }) => name, { nare: 'John' })`,
    errors: [{
      messageId: 'mismatchedValues',
      data: {
        expected: 'name',
        provided: 'nare'
      }
    }]
  },

  // invalid attribute types
  {
    code: `useWuiI18n('wuiFooBar.token', ['value'])`,
    errors: [{ messageId: 'invalidDefaultType', data: { type: 'ArrayExpression' } }]
  },
  {
    code: `useWuiI18n(5, ['value'])`,
    errors: [{ messageId: 'invalidDefaultType', data: { type: 'ArrayExpression' } }]
  },
  {
    code: `useWuiI18n([5], ['value'])`,
    errors: [{ messageId: 'invalidTokensType', data: { type: 'Literal' } }]
  },
  {
    code: `useWuiI18n(['wuiFooBar.token'], 'value')`,
    errors: [{ messageId: 'invalidDefaultsType', data: { type: 'Literal' } }]
  },
  {
    code: `useWuiI18n(['wuiFooBar.token'], 5)`,
    errors: [{ messageId: 'invalidDefaultsType', data: { type: 'Literal' } }]
  },
  {
    code: `useWuiI18n(['wuiFooBar.token'], [5])`,
    errors: [{ messageId: 'invalidDefaultsType', data: { type: 'Literal' } }]
  },
];

function withFilename(ruleset) {
  return ruleset.map(code => {
    const definition = typeof code === 'string' ? { code } : code;
    definition.filename = 'foo_bar.js';
    return definition;
  });
}

ruleTester.run('i18n', rule, {
  valid: withFilename(valid),
  invalid: withFilename(invalid),
});
