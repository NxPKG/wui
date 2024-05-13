import React from 'react';

import { WuiFlexGroup, WuiFlexItem } from '../../../../src/components/flex';

export default () => (
  <div>
    <WuiFlexGroup>
      <WuiFlexItem grow={false}>This item won&rsquo;t grow</WuiFlexItem>
      <WuiFlexItem>But this item will.</WuiFlexItem>
    </WuiFlexGroup>
  </div>
);
