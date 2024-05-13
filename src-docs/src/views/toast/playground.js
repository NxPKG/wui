import { PropTypes } from 'react-view';
import { WuiToast } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  iconValidator,
  createOptionalEnum,
  dummyFunction,
  simulateFunction,
} from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(WuiToast.__docgenInfo)
    ? WuiToast.__docgenInfo[0]
    : WuiToast.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.iconType = iconValidator(propsToUse.iconType);

  propsToUse.title = {
    ...propsToUse.title,
    type: PropTypes.String,
    value: 'Toast content',
  };

  propsToUse.color = createOptionalEnum(propsToUse.color);

  propsToUse.onClose = simulateFunction(propsToUse.onClose);

  return {
    config: {
      componentName: 'WuiToast',
      props: propsToUse,
      scope: {
        WuiToast,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiToast'],
        },
      },
      customProps: {
        onClose: dummyFunction,
      },
    },
  };
};
