import React from 'react';

import { WuiExpression, WuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <WuiExpression
      onClick={() => {}}
      description="sort by"
      value="count"
      isInvalid
    />
    <WuiSpacer />
    <div style={{ maxWidth: 220 }}>
      <WuiExpression
        description="email"
        display="columns"
        isInvalid
        value="example@mail."
        onClick={() => {}}
      />
    </div>
  </div>
);
