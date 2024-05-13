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

    <WuiKeyPadMenuItem label="Dashboard" href="#">
      <WuiIcon type="dashboardApp" size="l" />
    </WuiKeyPadMenuItem>

    <WuiKeyPadMenuItem label="Dashboard" href="#">
      <WuiIcon type="dashboardApp" size="l" />
    </WuiKeyPadMenuItem>

    <WuiKeyPadMenuItem isDisabled label="Dashboard" href="#">
      <WuiIcon type="dashboardApp" size="l" />
    </WuiKeyPadMenuItem>
  </WuiKeyPadMenu>
);
