import { PropTypes } from 'react-view';
import { WuiAccordion, WuiText } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  createOptionalEnum,
  dummyFunction,
  simulateFunction,
} from '../../services/playground';

export const accordionConfig = () => {
  const docgenInfo = Array.isArray(WuiAccordion.__docgenInfo)
    ? WuiAccordion.__docgenInfo[0]
    : WuiAccordion.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.buttonContent = {
    ...propsToUse.buttonContent,
    value: 'Click me to toggle',
    type: PropTypes.String,
  };

  propsToUse.children = {
    value: `<WuiText>
    <p>
      Any content inside of <strong>WuiAccordion</strong> will appear here.
    </p>
  </WuiText>`,
    type: PropTypes.ReactNode,
    hidden: false,
  };

  propsToUse.onToggle = simulateFunction(propsToUse.onToggle);

  propsToUse.forceState = createOptionalEnum(propsToUse.forceState);

  return {
    config: {
      componentName: 'WuiAccordion',
      props: propsToUse,
      scope: {
        WuiAccordion,
        WuiText,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiAccordion', 'WuiText'],
        },
      },
      customProps: {
        onToggle: dummyFunction,
      },
    },
  };
};
