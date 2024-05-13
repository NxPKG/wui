import React from 'react';

import { WuiLoadingSpinner } from '../../../../src/components/loading';

export default () => (
  <div>
    <WuiLoadingSpinner size="s" />
    &nbsp;&nbsp;
    <WuiLoadingSpinner size="m" />
    &nbsp;&nbsp;
    <WuiLoadingSpinner size="l" />
    &nbsp;&nbsp;
    <WuiLoadingSpinner size="xl" />
  </div>
);
