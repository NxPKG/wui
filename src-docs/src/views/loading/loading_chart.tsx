import React from 'react';

import { WuiLoadingChart } from '../../../../src/components/loading';

export default () => (
  <div>
    <WuiLoadingChart size="m" />
    &nbsp;&nbsp;
    <WuiLoadingChart size="l" />
    &nbsp;&nbsp;
    <WuiLoadingChart size="xl" />
    <br />
    <br />
    <WuiLoadingChart size="m" mono />
    &nbsp;&nbsp;
    <WuiLoadingChart size="l" mono />
    &nbsp;&nbsp;
    <WuiLoadingChart size="xl" mono />
  </div>
);
