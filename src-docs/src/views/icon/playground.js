import {
  propUtilityForPlayground,
  dummyFunction,
  iconValidator,
  createOptionalEnum,
  simulateFunction,
} from '../../services/playground';
import { WuiIcon } from '../../../../src/components/';

export default () => {
  const docgenInfo = Array.isArray(WuiIcon.__docgenInfo)
    ? WuiIcon.__docgenInfo[0]
    : WuiIcon.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.type = iconValidator(propsToUse.type);

  propsToUse.size = createOptionalEnum(propsToUse.size);

  propsToUse.onIconLoad = simulateFunction(propsToUse.onIconLoad);

  return {
    config: {
      componentName: 'WuiIcon',
      props: propsToUse,
      scope: {
        WuiIcon,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiIcon'],
        },
      },

      customProps: {
        onIconLoad: dummyFunction,
      },
    },
  };
};
