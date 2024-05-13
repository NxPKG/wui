/* eslint-disable @typescript-eslint/no-var-requires */

const { RuleTester } = require('eslint');
const rule = require('./href_or_on_click');
const dedent = require('dedent');

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
  parserOptions: {
    ecmaVersion: 2018,
  },
});

ruleTester.run('@wazuh/wui/href-or-on-click', rule, {
  valid: [
    {
      code: dedent(`
        module.export = () => (
          <WuiButton />
        )
      `),
    },
    {
      code: dedent(`
        module.export = () => (
          <WuiButton href="/" />
        )
      `),
    },
    {
      code: dedent(`
        module.export = () => (
          <WuiButton href={'/' + 'home'} />
        )
      `),
    },
    {
      code: dedent(`
        module.export = () => (
          <WuiButton onClick={executeAction} />
        )
      `),
    },
    {
      code: dedent(`
        module.export = () => (
          <WuiButton onClick={() => executeAction()} />
        )
      `),
    },
  ],

  invalid: [
    {
      code: dedent(`
        module.export = () => (
          <WuiButton href="/" onClick={fooBar} />
        )
      `),

      errors: [
        {
          message: '<WuiButton> accepts either `href` or `onClick`, not both.',
        },
      ],
    },
    {
      code: dedent(`
        module.export = () => (
          <WuiButtonEmpty href="/" onClick={fooBar} />
        )
      `),

      errors: [
        {
          message:
            '<WuiButtonEmpty> accepts either `href` or `onClick`, not both.',
        },
      ],
    },
    {
      code: dedent(`
        module.export = () => (
          <WuiLink href="/" onClick={fooBar} />
        )
      `),

      errors: [
        {
          message: '<WuiLink> accepts either `href` or `onClick`, not both.',
        },
      ],
    },
  ],
});
