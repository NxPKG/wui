import React from 'react';

import {
  WuiFlexGroup,
  WuiFlexItem,
  WuiFormRow,
  WuiButton,
  WuiFieldText,
} from '../../../../src/components/';

export default () => (
  <WuiFlexGroup style={{ maxWidth: 600 }}>
    <WuiFlexItem>
      <WuiFormRow label="First name" helpText="I am helpful help text!">
        <WuiFieldText />
      </WuiFormRow>
    </WuiFlexItem>
    <WuiFlexItem>
      <WuiFormRow label="Last name">
        <WuiFieldText />
      </WuiFormRow>
    </WuiFlexItem>
    <WuiFlexItem grow={false}>
      <WuiFormRow hasEmptyLabelSpace>
        <WuiButton>Save</WuiButton>
      </WuiFormRow>
    </WuiFlexItem>
  </WuiFlexGroup>
);
