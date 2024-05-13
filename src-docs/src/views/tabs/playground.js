import {
  propUtilityForPlayground,
  dummyFunction,
} from '../../services/playground';
import { WuiTab } from '../../../../src/components/';
import { PropTypes } from 'react-view';

export const tabConfig = () => {
  const docgenInfo = Array.isArray(WuiTab.__docgenInfo)
    ? WuiTab.__docgenInfo[0]
    : WuiTab.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

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

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.String,
    value: 'Tab content',
  };

  return {
    config: {
      componentName: 'WuiTab',
      props: propsToUse,
      scope: {
        WuiTab,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiTab'],
        },
      },
      customProps: {
        onClick: dummyFunction,
      },
    },
  };
};
