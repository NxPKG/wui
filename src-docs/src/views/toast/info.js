import React from 'react';

import { WuiToast } from '../../../../src/components';

export default () => (
  <WuiToast
    title="Icons should be rare"
    type="info"
    onClose={() => window.alert('Dismiss toast')}>
    <p>
      Icons should be used rarely. They are good for warnings, but when paired
      with long titles they look out of place.
    </p>
  </WuiToast>
);
