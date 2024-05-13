import { WuiHorizontalRule } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export const horizontalRuleConfig = () => {
  const docgenInfo = Array.isArray(WuiHorizontalRule.__docgenInfo)
    ? WuiHorizontalRule.__docgenInfo[0]
    : WuiHorizontalRule.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  return {
    config: {
      componentName: 'WuiHorizontalRule',
      props: propsToUse,
      scope: {
        WuiHorizontalRule,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiHorizontalRule'],
        },
      },
    },
  };
};
