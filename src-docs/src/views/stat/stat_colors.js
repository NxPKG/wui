import React from 'react';

import { WuiStat, WuiFlexItem, WuiFlexGroup } from '../../../../src/components';

export default () => (
  <div>
    <WuiFlexGroup>
      <WuiFlexItem>
        <WuiStat title="1" description="Default color" />
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiStat title="10" description="Subdued color" titleColor="subdued" />
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiStat title="100" description="Primary color" titleColor="primary" />
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiStat
          title="1,000"
          description="Secondary color"
          titleColor="secondary"
        />
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiStat
          title="10,000"
          description="Danger color"
          titleColor="danger"
        />
      </WuiFlexItem>
      <WuiFlexItem>
        <WuiStat
          title="100,000"
          description="Accent color"
          titleColor="accent"
        />
      </WuiFlexItem>
    </WuiFlexGroup>
  </div>
);
