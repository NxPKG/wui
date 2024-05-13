import React from 'react';

import { WuiFlexGroup, WuiFlexItem } from '../../../../src/components/flex';

export default () => (
  <button
    onClick={() => {
      window.alert('click');
    }}>
    <WuiFlexGroup component="span">
      <WuiFlexItem component="span">
        These items are within a button
      </WuiFlexItem>

      <WuiFlexItem component="span">
        So they all specify component=&ldquo;span&rdquo;
      </WuiFlexItem>
    </WuiFlexGroup>
  </button>
);
