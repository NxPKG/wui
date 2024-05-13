import React from 'react';

import { WuiHorizontalRule } from '../../../../src/components/horizontal_rule';

export default () => (
  <div>
    <p>xs</p>
    <WuiHorizontalRule margin="xs" />
    <p>s</p>
    <WuiHorizontalRule margin="s" />
    <p>m</p>
    <WuiHorizontalRule margin="m" />
    <p>l (default)</p>
    <WuiHorizontalRule margin="l" />
    <p>xl</p>
    <WuiHorizontalRule margin="xl" />
    <p>xxl</p>
    <WuiHorizontalRule margin="xxl" />
  </div>
);
