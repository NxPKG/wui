import { PropTypes } from 'react-view';
import { WuiCodeBlock, WuiCode } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

const codeDemo = `\n{\`${
  require('!!raw-loader!./code_examples/example.html').default
}\`}\n`;

export const codeBlockConfig = () => {
  const docgenInfo = Array.isArray(WuiCodeBlock.__docgenInfo)
    ? WuiCodeBlock.__docgenInfo[0]
    : WuiCodeBlock.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.language.value = 'html';

  propsToUse.children = {
    type: PropTypes.ReactNode,
    value: codeDemo,
    hidden: false,
  };

  propsToUse.inline = {
    ...propsToUse.inline,
    type: PropTypes.Boolean,
    value: false,
  };

  return {
    config: {
      componentName: 'WuiCodeBlock',
      props: propsToUse,
      scope: {
        WuiCodeBlock,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiCodeBlock'],
        },
      },
    },
  };
};

export const codeConfig = () => {
  const docgenInfo = Array.isArray(WuiCode.__docgenInfo)
    ? WuiCode.__docgenInfo[0]
    : WuiCode.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.language.value = 'html';

  propsToUse.children = {
    type: PropTypes.ReactNode,
    value: codeDemo,
    hidden: false,
  };

  propsToUse.inline = {
    ...propsToUse.inline,
    type: PropTypes.Boolean,
    value: false,
  };

  return {
    config: {
      componentName: 'WuiCode',
      props: propsToUse,
      scope: {
        WuiCode,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiCode'],
        },
      },
    },
  };
};
