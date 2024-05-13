import React from 'react';
import { WuiFlexGroup, WuiFlexItem } from '../../../../src/components/flex';
import { WuiSpacer } from '../../../../src/components/spacer';
import { WuiIcon } from '../../../../src/components/icon';

export default () => (
  <div>
    <WuiFlexGroup alignItems="center">
      <WuiFlexItem grow={false}>
        <WuiIcon type="faceSad" />
      </WuiFlexItem>
      <WuiFlexItem grow={false}>
        On mobile, the icon will show above this text.
      </WuiFlexItem>
    </WuiFlexGroup>

    <WuiSpacer />

    <WuiFlexGroup responsive={false} alignItems="center">
      <WuiFlexItem grow={false}>
        <WuiIcon type="faceHappy" />
      </WuiFlexItem>
      <WuiFlexItem grow={false}>
        On mobile, the icon will stay to the left of this text.
      </WuiFlexItem>
    </WuiFlexGroup>
  </div>
);
