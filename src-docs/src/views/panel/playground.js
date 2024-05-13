import { PropTypes } from 'react-view';
import { WuiPanel, WuiText } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';
import * as t from '@babel/types';

export const panelConfig = () => {
  const docgenInfo = Array.isArray(WuiPanel.__docgenInfo)
    ? WuiPanel.__docgenInfo[0]
    : WuiPanel.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    value: `<WuiText>
    <p>
      Any content inside of <strong>WuiPanel</strong> will appear here.
    </p>
  </WuiText>`,
    type: PropTypes.ReactNode,
    hidden: false,
  };

  propsToUse.betaBadgeTooltipContent = {
    ...propsToUse.betaBadgeTooltipContent,
    type: PropTypes.String,
    hidden: false,
  };

  propsToUse.onClick = {
    ...propsToUse.onClick,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      use: 'switch',
      label: 'Simulate',
    },
  };

  return {
    config: {
      componentName: 'WuiPanel',
      props: propsToUse,
      scope: {
        WuiPanel,
        WuiText,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiPanel', 'WuiText'],
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
