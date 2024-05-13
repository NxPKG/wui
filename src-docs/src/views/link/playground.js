import { PropTypes } from 'react-view';
import { WuiLink } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';
import * as t from '@babel/types';

export default () => {
  const docgenInfo = Array.isArray(WuiLink.__docgenInfo)
    ? WuiLink.__docgenInfo[0]
    : WuiLink.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.href = {
    type: PropTypes.String,
    value: 'http://www.wazuh.com',
  };
  propsToUse.target = {
    type: PropTypes.String,
    value: '_blank',
  };

  propsToUse.children = {
    value: 'Link to our website',
    type: PropTypes.String,
    hidden: false,
  };

  propsToUse.onClick = {
    ...propsToUse.onClick,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...propsToUse.onClick.custom,
      use: 'switch',
      label: 'Simulate',
    },
  };

  const setGhostBackground = {
    color: 'ghost',
  };

  return {
    setGhostBackground,
    config: {
      componentName: 'WuiLink',
      props: propsToUse,
      scope: {
        WuiLink,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiLink'],
        },
      },
      customProps: {
        onClick: {
          generate: val => {
            if (!val) return null;
            const obj = t.arrowFunctionExpression(
              [],
              t.blockStatement([]),
              false
            );
            return obj;
          },
        },
      },
    },
  };
};
