import React from 'react';

import { WuiPanel } from '../../../../src/components';

export default () => (
  <WuiPanel onClick={() => window.alert('Panel clicked')}>
    <p>Hover me to see my hover state.</p>
  </WuiPanel>
);
