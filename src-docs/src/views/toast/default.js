import React from 'react';

import { WuiToast } from '../../../../src/components';

export default () => (
  <div>
    <WuiToast
      title="Example of a good toast"
      onClose={() => window.alert('Dismiss toast')}>
      <p>
        A good toast message is short and to the point. It should very rarely
        include multiple paragraphs.
      </p>
    </WuiToast>
  </div>
);
