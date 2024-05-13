import { PropTypes } from 'react-view';
import { WuiStep } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  createOptionalEnum,
} from '../../services/playground';

export const stepConfig = () => {
  const docgenInfo = Array.isArray(WuiStep.__docgenInfo)
    ? WuiStep.__docgenInfo[0]
    : WuiStep.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.title.value = 'Step';

  propsToUse.status = createOptionalEnum(propsToUse.status);

  propsToUse.children = {
    value: 'Do this first',
    type: PropTypes.String,
    hidden: false,
  };

  return {
    config: {
      componentName: 'WuiStep',
      props: propsToUse,
      scope: {
        WuiStep,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiStep'],
        },
      },
    },
  };
};
