import { propUtilityForPlayground } from '../../services/playground';
import {
  WuiLoadingWazuh,
  WuiLoadingChart,
  WuiLoadingSpinner,
  WuiLoadingContent,
} from '../../../../src/components/';
import { PropTypes } from 'react-view';

export const loadingWazuhConfig = () => {
  const docgenInfo = Array.isArray(WuiLoadingWazuh.__docgenInfo)
    ? WuiLoadingWazuh.__docgenInfo[0]
    : WuiLoadingWazuh.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  return {
    config: {
      componentName: 'WuiLoadingWazuh',
      props: propsToUse,
      scope: {
        WuiLoadingWazuh,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiLoadingWazuh'],
        },
      },
    },
  };
};

export const loadingChartConfig = () => {
  const docgenInfo = Array.isArray(WuiLoadingChart.__docgenInfo)
    ? WuiLoadingChart.__docgenInfo[0]
    : WuiLoadingChart.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  return {
    config: {
      componentName: 'WuiLoadingChart',
      props: propsToUse,
      scope: {
        WuiLoadingChart,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiLoadingChart'],
        },
      },
    },
  };
};

export const loadingSpinnerConfig = () => {
  const docgenInfo = Array.isArray(WuiLoadingSpinner.__docgenInfo)
    ? WuiLoadingSpinner.__docgenInfo[0]
    : WuiLoadingSpinner.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  return {
    config: {
      componentName: 'WuiLoadingSpinner',
      props: propsToUse,
      scope: {
        WuiLoadingSpinner,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiLoadingSpinner'],
        },
      },
    },
  };
};

export const loadingContentConfig = () => {
  const docgenInfo = Array.isArray(WuiLoadingContent.__docgenInfo)
    ? WuiLoadingContent.__docgenInfo[0]
    : WuiLoadingContent.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.lines = {
    ...propsToUse.lines,
    type: PropTypes.Number,
  };

  return {
    config: {
      componentName: 'WuiLoadingContent',
      props: propsToUse,
      scope: {
        WuiLoadingContent,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiLoadingContent'],
        },
      },
    },
  };
};
