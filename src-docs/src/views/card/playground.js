import { PropTypes } from 'react-view';
import { WuiCard } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  dummyFunction,
  simulateFunction,
} from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(WuiCard.__docgenInfo)
    ? WuiCard.__docgenInfo[0]
    : WuiCard.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.title = {
    ...propsToUse.title,
    type: PropTypes.String,
    value: 'This is a card',
  };

  propsToUse.description = {
    ...propsToUse.description,
    type: PropTypes.String,
    value: "Example of a card's description. Stick to one or two sentences.",
  };

  propsToUse.image = {
    ...propsToUse.image,
    type: PropTypes.String,
  };

  propsToUse.onClick = simulateFunction(propsToUse.onClick);

  return {
    config: {
      componentName: 'WuiCard',
      props: propsToUse,
      scope: {
        WuiCard,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiCard'],
        },
      },
      customProps: {
        onClick: dummyFunction,
      },
    },
  };
};
