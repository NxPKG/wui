import React from 'react';

import { WuiFlexGroup, WuiFlexItem } from '../../../../src/components/flex';

export default () => (
  <WuiFlexGroup direction="column">
    <WuiFlexItem grow={false}>Content grid item</WuiFlexItem>
    <WuiFlexItem grow={false}>Another content grid item</WuiFlexItem>
    <WuiFlexItem grow={false}>Using the column direction</WuiFlexItem>
  </WuiFlexGroup>
);
