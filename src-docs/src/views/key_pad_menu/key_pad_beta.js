import React from 'react';

import {
  WuiIcon,
  WuiKeyPadMenu,
  WuiKeyPadMenuItem,
} from '../../../../src/components';

export default () => (
  <WuiKeyPadMenu>
    <WuiKeyPadMenuItem label="Dashboard" href="#">
      <WuiIcon type="dashboardApp" size="l" />
    </WuiKeyPadMenuItem>

    <WuiKeyPadMenuItem
      label="Dashboard"
      href="#"
      betaBadgeLabel="Beta"
      betaBadgeTooltipContent="This module is not GA. Please help us by reporting any bugs.">
      <WuiIcon type="dashboardApp" size="l" />
    </WuiKeyPadMenuItem>

    <WuiKeyPadMenuItem
      label="Dashboard"
      href="#"
      betaBadgeLabel="External"
      betaBadgeTooltipContent="This module is an external app."
      betaBadgeIconType="popout">
      <WuiIcon type="dashboardApp" size="l" />
    </WuiKeyPadMenuItem>
  </WuiKeyPadMenu>
);
