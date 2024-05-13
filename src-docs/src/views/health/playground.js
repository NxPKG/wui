import { PropTypes } from 'react-view';
import { WuiHealth } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(WuiHealth.__docgenInfo)
    ? WuiHealth.__docgenInfo[0]
    : WuiHealth.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.String,
    value: 'Status',
  };

  propsToUse.color = {
    ...propsToUse.color,
    options: {
      default: 'default',
      primary: 'primary',
      secondary: 'secondary',
      success: 'success',
      accent: 'accent',
      warning: 'warning',
      danger: 'danger',
      text: 'text',
      subdued: 'subdued',
      ghost: 'ghost',
    },
    type: PropTypes.Enum,
  };

  const setGhostBackground = {
    color: 'ghost',
  };

  return {
    config: {
      componentName: 'WuiHealth',
      props: propsToUse,
      scope: {
        WuiHealth,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiHealth'],
        },
      },
    },
    setGhostBackground,
  };
};
