import React from 'react';

import { WuiCallOut, WuiLink } from '../../../../src/components';

export default () => (
  <WuiCallOut title="Good news, everyone!" color="success" iconType="user">
    <p>
      I have no news. Which is good! And{' '}
      <WuiLink href="#">here&rsquo;s a link</WuiLink>.
    </p>
  </WuiCallOut>
);
