import { PropTypes } from 'react-view';
import {
  WuiFlexGroup,
  WuiFlexItem,
  WuiFlexGrid,
} from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export const flexGroupConfig = () => {
  const docgenInfo = Array.isArray(WuiFlexGroup.__docgenInfo)
    ? WuiFlexGroup.__docgenInfo[0]
    : WuiFlexGroup.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    type: PropTypes.ReactNode,
    value: `<WuiFlexItem>Content grid item</WuiFlexItem>
    <WuiFlexItem style={{ minWidth: 100 }}>Min-width 300px</WuiFlexItem>
    <WuiFlexItem component="span">
    This is a span component
  </WuiFlexItem>
    <WuiFlexItem>
      <p>Another content grid item</p>
      <p>
        Note how both of these are the same width and height despite having
        different content?
      </p>
    </WuiFlexItem>`,
    hidden: false,
  };

  return {
    config: {
      componentName: 'WuiFlexGroup',
      props: propsToUse,
      scope: {
        WuiFlexGroup,
        WuiFlexItem,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiFlexGroup', 'WuiFlexItem'],
        },
      },
    },
    playgroundClassName: 'guideDemo__highlightGrid',
  };
};

export const flexGridConfig = () => {
  const docgenInfo = Array.isArray(WuiFlexGrid.__docgenInfo)
    ? WuiFlexGrid.__docgenInfo[0]
    : WuiFlexGrid.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    type: PropTypes.ReactNode,
    value: `<WuiFlexItem>Content grid item</WuiFlexItem>
      <WuiFlexItem style={{ minWidth: 100 }}>Min-width 300px</WuiFlexItem>
      <WuiFlexItem component="span">
      This is a span component
    </WuiFlexItem>
      <WuiFlexItem>
        <p>Another content grid item</p>
        <p>
          Note how both of these are the same width and height despite having
          different content?
        </p>
      </WuiFlexItem>`,
    hidden: false,
  };

  return {
    config: {
      componentName: 'WuiFlexGrid',
      props: propsToUse,
      scope: {
        WuiFlexGrid,
        WuiFlexItem,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiFlexGrid', 'WuiFlexItem'],
        },
      },
    },
    playgroundClassName: 'guideDemo__highlightGrid',
  };
};
