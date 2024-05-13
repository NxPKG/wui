import React from 'react';

import { WuiFlexGroup, WuiFlexItem } from '../../../../src/components/flex';

export default () => (
  <WuiFlexGroup wrap>
    <WuiFlexItem style={{ minWidth: 300 }}>Min-width 300px</WuiFlexItem>

    <WuiFlexItem style={{ minWidth: 300 }}>Min-width 300px</WuiFlexItem>

    <WuiFlexItem style={{ minWidth: 300 }}>Min-width 300px</WuiFlexItem>
  </WuiFlexGroup>
);
