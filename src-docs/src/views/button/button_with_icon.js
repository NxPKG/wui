import React from 'react';

import {
  WuiButton,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components';

export default () => (
  <div>
    <WuiFlexGroup gutterSize="s" alignItems="center">
      <WuiFlexItem grow={false}>
        <WuiButton
          onClick={() => window.alert('Button clicked')}
          iconType="arrowUp">
          Primary
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton
          fill
          iconType="arrowDown"
          onClick={() => window.alert('Button clicked')}>
          Filled
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton
          iconType="arrowLeft"
          size="s"
          onClick={() => window.alert('Button clicked')}>
          small
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton
          iconType="arrowRight"
          size="s"
          fill
          onClick={() => window.alert('Button clicked')}>
          small and filled
        </WuiButton>
      </WuiFlexItem>
    </WuiFlexGroup>

    <WuiFlexGroup gutterSize="s" alignItems="center">
      <WuiFlexItem grow={false}>
        <WuiButton
          iconSide="right"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowUp">
          Primary
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton
          iconSide="right"
          fill
          iconType="arrowDown"
          onClick={() => window.alert('Button clicked')}>
          Filled
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton
          iconSide="right"
          iconType="arrowLeft"
          size="s"
          onClick={() => window.alert('Button clicked')}>
          small
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton
          iconSide="right"
          iconType="arrowRight"
          size="s"
          fill
          onClick={() => window.alert('Button clicked')}>
          small and filled
        </WuiButton>
      </WuiFlexItem>
    </WuiFlexGroup>

    <WuiFlexGroup gutterSize="s" alignItems="center">
      <WuiFlexItem grow={false}>
        <WuiButton
          iconSide="right"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowUp"
          isDisabled>
          Disabled
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton
          iconSide="right"
          fill
          iconType="arrowDown"
          onClick={() => window.alert('Button clicked')}
          isDisabled>
          Filled
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton
          iconSide="right"
          iconType="arrowLeft"
          size="s"
          onClick={() => window.alert('Button clicked')}
          isDisabled>
          small
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton
          iconSide="right"
          iconType="arrowRight"
          size="s"
          fill
          onClick={() => window.alert('Button clicked')}
          isDisabled>
          small and filled
        </WuiButton>
      </WuiFlexItem>
    </WuiFlexGroup>
  </div>
);
