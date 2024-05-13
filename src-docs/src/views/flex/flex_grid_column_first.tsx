import React from 'react';

import { WuiFlexGrid, WuiFlexItem } from '../../../../src/components/flex';

export default () => (
  <div>
    <WuiFlexGrid columns={2} direction="column">
      <WuiFlexItem>
        <div>One</div>
      </WuiFlexItem>
      <WuiFlexItem>
        <div>Two</div>
      </WuiFlexItem>
      <WuiFlexItem>
        <div>Three</div>
      </WuiFlexItem>
      <WuiFlexItem>
        <div>Four</div>
      </WuiFlexItem>
      <WuiFlexItem>
        <div>Five</div>
      </WuiFlexItem>
      <WuiFlexItem>
        <div>Six</div>
      </WuiFlexItem>
      <WuiFlexItem>
        <div>Seven</div>
      </WuiFlexItem>
    </WuiFlexGrid>
  </div>
);
