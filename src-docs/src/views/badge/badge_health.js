import React from 'react';

import {
  WuiBadge,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components';

export default () => (
  <WuiFlexGroup wrap responsive={false} gutterSize="xs">
    <WuiFlexItem grow={false}>
      <WuiBadge color="secondary">Healthy</WuiBadge>
    </WuiFlexItem>
    <WuiFlexItem grow={false}>
      <WuiBadge color="warning">Warning</WuiBadge>
    </WuiFlexItem>
    <WuiFlexItem grow={false}>
      <WuiBadge color="danger">Critical</WuiBadge>
    </WuiFlexItem>
    <WuiFlexItem grow={false}>
      <WuiBadge color="default">Unknown</WuiBadge>
    </WuiFlexItem>
  </WuiFlexGroup>
);
