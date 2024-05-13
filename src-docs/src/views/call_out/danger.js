import React from 'react';

import { WuiCallOut, WuiLink } from '../../../../src/components';

export default () => (
  <WuiCallOut title="Sorry, there was an error" color="danger" iconType="alert">
    <p>
      Now you have to fix it, but maybe{' '}
      <WuiLink href="#">this link can help</WuiLink>.
    </p>
  </WuiCallOut>
);
