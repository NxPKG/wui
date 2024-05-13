import React from 'react';

import { WuiStat, WuiFlexItem, WuiFlexGroup } from '../../../../src/components';

export default () => (
  <div>
    <WuiFlexGroup>
      <WuiFlexItem>
        <WuiStat title="10,000" description="Description underneath" reverse />
      </WuiFlexItem>
    </WuiFlexGroup>
  </div>
);
