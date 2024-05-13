import { PropTypes } from 'react-view';
import { WuiBeacon } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export const beaconConfig = () => {
  const docgenInfo = Array.isArray(WuiBeacon.__docgenInfo)
    ? WuiBeacon.__docgenInfo[0]
    : WuiBeacon.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.size = {
    ...propsToUse.size,
    type: PropTypes.Number,
    defaultValue: 12,
  };

  return {
    config: {
      componentName: 'WuiBeacon',
      props: propsToUse,
      scope: {
        WuiBeacon,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiBeacon'],
        },
      },
    },
  };
};
