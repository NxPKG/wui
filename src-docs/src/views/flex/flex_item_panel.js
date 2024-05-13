import React from 'react';

import {
  WuiFlexItem,
  WuiFlexGroup,
  WuiPanel,
  WuiCode,
  WuiText,
} from '../../../../src/components';

export default () => (
  <WuiFlexGroup>
    <WuiFlexItem>
      <WuiText>
        <p>
          <WuiCode>FlexItem</WuiCode>
        </p>
        <p>A side nav might be in this one.</p>
        <p>And you would want the panel on the right to expand with it.</p>
      </WuiText>
    </WuiFlexItem>

    <WuiFlexItem>
      <WuiPanel>
        <strong>WuiPanel</strong>
      </WuiPanel>
    </WuiFlexItem>

    <WuiFlexItem>
      <WuiPanel grow={false}>
        Another <strong>WuiPanel</strong>, with{' '}
        <WuiCode>grow=&#123;false&#125;</WuiCode>.
      </WuiPanel>
    </WuiFlexItem>
  </WuiFlexGroup>
);
