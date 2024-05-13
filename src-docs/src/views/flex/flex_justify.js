import React from 'react';

import {
  WuiFlexGroup,
  WuiFlexItem,
  WuiText,
  WuiSpacer,
} from '../../../../src/components';

export default () => (
  <div>
    <WuiFlexGroup justifyContent="spaceEvenly">
      <WuiFlexItem grow={false}>One here on the left</WuiFlexItem>
      <WuiFlexItem grow={false}>The other over here on the right.</WuiFlexItem>
    </WuiFlexGroup>

    <WuiSpacer />

    <WuiFlexGroup justifyContent="spaceBetween">
      <WuiFlexItem grow={false}>One here on the left</WuiFlexItem>
      <WuiFlexItem grow={false}>The other over here on the right.</WuiFlexItem>
    </WuiFlexGroup>

    <WuiSpacer />

    <WuiFlexGroup justifyContent="spaceAround">
      <WuiFlexItem grow={false}>I&rsquo;m a single centered item!</WuiFlexItem>
    </WuiFlexGroup>

    <WuiSpacer />

    <WuiFlexGroup alignItems="center">
      <WuiFlexItem grow={false}>
        <WuiText>
          <p>I</p>
          <p>am</p>
          <p>really</p>
          <p>tall</p>
        </WuiText>
      </WuiFlexItem>
      <WuiFlexItem>I am vertically centered!</WuiFlexItem>
    </WuiFlexGroup>
  </div>
);
