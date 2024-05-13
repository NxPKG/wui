import { PropTypes } from 'react-view';
import { WuiHighlight, WuiMark } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export const highlightConfig = () => {
  const docgenInfo = Array.isArray(WuiHighlight.__docgenInfo)
    ? WuiHighlight.__docgenInfo[0]
    : WuiHighlight.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.String,
    hidden: false,
    value: 'The quick brown fox jumped over the lazy dog',
  };

  propsToUse.search = {
    ...propsToUse.search,
    type: PropTypes.String,
    hidden: false,
  };

  return {
    config: {
      componentName: 'WuiHighlight',
      props: propsToUse,
      scope: {
        WuiHighlight,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiHighlight'],
        },
      },
    },
  };
};

export const markConfig = () => {
  const docgenInfo = Array.isArray(WuiMark.__docgenInfo)
    ? WuiMark.__docgenInfo[0]
    : WuiMark.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children.value = 'mark';

  return {
    config: {
      componentName: 'WuiMark',
      props: propsToUse,
      scope: {
        WuiMark,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiMark'],
        },
      },
    },
  };
};
