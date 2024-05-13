import React from 'react';

import { WuiExpression } from '../../../../src/components/expression';
import { WuiSpacer } from '../../../../src/components/spacer';

export default () => (
  <div>
    <WuiExpression description="Secondary" value="isDefault()" />
    <WuiSpacer size="s" />
    <WuiExpression description="Primary" value="color()" color="primary" />
    <WuiSpacer size="s" />
    <WuiExpression description="accent" value="color()" color="accent" />
    <WuiSpacer size="s" />
    <WuiExpression description="warning" value="color()" color="warning" />
    <WuiSpacer size="s" />
    <WuiExpression description="danger" value="color()" color="danger" />
    <WuiSpacer size="s" />
    <WuiExpression description="subdued" value="color()" color="subdued" />
    <WuiSpacer size="s" />
    <WuiExpression
      description="active"
      value="state will get color() as well"
      color="accent"
      isActive
    />
  </div>
);
