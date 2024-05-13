import React from 'react';

import {
  WuiFlexGroup,
  WuiFlexItem,
  WuiFormRow,
  WuiButton,
  WuiFieldText,
  WuiFieldNumber,
  WuiAvatar,
} from '../../../../src/components/';

export default () => (
  <WuiFlexGroup style={{ maxWidth: 600 }}>
    <WuiFlexItem grow={false} style={{ width: 100 }}>
      <WuiFormRow label="Age">
        <WuiFieldNumber max={10} placeholder={42} />
      </WuiFormRow>
    </WuiFlexItem>
    <WuiFlexItem>
      <WuiFormRow label="Full name">
        <WuiFieldText icon="user" placeholder="John Doe" />
      </WuiFormRow>
    </WuiFlexItem>
    <WuiFlexItem grow={false}>
      <WuiFormRow label="Avatar" display="center">
        <WuiAvatar name="John Doe" size="s" />
      </WuiFormRow>
    </WuiFlexItem>
    <WuiFlexItem grow={false}>
      <WuiFormRow hasEmptyLabelSpace display="center">
        <WuiButton>Save</WuiButton>
      </WuiFormRow>
    </WuiFlexItem>
  </WuiFlexGroup>
);
