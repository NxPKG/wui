import { PropTypes } from 'react-view';
import { WuiTitle } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  createOptionalEnum,
} from '../../services/playground';

export const titleConfig = () => {
  const docgenInfo = Array.isArray(WuiTitle.__docgenInfo)
    ? WuiTitle.__docgenInfo[0]
    : WuiTitle.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.ReactNode,
    value: '<h2>Text content</h2>',
    hidden: false,
  };

  propsToUse.textTransform = createOptionalEnum(propsToUse.textTransform);

  return {
    config: {
      componentName: 'WuiTitle',
      props: propsToUse,
      scope: {
        WuiTitle,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiTitle'],
        },
      },
    },
  };
};
