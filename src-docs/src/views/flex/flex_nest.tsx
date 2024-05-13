import React from 'react';

import {
  WuiFlexGrid,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components/flex';
import { WuiSpacer } from '../../../../src/components/spacer';

export default () => (
  <div>
    <WuiFlexGroup>
      <WuiFlexItem grow={false}>
        <div>Flex Group</div>
        <WuiSpacer />
        <WuiFlexGroup>
          <WuiFlexItem>Nested Grid One</WuiFlexItem>
          <WuiFlexItem>Nested Grid Two</WuiFlexItem>
        </WuiFlexGroup>
      </WuiFlexItem>
      <WuiFlexItem grow={false}>
        <div>Flex Grid</div>
        <WuiSpacer />
        <WuiFlexGrid columns={3}>
          <WuiFlexItem>Nested Grid One</WuiFlexItem>
          <WuiFlexItem>Nested Grid Two</WuiFlexItem>
          <WuiFlexItem>Nested Grid Three</WuiFlexItem>
          <WuiFlexItem>Nested Grid Four</WuiFlexItem>
        </WuiFlexGrid>
      </WuiFlexItem>
    </WuiFlexGroup>
  </div>
);
