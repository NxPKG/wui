import React from 'react';

import { WuiFlexGroup, WuiFlexItem } from '../../../../src/components/flex';
import { WuiSpacer } from '../../../../src/components/spacer';

export default () => (
  <WuiFlexGroup>
    <WuiFlexItem>Content grid item</WuiFlexItem>
    <WuiFlexItem>
      <p>Another content grid item</p>
      <WuiSpacer />
      <p>
        Note how both of these are the same width and height despite having
        different content?
      </p>
    </WuiFlexItem>
  </WuiFlexGroup>
);
