import { PropTypes } from 'react-view';
import { WuiButton } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  iconValidator,
} from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(WuiButton.__docgenInfo)
    ? WuiButton.__docgenInfo[0]
    : WuiButton.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.iconType = iconValidator(propsToUse.iconType);

  propsToUse.children = {
    value: 'Button',
    type: PropTypes.ReactNode,
    description: 'Visible label.',
    hidden: true,
  };

  const setGhostBackground = {
    color: 'ghost',
  };

  return {
    config: {
      componentName: 'WuiButton',
      props: propsToUse,
      scope: {
        WuiButton,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiButton'],
        },
      },
    },
    setGhostBackground,
  };
};
