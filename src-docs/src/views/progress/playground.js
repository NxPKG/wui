import { PropTypes } from 'react-view';
import { WuiProgress } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(WuiProgress.__docgenInfo)
    ? WuiProgress.__docgenInfo[0]
    : WuiProgress.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.value = {
    ...propsToUse.value,
    value: undefined,
    type: PropTypes.Number,
  };

  propsToUse.valueText = {
    ...propsToUse.valueText,
    type: PropTypes.Boolean,
    value: false,
  };

  propsToUse.label = {
    ...propsToUse.label,
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'WuiProgress',
      props: propsToUse,
      scope: {
        WuiProgress,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiProgress'],
        },
      },
    },
  };
};
