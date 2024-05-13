import { WuiAvatar, checkValidColor } from '../../../../src/components/avatar';
import { propUtilityForPlayground } from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(WuiAvatar.__docgenInfo)
    ? WuiAvatar.__docgenInfo[0]
    : WuiAvatar.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);
  propsToUse.name.value = 'Avatar';

  propsToUse.color = {
    ...propsToUse.color,
    value: undefined,
    custom: {
      ...propsToUse.color.custom,
      validator: val => {
        try {
          checkValidColor(val);
          return true;
        } catch (error) {
          return false;
        }
      },
    },
  };

  return {
    config: {
      componentName: 'WuiAvatar',
      props: propsToUse,
      scope: {
        WuiAvatar,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiAvatar'],
        },
      },
    },
  };
};
