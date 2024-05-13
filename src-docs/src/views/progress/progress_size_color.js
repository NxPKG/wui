import React from 'react';

import { WuiProgress, WuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <WuiProgress value={20} max={100} color="subdued" size="xs" />
    <WuiSpacer size="l" />

    <WuiProgress value={40} max={100} color="accent" size="xs" />
    <WuiSpacer size="l" />

    <WuiProgress value={60} max={100} color="primary" size="s" />
    <WuiSpacer size="l" />

    <WuiProgress value={80} max={100} color="secondary" size="m" />
    <WuiSpacer size="l" />

    <WuiProgress value={90} max={100} color="danger" size="l" />
  </div>
);
