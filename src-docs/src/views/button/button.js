import React from 'react';

import {
  WuiButton,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components/';

export default () => (
  <div>
    <WuiFlexGroup gutterSize="s" alignItems="center">
      <WuiFlexItem grow={false}>
        <WuiButton onClick={() => window.alert('Button clicked')}>
          Primary
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton fill onClick={() => window.alert('Button clicked')}>
          Filled
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton size="s" onClick={() => window.alert('Button clicked')}>
          Small
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton size="s" fill onClick={() => window.alert('Button clicked')}>
          Small and filled
        </WuiButton>
      </WuiFlexItem>
    </WuiFlexGroup>

    <WuiFlexGroup gutterSize="s" alignItems="center">
      <WuiFlexItem grow={false}>
        <WuiButton
          color="secondary"
          onClick={() => window.alert('Button clicked')}>
          Secondary
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton
          color="secondary"
          fill
          onClick={() => window.alert('Button clicked')}>
          Filled
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton
          color="secondary"
          size="s"
          onClick={() => window.alert('Button clicked')}>
          Small
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton
          color="secondary"
          size="s"
          fill
          onClick={() => window.alert('Button clicked')}>
          Small and filled
        </WuiButton>
      </WuiFlexItem>
    </WuiFlexGroup>

    <WuiFlexGroup gutterSize="s" alignItems="center">
      <WuiFlexItem grow={false}>
        <WuiButton
          color="warning"
          onClick={() => window.alert('Button clicked')}>
          Warning
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton
          color="warning"
          fill
          onClick={() => window.alert('Button clicked')}>
          Filled
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton
          color="warning"
          size="s"
          onClick={() => window.alert('Button clicked')}>
          Small
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton
          color="warning"
          size="s"
          fill
          onClick={() => window.alert('Button clicked')}>
          Small and filled
        </WuiButton>
      </WuiFlexItem>
    </WuiFlexGroup>

    <WuiFlexGroup gutterSize="s" alignItems="center">
      <WuiFlexItem grow={false}>
        <WuiButton
          color="danger"
          onClick={() => window.alert('Button clicked')}>
          Danger
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton
          color="danger"
          fill
          onClick={() => window.alert('Button clicked')}>
          Filled
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton
          color="danger"
          size="s"
          onClick={() => window.alert('Button clicked')}>
          Small
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton
          color="danger"
          size="s"
          fill
          onClick={() => window.alert('Button clicked')}>
          Small and filled
        </WuiButton>
      </WuiFlexItem>
    </WuiFlexGroup>

    <WuiFlexGroup gutterSize="s" alignItems="center">
      <WuiFlexItem grow={false}>
        <WuiButton isDisabled onClick={() => window.alert('Button clicked')}>
          Disabled
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton
          isDisabled
          fill
          onClick={() => window.alert('Button clicked')}>
          Filled
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton
          isDisabled
          size="s"
          onClick={() => window.alert('Button clicked')}>
          Small
        </WuiButton>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButton
          isDisabled
          size="s"
          fill
          onClick={() => window.alert('Button clicked')}>
          Small and filled
        </WuiButton>
      </WuiFlexItem>
    </WuiFlexGroup>
  </div>
);
