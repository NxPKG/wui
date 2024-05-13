import { WuiPagination, WuiText } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  dummyFunction,
  simulateFunction,
} from '../../services/playground';

export const paginationConfig = () => {
  const docgenInfo = Array.isArray(WuiPagination.__docgenInfo)
    ? WuiPagination.__docgenInfo[0]
    : WuiPagination.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.onPageClick = simulateFunction(propsToUse.onPageClick);
  return {
    config: {
      componentName: 'WuiPagination',
      props: propsToUse,
      scope: {
        WuiPagination,
        WuiText,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiPagination', 'WuiText'],
        },
      },
      customProps: {
        onPageClick: dummyFunction,
      },
    },
  };
};
