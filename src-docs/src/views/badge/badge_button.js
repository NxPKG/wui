import React from 'react';

import {
  WuiBadge,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components';

export default () => (
  <WuiFlexGroup wrap responsive={false} gutterSize="xs">
    <WuiFlexItem grow={false}>
      <WuiBadge
        color="primary"
        onClick={() => window.alert('Badge clicked')}
        onClickAriaLabel="Example of onClick event for the button"
        data-test-sub="testExample1">
        onClick on text within badge
      </WuiBadge>
    </WuiFlexItem>
    <WuiFlexItem grow={false}>
      <WuiBadge
        color="hollow"
        iconType="cross"
        iconSide="right"
        iconOnClick={() => window.alert('Icon inside badge clicked')}
        iconOnClickAriaLabel="Example of onClick event for icon within the button"
        data-test-sub="testExample2">
        onClick on icon within badge
      </WuiBadge>
    </WuiFlexItem>
    <WuiFlexItem grow={false}>
      <WuiBadge
        color="secondary"
        iconType="cross"
        iconSide="right"
        onClick={() => window.alert('Badge clicked')}
        onClickAriaLabel="Example of onClick event for the button"
        iconOnClick={() => window.alert('Icon inside badge clicked')}
        iconOnClickAriaLabel="Example of onClick event for icon within the button"
        data-test-sub="testExample3">
        onClick on both text and icon within badge
      </WuiBadge>
    </WuiFlexItem>
    <WuiFlexItem grow={false}>
      <WuiBadge
        isDisabled={true}
        color="danger"
        onClick={() => window.alert('Badge clicked')}
        onClickAriaLabel="Example of disabled button badge"
        iconOnClick={() => window.alert('Disabled badge clicked')}
        iconOnClickAriaLabel="Example of disabled button badge"
        data-test-sub="testExample4">
        disabled button badge
      </WuiBadge>
    </WuiFlexItem>
  </WuiFlexGroup>
);
