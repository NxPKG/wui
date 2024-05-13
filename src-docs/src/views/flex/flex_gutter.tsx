import React from 'react';

import { WuiFlexGroup, WuiFlexItem } from '../../../../src/components/flex';
import { WuiSpacer } from '../../../../src/components/spacer';

export default () => (
  <div>
    <WuiFlexGroup gutterSize="none">
      <WuiFlexItem>None</WuiFlexItem>
      <WuiFlexItem>None</WuiFlexItem>
      <WuiFlexItem>None</WuiFlexItem>
      <WuiFlexItem>None</WuiFlexItem>
    </WuiFlexGroup>

    <WuiSpacer />

    <WuiFlexGroup gutterSize="xs">
      <WuiFlexItem>Extra small</WuiFlexItem>
      <WuiFlexItem>Extra small</WuiFlexItem>
      <WuiFlexItem>Extra small</WuiFlexItem>
      <WuiFlexItem>Extra small</WuiFlexItem>
    </WuiFlexGroup>

    <WuiSpacer />

    <WuiFlexGroup gutterSize="s">
      <WuiFlexItem>Small</WuiFlexItem>
      <WuiFlexItem>Small</WuiFlexItem>
      <WuiFlexItem>Small</WuiFlexItem>
      <WuiFlexItem>Small</WuiFlexItem>
    </WuiFlexGroup>

    <WuiSpacer />

    <WuiFlexGroup gutterSize="m">
      <WuiFlexItem>Medium</WuiFlexItem>
      <WuiFlexItem>Medium</WuiFlexItem>
      <WuiFlexItem>Medium</WuiFlexItem>
      <WuiFlexItem>Medium</WuiFlexItem>
    </WuiFlexGroup>

    <WuiSpacer />

    <WuiFlexGroup gutterSize="l">
      <WuiFlexItem>Large (default)</WuiFlexItem>
      <WuiFlexItem>Large (default)</WuiFlexItem>
      <WuiFlexItem>Large (default)</WuiFlexItem>
      <WuiFlexItem>Large (default)</WuiFlexItem>
    </WuiFlexGroup>

    <WuiSpacer />

    <WuiFlexGroup gutterSize="xl">
      <WuiFlexItem>Extra Large</WuiFlexItem>
      <WuiFlexItem>Extra Large</WuiFlexItem>
      <WuiFlexItem>Extra Large</WuiFlexItem>
      <WuiFlexItem>Extra Large</WuiFlexItem>
    </WuiFlexGroup>
  </div>
);
