import { PropTypes } from 'react-view';
import { WuiToolTip } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  dummyFunction,
  simulateFunction,
} from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(WuiToolTip.__docgenInfo)
    ? WuiToolTip.__docgenInfo[0]
    : WuiToolTip.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.ReactNode,
    value: '<h4>Hover here</h4>',
    hidden: false,
  };

  propsToUse.title = {
    ...propsToUse.title,
    type: PropTypes.String,
    value: 'Title',
  };

  propsToUse.content = {
    ...propsToUse.content,
    type: PropTypes.String,
    value: 'Content',
  };

  propsToUse.onMouseOut = simulateFunction(propsToUse.onMouseOut);

  return {
    config: {
      componentName: 'WuiToolTip',
      props: propsToUse,
      scope: {
        WuiToolTip,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiToolTip'],
        },
      },
      customProps: {
        onMouseOut: dummyFunction,
      },
    },
  };
};
