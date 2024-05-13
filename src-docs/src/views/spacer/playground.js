import { WuiSpacer } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export const spacerConfig = () => {
  const docgenInfo = Array.isArray(WuiSpacer.__docgenInfo)
    ? WuiSpacer.__docgenInfo[0]
    : WuiSpacer.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  return {
    config: {
      componentName: 'WuiSpacer',
      props: propsToUse,
      scope: {
        WuiSpacer,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiSpacer'],
        },
      },
    },
    playgroundClassName: 'guideDemo__highlightSpacer',
  };
};
