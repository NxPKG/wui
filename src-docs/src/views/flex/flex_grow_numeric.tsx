import React from 'react';

import { WuiFlexGroup, WuiFlexItem } from '../../../../src/components/flex';
import { WuiSpacer } from '../../../../src/components/spacer';

export default () => (
  <div>
    <WuiFlexGroup>
      <WuiFlexItem grow={1}>1</WuiFlexItem>
      <WuiFlexItem grow={2}>
        2<br />
        wraps content if necessary
      </WuiFlexItem>
      <WuiFlexItem grow={3}>
        3<br />
        expands_to_fit_if_content_cannot_wrap
      </WuiFlexItem>
      <WuiFlexItem grow={4}>4</WuiFlexItem>
    </WuiFlexGroup>

    <WuiSpacer />

    <WuiFlexGroup>
      <WuiFlexItem grow={6}>6</WuiFlexItem>
      <WuiFlexItem grow={3}>3</WuiFlexItem>
      <WuiFlexItem grow={1}>1</WuiFlexItem>
      <WuiFlexItem grow={3}>3</WuiFlexItem>
      <WuiFlexItem grow={6}>6</WuiFlexItem>
    </WuiFlexGroup>
  </div>
);
