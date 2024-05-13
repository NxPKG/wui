import React from 'react';

import {
  WuiButtonEmpty,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components';

export default () => (
  <WuiFlexGroup gutterSize="s" alignItems="center">
    <WuiFlexItem grow={false}>
      <WuiButtonEmpty flush="left">Flush left</WuiButtonEmpty>
    </WuiFlexItem>

    <WuiFlexItem grow={false}>
      <WuiButtonEmpty flush="right">Flush right</WuiButtonEmpty>
    </WuiFlexItem>

    <WuiFlexItem grow={false}>
      <WuiButtonEmpty flush="both">Flush both</WuiButtonEmpty>
    </WuiFlexItem>
  </WuiFlexGroup>
);
