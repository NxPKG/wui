import React from 'react';

import { WuiStat, WuiFlexItem, WuiFlexGroup } from '../../../../src/components';

export default () => (
  <div>
    <WuiFlexGroup>
      <WuiFlexItem>
        <WuiStat title="$ 1,000.00" description="Left align" textAlign="left" />
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiStat
          title="99.9999"
          description="Center align"
          textAlign="center"
        />
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiStat
          title="1,000.00 €"
          description="Right align"
          textAlign="right"
        />
      </WuiFlexItem>
    </WuiFlexGroup>
  </div>
);
