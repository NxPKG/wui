import React from 'react';

import {
  WuiButtonIcon,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components';

const colors = [
  'primary',
  'text',
  'accent',
  'subdued',
  'success',
  'warning',
  'danger',
  'disabled',
];

export default () => (
  <WuiFlexGroup gutterSize="s" alignItems="center">
    {colors.map(color => (
      <WuiFlexItem key={color} grow={false}>
        <WuiButtonIcon
          color={color}
          onClick={() => window.alert('Button clicked')}
          iconType="arrowRight"
          aria-label="Next"
          disabled={color === 'disabled' ? true : false}
        />
      </WuiFlexItem>
    ))}
  </WuiFlexGroup>
);
