import { PropTypes } from 'react-view';
import { WuiStat } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(WuiStat.__docgenInfo)
    ? WuiStat.__docgenInfo[0]
    : WuiStat.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.description = {
    ...propsToUse.description,
    value: 'Total people',
    type: PropTypes.String,
  };

  propsToUse.titleColor = {
    ...propsToUse.titleColor,
    options: {
      primary: 'primary',
      secondary: 'secondary',
      danger: 'danger',
      accent: 'accent',
      text: 'text',
    },
    defaultValue: 'text',
    type: PropTypes.Enum,
  };

  propsToUse.title = {
    ...propsToUse.title,
    value: '7,600 mm',
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'WuiStat',
      props: propsToUse,
      scope: {
        WuiStat,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiStat'],
        },
      },
    },
  };
};
