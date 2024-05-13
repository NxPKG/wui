import React from 'react';

import {
  WuiButton,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components';

export default () => (
  <WuiFlexGroup gutterSize="s" alignItems="center" wrap>
    <WuiFlexItem grow={false}>
      <WuiButton isLoading={true}>Loading&hellip;</WuiButton>
    </WuiFlexItem>

    <WuiFlexItem grow={false}>
      <WuiButton fill isLoading={true}>
        Loading&hellip;
      </WuiButton>
    </WuiFlexItem>

    <WuiFlexItem grow={false}>
      <WuiButton fill isLoading={true} iconType="check" iconSide="right">
        Loading&hellip;
      </WuiButton>
    </WuiFlexItem>
  </WuiFlexGroup>
);
