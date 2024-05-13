import React from 'react';

import {
  WuiButtonEmpty,
  WuiFlexGroup,
  WuiFlexItem,
} from '../../../../src/components/';

export default () => (
  <div>
    <WuiFlexGroup gutterSize="s" alignItems="center">
      <WuiFlexItem grow={false}>
        <WuiButtonEmpty onClick={() => window.alert('Button clicked')}>
          Primary
        </WuiButtonEmpty>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonEmpty size="s" onClick={() => window.alert('Button clicked')}>
          small
        </WuiButtonEmpty>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          size="xs"
          onClick={() => window.alert('Button clicked')}>
          extra small
        </WuiButtonEmpty>
      </WuiFlexItem>
    </WuiFlexGroup>

    <WuiFlexGroup gutterSize="s" alignItems="center">
      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown">
          Primary
        </WuiButtonEmpty>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          size="s"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown">
          small
        </WuiButtonEmpty>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown"
          iconSide="right">
          Primary
        </WuiButtonEmpty>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          size="s"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown"
          iconSide="right">
          small
        </WuiButtonEmpty>
      </WuiFlexItem>
    </WuiFlexGroup>

    <WuiFlexGroup gutterSize="s" alignItems="center">
      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          color="danger"
          onClick={() => window.alert('Button clicked')}>
          Danger
        </WuiButtonEmpty>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          color="danger"
          size="s"
          onClick={() => window.alert('Button clicked')}>
          small
        </WuiButtonEmpty>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          color="danger"
          size="xs"
          onClick={() => window.alert('Button clicked')}>
          extra small
        </WuiButtonEmpty>
      </WuiFlexItem>
    </WuiFlexGroup>

    <WuiFlexGroup gutterSize="s" alignItems="center">
      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          color="danger"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown">
          Danger
        </WuiButtonEmpty>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          color="danger"
          size="s"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown">
          small
        </WuiButtonEmpty>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          color="danger"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown"
          iconSide="right">
          Danger
        </WuiButtonEmpty>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          color="danger"
          size="s"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown"
          iconSide="right">
          small
        </WuiButtonEmpty>
      </WuiFlexItem>
    </WuiFlexGroup>

    <WuiFlexGroup gutterSize="s" alignItems="center">
      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          color="text"
          onClick={() => window.alert('Button clicked')}>
          Text
        </WuiButtonEmpty>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          color="text"
          size="s"
          onClick={() => window.alert('Button clicked')}>
          small
        </WuiButtonEmpty>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          color="text"
          size="xs"
          onClick={() => window.alert('Button clicked')}>
          extra small
        </WuiButtonEmpty>
      </WuiFlexItem>
    </WuiFlexGroup>

    <WuiFlexGroup gutterSize="s" alignItems="center">
      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          color="text"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown">
          Text
        </WuiButtonEmpty>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          color="text"
          size="s"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown">
          small
        </WuiButtonEmpty>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          color="text"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown"
          iconSide="right">
          Text
        </WuiButtonEmpty>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          color="text"
          size="s"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown"
          iconSide="right">
          small
        </WuiButtonEmpty>
      </WuiFlexItem>
    </WuiFlexGroup>

    <WuiFlexGroup gutterSize="s" alignItems="center">
      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          color="danger"
          onClick={() => window.alert('Button clicked')}
          isDisabled>
          Disabled
        </WuiButtonEmpty>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          color="danger"
          size="s"
          onClick={() => window.alert('Button clicked')}
          isDisabled>
          small
        </WuiButtonEmpty>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          color="danger"
          size="xs"
          onClick={() => window.alert('Button clicked')}
          isDisabled>
          extra small
        </WuiButtonEmpty>
      </WuiFlexItem>
    </WuiFlexGroup>

    <WuiFlexGroup gutterSize="s" alignItems="center">
      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          onClick={() => window.alert('Button clicked')}
          isLoading>
          Loading
        </WuiButtonEmpty>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          onClick={() => window.alert('Button clicked')}
          isLoading
          iconSide="right">
          Loading
        </WuiButtonEmpty>
      </WuiFlexItem>
    </WuiFlexGroup>

    <WuiFlexGroup gutterSize="s" alignItems="center">
      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          color="danger"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown"
          isDisabled>
          Disabled
        </WuiButtonEmpty>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          color="danger"
          size="s"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown"
          isDisabled>
          small
        </WuiButtonEmpty>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          color="danger"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown"
          iconSide="right"
          isDisabled>
          Disabled
        </WuiButtonEmpty>
      </WuiFlexItem>

      <WuiFlexItem grow={false}>
        <WuiButtonEmpty
          color="danger"
          size="s"
          onClick={() => window.alert('Button clicked')}
          iconType="arrowDown"
          iconSide="right"
          isDisabled>
          small
        </WuiButtonEmpty>
      </WuiFlexItem>
    </WuiFlexGroup>
  </div>
);
