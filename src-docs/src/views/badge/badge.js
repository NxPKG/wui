import React, { Fragment, useState } from 'react';

import {
  WuiBadge,
  WuiFlexItem,
  WuiFlexGroup,
  WuiSpacer,
  WuiSwitch,
  WuiText,
  WuiTitle,
} from '../../../../src/components';

const badges = [
  'default',
  'hollow',
  'primary',
  'secondary',
  'accent',
  'warning',
  'danger',
];

const customBadges = [
  '#DDD',
  '#AAA',
  '#666',
  '#333',
  '#BADA55',
  '#FCF7BC',
  '#FEA27F',
  '#FFA500',
  '#0000FF',
];

export default () => {
  const [isDisabled, setDisabled] = useState(false);

  return (
    <Fragment>
      <WuiTitle size="xs">
        <h2>Accepted color names</h2>
      </WuiTitle>
      <WuiSpacer size="m" />
      <WuiFlexGroup wrap responsive={false} gutterSize="xs">
        {badges.map(badge => (
          <WuiFlexItem grow={false} key={badge}>
            <WuiBadge color={badge}>{badge}</WuiBadge>
          </WuiFlexItem>
        ))}
      </WuiFlexGroup>
      <WuiSpacer />
      <WuiTitle size="xs">
        <h3>Custom color examples</h3>
      </WuiTitle>
      <WuiSpacer size="m" />
      <WuiFlexGroup
        wrap
        responsive={false}
        gutterSize="xs"
        style={{ maxWidth: '300px' }}>
        {customBadges.map(badge => (
          <WuiFlexItem grow={false} key={badge}>
            <WuiBadge color={badge}>{badge}</WuiBadge>
          </WuiFlexItem>
        ))}
      </WuiFlexGroup>
      <WuiSpacer />
      <WuiTitle size="xs">
        <h3>Disabled state</h3>
      </WuiTitle>
      <WuiSpacer size="m" />
      <WuiText size="s">
        Regardless of the assigned color, all badges use the same disabled state
        styles.
      </WuiText>
      <WuiSpacer size="m" />
      <WuiSwitch
        label="Show disabled state"
        checked={isDisabled}
        onChange={e => setDisabled(e.target.checked)}
      />
      <WuiSpacer size="m" />
      <WuiFlexGroup wrap responsive={false} gutterSize="xs">
        <WuiFlexItem grow={false}>
          <WuiBadge color="secondary" isDisabled={isDisabled}>
            {isDisabled ? 'Disabled badge' : 'Disable me!'}
          </WuiBadge>
        </WuiFlexItem>
      </WuiFlexGroup>
    </Fragment>
  );
};
