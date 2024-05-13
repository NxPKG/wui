import { PropTypes } from 'react-view';
import { WuiFacetButton, WuiFacetGroup } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';
import * as t from '@babel/types';

export const facetButtonConfig = () => {
  const docgenInfo = Array.isArray(WuiFacetButton.__docgenInfo)
    ? WuiFacetButton.__docgenInfo[0]
    : WuiFacetButton.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.onClick = {
    ...propsToUse.onClick,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...propsToUse.onClick.custom,
      use: 'switch',
      label: 'Simulate',
    },
  };

  propsToUse.children = {
    type: PropTypes.String,
    value: 'Facet content',
    hidden: false,
  };

  propsToUse.quantity = {
    ...propsToUse.quantity,
    value: 10,
  };

  return {
    config: {
      componentName: 'WuiFacetButton',
      props: propsToUse,
      scope: {
        WuiFacetButton,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiFacetButton'],
        },
      },
      customProps: {
        onClick: {
          generate: val => {
            if (!val) return null;
            const obj = t.arrowFunctionExpression(
              [],
              t.blockStatement([]),
              false
            );
            return obj;
          },
        },
      },
    },
  };
};

export const facetLayoutConfig = () => {
  const docgenInfo = Array.isArray(WuiFacetGroup.__docgenInfo)
    ? WuiFacetGroup.__docgenInfo[0]
    : WuiFacetGroup.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    type: PropTypes.ReactNode,
    value: `<WuiFacetButton quantity={6}>
    Facet one
  </WuiFacetButton>
  <WuiFacetButton quantity={10}>
     Facet two
  </WuiFacetButton>
  <WuiFacetButton quantity={25}>
    Facet three
  </WuiFacetButton>`,
    hidden: false,
  };

  return {
    config: {
      componentName: 'WuiFacetGroup',
      props: propsToUse,
      scope: {
        WuiFacetButton,
        WuiFacetGroup,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiFacetButton', 'WuiFacetGroup'],
        },
      },
    },
  };
};
