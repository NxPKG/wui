import React from 'react';

import {
  WuiBadge,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components';

export default () => (
  <WuiFlexGroup wrap responsive={false} gutterSize="xs">
    <WuiFlexItem grow={false}>
      <WuiBadge color="#BADA55" href="/#/display/badge">
        badge as an anchor
      </WuiBadge>
    </WuiFlexItem>
    <WuiFlexItem grow={false}>
      <WuiBadge color="hollow" href="/#/display/badge" target="blank">
        anchor with target specified
      </WuiBadge>
    </WuiFlexItem>
    <WuiFlexItem grow={false}>
      <WuiBadge
        color="accent"
        href="/#/display/badge"
        iconType="bolt"
        iconSide="right"
        iconOnClick={() => window.alert('Icon inside badge clicked')}
        iconOnClickAriaLabel="Example of onClick event for icon within the anchor">
        anchor with an icon and iconOnClick
      </WuiBadge>
    </WuiFlexItem>
    <WuiFlexItem grow={false}>
      <WuiBadge color="secondary" href="/#/display/badge" isDisabled={true}>
        disabled anchor badge
      </WuiBadge>
    </WuiFlexItem>
  </WuiFlexGroup>
);
