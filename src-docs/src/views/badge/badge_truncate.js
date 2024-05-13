import React from 'react';

import { WuiBadge, WuiPanel, WuiBadgeGroup } from '../../../../src/components';

export default () => (
  <WuiPanel style={{ maxWidth: 200 }}>
    <WuiBadgeGroup gutterSize="s">
      <WuiBadge>Badge with simple text being truncated</WuiBadge>

      <WuiBadge iconType="clock">Badge with icon being truncated</WuiBadge>

      <WuiBadge onClick={() => {}} onClickAriaLabel="Click this badge to...">
        Badge with onClick being truncated
      </WuiBadge>

      <WuiBadge
        iconType="cross"
        iconSide="right"
        iconOnClick={() => {}}
        iconOnClickAriaLabel="Click this icon to...">
        Badge with iconOnClick being truncated
      </WuiBadge>

      <WuiBadge
        iconType="cross"
        iconSide="right"
        onClick={() => {}}
        onClickAriaLabel="Click this badge to..."
        iconOnClick={() => {}}
        iconOnClickAriaLabel="Click this icon to...">
        Badge with both onClicks being truncated
      </WuiBadge>
    </WuiBadgeGroup>
  </WuiPanel>
);
