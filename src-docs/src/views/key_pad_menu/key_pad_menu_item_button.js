import React from 'react';

import {
  WuiIcon,
  WuiKeyPadMenu,
  WuiKeyPadMenuItem,
} from '../../../../src/components';

export default () => (
  <WuiKeyPadMenu>
    <WuiKeyPadMenuItem
      label="Dashboard"
      onClick={() => window.alert('Clicked')}>
      <WuiIcon type="dashboardApp" size="l" />
    </WuiKeyPadMenuItem>
    <WuiKeyPadMenuItem
      label="Dashboard"
      isDisabled
      onClick={() => window.alert('Clicked')}>
      <WuiIcon type="dashboardApp" size="l" />
    </WuiKeyPadMenuItem>
  </WuiKeyPadMenu>
);
