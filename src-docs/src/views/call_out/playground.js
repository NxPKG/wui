import { PropTypes } from 'react-view';
import { WuiCallOut, WuiText } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  iconValidator,
} from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(WuiCallOut.__docgenInfo)
    ? WuiCallOut.__docgenInfo[0]
    : WuiCallOut.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.iconType = iconValidator(propsToUse.iconType);

  propsToUse.title = {
    ...propsToUse.title,
    value: 'Check it out',
    type: PropTypes.String,
  };

  propsToUse.children = {
    ...propsToUse.children,
    value: `<p>
   Any content inside of <strong>WuiCallOut</strong> will appear here.
  </p>`,
    type: PropTypes.ReactNode,
    description: 'Content to display inside the callout below the title',
    hidden: false,
  };

  return {
    config: {
      componentName: 'WuiCallOut',
      props: propsToUse,
      scope: {
        WuiCallOut,
        WuiText,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiCallOut', 'WuiText'],
        },
      },
    },
  };
};
