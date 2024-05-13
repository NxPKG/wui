

module.exports = {
  rules: {
    'href-or-on-click': require('./rules/href_or_on_click'),
  },
  configs: {
    recommended: {
      plugins: ['@wazuh/eslint-plugin-wui'],
      rules: {
        '@wazuh/wui/href-or-on-click': 'error',
      },
    },
  },
};
