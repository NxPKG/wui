import React from 'react';

import { WuiFlexGrid, WuiFlexItem } from '../../../../src/components/flex';

const ITEM_STYLE = { width: '300px' };

export default () => (
  <div>
    <WuiFlexGrid>
      <WuiFlexItem style={ITEM_STYLE}>
        <div>One</div>
      </WuiFlexItem>
      <WuiFlexItem style={ITEM_STYLE}>
        <div>Two</div>
      </WuiFlexItem>
      <WuiFlexItem style={ITEM_STYLE}>
        <div>Three</div>
      </WuiFlexItem>
      <WuiFlexItem style={ITEM_STYLE}>
        <div>Four</div>
      </WuiFlexItem>
      <WuiFlexItem style={ITEM_STYLE}>
        <div>Five</div>
      </WuiFlexItem>
      <WuiFlexItem style={ITEM_STYLE}>
        <div>Six</div>
      </WuiFlexItem>
      <WuiFlexItem style={ITEM_STYLE}>
        <div>Seven</div>
      </WuiFlexItem>
    </WuiFlexGrid>
  </div>
);
