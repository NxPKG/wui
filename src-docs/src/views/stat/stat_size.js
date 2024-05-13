import React from 'react';

import { WuiStat, WuiFlexItem, WuiFlexGroup } from '../../../../src/components';

export default () => (
  <div>
    <WuiFlexGroup>
      <WuiFlexItem>
        <WuiStat title="1,000,000" description="Large size" titleSize="l" />
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiStat title="1,000,000" description="Medium size" titleSize="m" />
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiStat title="1,000,000" description="Small size" titleSize="s" />
      </WuiFlexItem>
    </WuiFlexGroup>
  </div>
);
