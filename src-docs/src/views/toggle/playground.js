import { PropTypes } from 'react-view';
import { WuiToggle } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  dummyFunction,
  simulateFunction,
} from '../../services/playground';

export const toggleConfig = () => {
  const docgenInfo = Array.isArray(WuiToggle.__docgenInfo)
    ? WuiToggle.__docgenInfo[0]
    : WuiToggle.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.label.value = 'Is toggle on?';
  propsToUse.checked.stateful = true;
  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.ReactNode,
    value: "{checked ? 'On' : 'Off'}",
    hidden: false,
  };

  propsToUse.value = {
    ...propsToUse.value,
    type: PropTypes.String,
  };

  propsToUse.onChange = simulateFunction(propsToUse.onChange);

  return {
    config: {
      componentName: 'WuiToggle',
      props: propsToUse,
      scope: {
        WuiToggle,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiToggle'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};
